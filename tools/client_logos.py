"""Credenciales: client wordmarks as ivory lettering on transparent (D43). No redraw: every output
pixel's opacity comes from the source image's coverage; symbols, sub-lines and ®/™ are cut out.
Usage: python -I client_logos.py <brand-assets/logos dir> <out dir (public/clients)> <preview dir>

Coverage per pixel, against the background color measured on the image:
  proj: a = dot(p - bg, ink - bg) / |ink - bg|^2   (one ink color; other colors fall away)
  dist: a = |p - bg| / ref                          (several ink colors, all kept)
then a smoothstep(lo, hi) to drop JPEG noise and unwanted tints (e.g. Burguesa's gold shadow).
`blank` rectangles (source pixels) are erased: ®, ™, overlapping symbols, sub-lines.
`below` / `above` (two points) erase everything under / over that line (Carabao's slanted
underline bars and symbol); `ellipse` keeps only the inside of a rotated ellipse (La Suprema's ring).
`open` removes strokes thinner than that radius (Fury Cup's wire globe behind the letters).
"""
import sys, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out, prev = sys.argv[1:4]
os.makedirs(out, exist_ok=True); os.makedirs(prev, exist_ok=True)

IVORY = np.array([0xF7, 0xF3, 0xEA], float)
DARK = (0x4A, 0x07, 0x10)
HEIGHT = 160  # output height in px (shown at ~40-64 px, so 2.5x+)

LOGOS = [
    # name, file, crop box (x0, y0, x1, y1), mode, bg, ink, (lo, hi), extras
    ("aster-surgery", "astersurgerylogo.jpeg", (70, 805, 1185, 930), "proj", None, (24, 130, 150), (0.25, 0.75), {}),
    ("burguesa", "burguesalogo.jpeg", (0, 832, 1293, 1110), "proj", None, (15, 15, 15), (0.6, 0.85), {}),
    ("carabao", "carabaologo.jpeg", (255, 625, 950, 890), "proj", None, (255, 255, 255), (0.62, 0.88),
     {"below": ((255, 868), (950, 764)), "above": ((255, 712), (950, 626)), "blank": [(930, 590, 1000, 650)]}),
    ("fury-cup", "furycuplogo.jpeg", (225, 325, 1400, 625), "proj", None, (255, 255, 255), (0.45, 0.8),
     {"open": 7, "blank": [(730, 535, 1135, 610)]}),
    ("guinness", "guinnesslogo.jpeg", (195, 318, 800, 455), "proj", None, (10, 10, 10), (0.3, 0.8), {}),
    ("ials", "ialslogo.jpeg", (160, 320, 665, 615), "proj", None, (22, 37, 66), (0.3, 0.8), {}),
    ("italia-bolivia", "italialogo.jpeg", (205, 372, 1325, 812), "proj", None, (0, 0, 0), (0.3, 0.8), {}),
    ("schmidts-pharma", "splogo.jpeg", (505, 120, 1565, 480), "dist", None, None, (0.25, 0.75), {}),
    ("la-suprema", "supremalogo.jpeg", (92, 170, 352, 290), "proj", (215, 25, 30), (255, 255, 255), (0.62, 0.88),
     {"ellipse": (220, 228, 130, 66, -12)}),
    ("technogym", "tglogo.jpeg", (115, 170, 1445, 410), "proj", (252, 222, 10), (0, 0, 0), (0.3, 0.8),
     {"blank": [(1385, 150, 1450, 235), (115, 215, 200, 412), (1150, 170, 1445, 205)]}),
    ("totto", "tottologo.jpeg", (340, 225, 860, 410), "dist", None, None, (0.2, 0.5), {}),
    ("ucb", "ucblogo.jpeg", (735, 115, 1325, 390), "dist", None, None, (0.25, 0.75), {}),
    ("zareliz", "zarelizlogo.jpeg", (125, 300, 1350, 760), "proj", None, (240, 95, 50), (0.3, 0.8),
     {"blank": [(890, 630, 1185, 695), (950, 180, 1470, 300), (1330, 300, 1470, 470), (1355, 690, 1420, 750)]}),
]


def smoothstep(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def coverage(img, box, mode, bg, ink, lohi, extras):
    a = np.asarray(img).astype(float)
    if bg is None:  # median of a 6 px frame around the crop
        x0, y0, x1, y1 = box
        f = np.concatenate([a[y0:y0 + 6, x0:x1].reshape(-1, 3), a[y1 - 6:y1, x0:x1].reshape(-1, 3)])
        bg = np.median(f, axis=0)
    bg = np.asarray(bg, float)
    if mode == "proj":
        d = np.asarray(ink, float) - bg
        cov = ((a - bg) @ d) / (d @ d)
    else:
        dist = np.sqrt(((a - bg) ** 2).sum(-1))
        x0, y0, x1, y1 = box
        cov = dist / np.percentile(dist[y0:y1, x0:x1], 99.5)
    cov = smoothstep(cov, *lohi)
    m = Image.fromarray(np.uint8(np.round(cov * 255)), "L")
    draw = ImageDraw.Draw(m)
    for r in extras.get("blank", []):
        draw.rectangle(r, fill=0)
    if "below" in extras:
        (xa, ya), (xb, yb) = extras["below"]
        draw.polygon([(xa, ya), (xb, yb), (m.width, yb), (m.width, m.height), (0, m.height), (0, ya)], fill=0)
    if "above" in extras:
        (xa, ya), (xb, yb) = extras["above"]
        draw.polygon([(xa, ya), (xb, yb), (m.width, yb), (m.width, 0), (0, 0), (0, ya)], fill=0)
    if "ellipse" in extras:  # keep only the inside of a rotated ellipse (cx, cy, rx, ry, degrees)
        cx, cy, rx, ry, deg = extras["ellipse"]
        yy, xx = np.mgrid[0:m.height, 0:m.width]
        t = np.radians(deg)
        u = (xx - cx) * np.cos(t) + (yy - cy) * np.sin(t)
        v = -(xx - cx) * np.sin(t) + (yy - cy) * np.cos(t)
        inside = (u / rx) ** 2 + (v / ry) ** 2 <= 1
        m = Image.fromarray(np.where(inside, np.asarray(m), 0).astype(np.uint8))
        draw = ImageDraw.Draw(m)
    if "open" in extras:  # erosion + dilation, then keep the original soft edges inside the result
        k = extras["open"] * 2 + 1
        core = m.point(lambda v: 255 if v > 128 else 0).filter(ImageFilter.MinFilter(k)).filter(ImageFilter.MaxFilter(k + 4))
        m = Image.fromarray(np.minimum(np.asarray(m), np.asarray(core)))
    return m.crop(box), bg


def main():
    sheet = []
    for name, file, box, mode, bg, ink, lohi, extras in LOGOS:
        img = Image.open(os.path.join(src, file)).convert("RGB")
        alpha, bg_used = coverage(img, box, mode, bg, ink, lohi, extras)
        bbox = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
        alpha = alpha.crop(bbox)
        w = round(alpha.width * HEIGHT / alpha.height)
        alpha = alpha.resize((w, HEIGHT), Image.LANCZOS)
        rgba = Image.new("RGBA", alpha.size, tuple(int(c) for c in IVORY) + (0,))
        rgba.putalpha(alpha)
        p = os.path.join(out, f"{name}.png")
        rgba.save(p, optimize=True)
        print(f"{name:16s} {w}x{HEIGHT}  {os.path.getsize(p) // 1024:3d} KB  bg {np.round(bg_used).astype(int)}")
        sheet.append((name, img.crop(box), rgba))
    # preview: source crop | result on guinda oscuro
    W = 1400
    rows = []
    for name, orig, rgba in sheet:
        o = orig.copy(); o.thumbnail((W // 2 - 20, 150))
        r = rgba.copy(); r.thumbnail((W // 2 - 20, 150))
        row = Image.new("RGB", (W, 170), DARK)
        row.paste(Image.new("RGB", (W // 2, 170), (255, 255, 255)), (0, 0))
        row.paste(o, (10, (170 - o.height) // 2))
        row.paste(r, (W // 2 + 10, (170 - r.height) // 2), r)
        rows.append(row)
    s = Image.new("RGB", (W, 170 * len(rows)), DARK)
    for i, row in enumerate(rows):
        s.paste(row, (0, i * 170))
    s.save(os.path.join(prev, "clients-sheet.png"))


main()
