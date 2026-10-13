"""Compare logo lettering against candidate fonts (shape IoU + width ratio + visual sheet).
Usage: python -I fontcmp.py <wordmark jpeg> <fonts dir> <out dir>"""
import sys, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

logo, fdir, out = sys.argv[1:4]
a = np.asarray(Image.open(logo).convert("L")).astype(int)
bg = np.median(a[:40])
ink = (bg - a) > 70  # dark ink on light bg

# --- segment the wordmark: rows -> lines, columns -> words ------------------
def runs(mask1d, gap):
    idx = np.where(mask1d)[0]
    groups, start, prev = [], idx[0], idx[0]
    for i in idx[1:]:
        if i - prev > gap:
            groups.append((start, prev + 1)); start = i
        prev = i
    groups.append((start, prev + 1))
    return groups

def tight(m):
    ys, xs = np.where(m); return m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
# boxes measured by projection on file (4): "g" descender overlaps the subline rows,
# so blank out the GROWTH STUDIO glyphs (x>=375, y>=805) before cropping "digital"
ink_d = ink.copy(); ink_d[805:, 375:] = False
targets = {
    "digital": tight(ink_d[600:840, 157:503]),
    "HOUSE": tight(ink[600:790, 540:898]),
    "GROWTH STUDIO": tight(ink[805:840, 375:735]),
}
for k, v in targets.items(): print(k, "target size (w,h)", v.shape[::-1])

def render(fontpath, text, axes=None, size=400, tracking=0):
    f = ImageFont.truetype(fontpath, size)
    if axes:
        names = [x["name"].decode() if isinstance(x["name"], bytes) else x["name"] for x in f.get_variation_axes()]
        tag = {"weight": "wght", "width": "wdth", "optical size": "opsz", "optical_size": "opsz"}
        ax = f.get_variation_axes()
        f.set_variation_by_axes([axes.get(tag.get(n.lower(), n.lower()), x["default"]) for n, x in zip(names, ax)])
    W = int(size * (len(text) + 2) * (1 + tracking))
    im = Image.new("L", (W, size * 2), 0); d = ImageDraw.Draw(im)
    x = size // 2
    for ch in text:
        d.text((x, size // 2), ch, font=f, fill=255)
        x += f.getlength(ch) + tracking * size
    return tight(np.asarray(im) > 127)

def score(t, c):
    th, tw = t.shape
    ch, cw = c.shape
    wr = (cw * th / ch) / tw                      # width ratio at equal height
    cimg = np.asarray(Image.fromarray((c * 255).astype(np.uint8)).resize((tw, th), Image.LANCZOS)) > 127
    iou = (t & cimg).sum() / (t | cimg).sum()
    return iou, wr, cimg

F = lambda n: os.path.join(fdir, n)
cands = {
    "digital": [
        ("Bodoni Moda 400 opsz96", F("BodoniModa[opsz,wght].ttf"), {"opsz": 96, "wght": 400}),
        ("Bodoni Moda 500 opsz96", F("BodoniModa[opsz,wght].ttf"), {"opsz": 96, "wght": 500}),
        ("Playfair Display 400", F("PlayfairDisplay[wght].ttf"), {"wght": 400}),
        ("Prata 400", F("Prata-Regular.ttf"), None),
        ("Gloock 400", F("Gloock-Regular.ttf"), None),
        ("Cormorant Garamond 300", F("CormorantGaramond[wght].ttf"), {"wght": 300}),
        ("Cormorant Garamond 400", F("CormorantGaramond[wght].ttf"), {"wght": 400}),
        ("Libre Bodoni 400", F("LibreBodoni[wght].ttf"), {"wght": 400}),
        ("Noto Serif Display 300 wdth62", F("NotoSerifDisplay[wdth,wght].ttf"), {"wght": 300, "wdth": 62}),
        ("Noto Serif Display 400 wdth62", F("NotoSerifDisplay[wdth,wght].ttf"), {"wght": 400, "wdth": 62}),
        ("Noto Serif Display 300 wdth75", F("NotoSerifDisplay[wdth,wght].ttf"), {"wght": 300, "wdth": 75}),
        ("Instrument Serif 400", F("InstrumentSerif-Regular.ttf"), None),
        ("Italiana 400", F("Italiana-Regular.ttf"), None),
        ("Kalnia 100 wdth100", F("Kalnia[wdth,wght].ttf"), {"wght": 100, "wdth": 100}),
        ("Kalnia 200 wdth100", F("Kalnia[wdth,wght].ttf"), {"wght": 200, "wdth": 100}),
        ("Kalnia 300 wdth100", F("Kalnia[wdth,wght].ttf"), {"wght": 300, "wdth": 100}),
    ],
    "HOUSE": [
        ("Poppins 700", F("Poppins-Bold.ttf"), None),
        ("Poppins 800", F("Poppins-ExtraBold.ttf"), None),
        ("Montserrat 800", F("Montserrat[wght].ttf"), {"wght": 800}),
        ("Montserrat 900", F("Montserrat[wght].ttf"), {"wght": 900}),
        ("Outfit 800", F("Outfit[wght].ttf"), {"wght": 800}),
        ("Lexend 800", F("Lexend[wght].ttf"), {"wght": 800}),
        ("League Spartan 800", F("LeagueSpartan[wght].ttf"), {"wght": 800}),
    ],
    "GROWTH STUDIO": [
        ("Poppins 300", F("Poppins-Light.ttf"), None),
        ("Poppins 400", F("Poppins-Regular.ttf"), None),
        ("Montserrat 400", F("Montserrat[wght].ttf"), {"wght": 400}),
        ("Outfit 300", F("Outfit[wght].ttf"), {"wght": 300}),
        ("Lexend 300", F("Lexend[wght].ttf"), {"wght": 300}),
        ("League Spartan 400", F("LeagueSpartan[wght].ttf"), {"wght": 400}),
    ],
}

H = 120
lab = ImageFont.truetype(F("Poppins-Regular.ttf"), 18)
for text, lst in cands.items():
    t = targets[text]
    res = []
    for name, path, axes in lst:
        best = None
        for tr in ([0] if text != "GROWTH STUDIO" else [0.2, 0.3, 0.35, 0.4, 0.5]):
            c = render(path, text, axes, tracking=tr)
            iou, wr, cimg = score(t, c)
            if best is None or abs(wr - 1) < abs(best[2] - 1):
                best = (name + (f" track{tr}em" if text == "GROWTH STUDIO" else ""), iou, wr, c, cimg)
        res.append(best)
    res.sort(key=lambda r: -r[1])
    print(f"\n== {text}  (IoU = shape overlap after scaling to logo box; width = natural width / logo width at equal height)")
    for name, iou, wr, _, _ in res:
        print(f"  {name:34s} IoU {iou:.3f}   width {wr:.2f}")
    # visual sheet: logo row, then each candidate at same height (natural width) + overlay
    rowsimg = [("LOGO", t, None)] + [(f"{n}  IoU {i:.2f}  w {w:.2f}", c, ci) for n, i, w, c, ci in res]
    def toH(m):
        h, w = m.shape; return Image.fromarray((m * 255).astype(np.uint8)).resize((max(1, int(w * H / h)), H), Image.LANCZOS)
    tw = toH(t).width
    sheetW = max(toH(m).width for _, m, _ in rowsimg) + tw + 80
    sheet = Image.new("RGB", (sheetW, len(rowsimg) * (H + 40) + 10), (251, 248, 241))
    d = ImageDraw.Draw(sheet)
    for i, (label, m, ci) in enumerate(rowsimg):
        y = 10 + i * (H + 40)
        d.text((10, y), label, fill=(60, 30, 30), font=lab)
        g = toH(m)
        sheet.paste((104, 8, 17), (10, y + 24), g)
        if ci is not None:  # overlay: logo in grey, candidate in burgundy, at logo box size
            ov = Image.new("RGB", (tw, H), (251, 248, 241))
            ov.paste((170, 170, 170), (0, 0), toH(t))
            ov.paste((104, 8, 17), (0, 0), Image.fromarray((ci * 160).astype(np.uint8)).resize((tw, H)))
            sheet.paste(ov, (sheetW - tw - 10, y + 24))
    sheet.save(os.path.join(out, f"fontcmp-{text.replace(' ', '_')}.png"))
