"""Phase 0 asset analysis: inventory, palette extraction, logo bounding boxes.
Usage: python -I analyze.py <brand-assets dir> <out dir>"""
import sys, os, json, hashlib
import numpy as np
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

def hexc(c): return "#%02X%02X%02X" % tuple(int(round(x)) for x in c[:3])

def lum(c):
    def ch(v):
        v = v / 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c[:3]
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)

def contrast(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return (la + 0.05) / (lb + 0.05)

def kmeans(px, k, iters=25, seed=0):
    rng = np.random.default_rng(seed)
    cent = px[rng.choice(len(px), k, replace=False)].astype(float)
    for _ in range(iters):
        d = ((px[:, None, :] - cent[None]) ** 2).sum(-1)
        lab = d.argmin(1)
        for i in range(k):
            m = px[lab == i]
            if len(m): cent[i] = m.mean(0)
    counts = np.bincount(lab, minlength=k)
    order = counts.argsort()[::-1]
    return [(cent[i], counts[i] / len(px)) for i in order]

def median_region(a, box):
    x0, y0, x1, y1 = box
    return np.median(a[y0:y1, x0:x1].reshape(-1, 3), axis=0)

report = {}
for f in sorted(os.listdir(src)):
    if not f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")): continue
    p = os.path.join(src, f)
    im = Image.open(p)
    info = dict(file=f, size=im.size, mode=im.mode, format=im.format,
                bytes=os.path.getsize(p),
                sha1=hashlib.sha1(open(p, "rb").read()).hexdigest()[:10],
                exif=bool(im.getexif()))
    a = np.asarray(im.convert("RGB")).astype(int)
    h, w, _ = a.shape
    # corner + center sample
    s = max(8, w // 40)
    info["corners"] = {n: hexc(median_region(a, b)) for n, b in {
        "tl": (0, 0, s, s), "tr": (w - s, 0, w, s), "bl": (0, h - s, s, h), "br": (w - s, h - s, w, h)}.items()}
    # palette (downsample)
    sm = np.asarray(im.convert("RGB").resize((max(1, w // 6), max(1, h // 6)))).reshape(-1, 3).astype(float)
    info["palette_k8"] = [(hexc(c), round(float(r) * 100, 1)) for c, r in kmeans(sm, 8)]
    report[f] = info

# --- focused measurements on the logo files -------------------------------
def logo_stats(f, dark_on_light=True, thr=60):
    a = np.asarray(Image.open(os.path.join(src, f)).convert("RGB")).astype(int)
    h, w, _ = a.shape
    bg = np.median(np.concatenate([a[:40].reshape(-1, 3), a[-40:].reshape(-1, 3)]), axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(-1))
    ink = dist > thr
    ys, xs = np.where(ink)
    bbox = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
    # "solid" ink = pixels well inside letterforms
    solid = dist > (dist[ink].max() * 0.85)
    inkc = np.median(a[solid], axis=0)
    # background variation (paper gradient?)
    rows = [hexc(np.median(a[y:y + 20].reshape(-1, 3), axis=0)) for y in (0, h // 4, h // 2, 3 * h // 4, h - 20)]
    return dict(bg=hexc(bg), ink=hexc(inkc), bbox_xyxy=bbox,
                bbox_wh=(bbox[2] - bbox[0], bbox[3] - bbox[1]),
                bg_rows_top_to_bottom=rows, contrast=round(contrast(bg, inkc), 2))

names = sorted(report)
base = "WhatsApp Image 2026-10-07 at 7.21.04 PM"
logos = {"monogram_dH": f"{base} (3).jpeg", "wordmark_burgundy_on_cream": f"{base} (4).jpeg",
         "wordmark_cream_on_burgundy": f"{base} (5).jpeg"}
report["_logos"] = {k: logo_stats(v) for k, v in logos.items()}

# --- targeted samples in the editorial images -----------------------------
ctrl = np.asarray(Image.open(os.path.join(src, f"{base}.jpeg")).convert("RGB")).astype(int)
sony = np.asarray(Image.open(os.path.join(src, f"{base} (2).jpeg")).convert("RGB")).astype(int)
def darkest(a, box, pct=3):
    x0, y0, x1, y1 = box
    r = a[y0:y1, x0:x1].reshape(-1, 3)
    l = r.sum(1)
    return hexc(np.median(r[l <= np.percentile(l, pct)], axis=0))
report["_samples"] = {
    "ctrl_paper_bg": hexc(median_region(ctrl, (40, 40, 200, 200))),
    "ctrl_headline_burgundy (Nuevas ideas)": darkest(ctrl, (240, 260, 620, 380)),
    "ctrl_body_ink (Misma pasion)": darkest(ctrl, (240, 400, 880, 520)),
    "ctrl_marker_underline": darkest(ctrl, (240, 525, 590, 580), 20),
    "ctrl_brush_smear (sand)": hexc(median_region(ctrl, (170, 690, 340, 760))),
    "ctrl_handwriting": darkest(ctrl, (420, 990, 790, 1090), 5),
    "sony_wall_lit": hexc(median_region(sony, (760, 120, 880, 200))),
    "sony_wall_shadow": hexc(median_region(sony, (40, 1350, 200, 1500))),
    "sony_screen_bg": hexc(median_region(sony, (280, 490, 400, 560))),
    "sony_monogram_ink": darkest(sony, (320, 600, 580, 800)),
    "sony_pill_ink (SIGUENOS)": darkest(sony, (280, 210, 620, 245), 5),
}
ref = {"--burgundy": "#6A0A14", "--burgundy-deep": "#4E0410", "--cream": "#FBF8F1",
       "--ivory": "#F5EFE5", "--sand": "#EAE1D6", "--ink": "#3A1A1C", "--ink-soft": "#6B5552"}
report["_claude_md_tokens"] = ref
json.dump(report, open(os.path.join(out, "analysis.json"), "w"), indent=1, default=str)
print(json.dumps(report, indent=1, default=str))
