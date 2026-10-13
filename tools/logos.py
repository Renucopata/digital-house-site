"""Phase 1 logo extraction. No redraw: every output pixel comes from the source coverage.
Usage: python -I logos.py <brand-assets dir> <out dir (public/brand)> <preview dir>

For a flat two-color logo, each pixel p = bg + a*(ink - bg), so the ink coverage
a = dot(p - bg, ink - bg) / |ink - bg|^2. Re-compositing that coverage with exact
token colors gives (1) a crop whose colors equal the tokens and (2) the D20 recolor.
"""
import sys, os
import numpy as np
from PIL import Image

src, out, prev = sys.argv[1:4]
os.makedirs(out, exist_ok=True); os.makedirs(prev, exist_ok=True)
base = "WhatsApp Image 2026-10-07 at 7.21.04 PM"

def rgb(h): return np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], float)
TOK = {k: rgb(v) for k, v in {
    "burgundy": "#670812", "burgundy-deep": "#51020C", "cream": "#F8F4E9", "ivory": "#F3EBE0"}.items()}

def load(n): return np.asarray(Image.open(os.path.join(src, f"{base} {n}.jpeg")).convert("RGB")).astype(float)

def coverage(a, box, bg, ink):
    x0, y0, x1, y1 = box
    p = a[y0:y1, x0:x1]
    d = ink - bg
    cov = ((p - bg) @ d) / (d @ d)
    cov = np.clip(cov, 0, 1)
    # remove JPEG noise floor/ceiling (|noise| ~ 2-3/255 of a ~180 step)
    cov = np.clip((cov - 0.04) / 0.92, 0, 1)
    return cov

def compose(cov, bg, ink):
    return Image.fromarray(np.uint8(np.round(bg + cov[..., None] * (ink - bg))))

def save(img, name):
    p = os.path.join(out, name)
    img.save(p, optimize=True)
    print(f"{name:40s} {img.size[0]}x{img.size[1]}  {os.path.getsize(p)//1024} KB")

# --- official wordmark (IMG-5, cream on burgundy); ink bbox 204,636 -> 824,829 ------------
img5 = load("(5)")
bg5 = np.median(np.concatenate([img5[:40].reshape(-1, 3), img5[-40:].reshape(-1, 3)]), axis=0)
box5 = (196, 628, 832, 837)                       # bbox + 8 px
x0, y0, x1, y1 = box5
patch = img5[y0:y1, x0:x1]
dist = np.sqrt(((patch - bg5) ** 2).sum(-1))
ink5 = np.median(patch[dist > dist.max() * 0.85], axis=0)
print("IMG-5 measured bg", bg5.round(), "ink", ink5.round())
cov5 = coverage(img5, box5, bg5, ink5)
save(compose(cov5, TOK["burgundy-deep"], TOK["ivory"]), "logo-wordmark-cream.png")       # official, on dark
save(compose(cov5, TOK["cream"], TOK["burgundy-deep"]), "logo-wordmark-burgundy.png")    # D20 recolor, on cream

# --- monogram (IMG-3, burgundy on near-white); ink bbox 332,359 -> 910,896 --------------------
img3 = load("(3)")
bg3 = np.median(img3[:40].reshape(-1, 3), axis=0)
box3 = (324, 351, 918, 904)
x0, y0, x1, y1 = box3
patch = img3[y0:y1, x0:x1]
dist = np.sqrt(((patch - bg3) ** 2).sum(-1))
ink3 = np.median(patch[dist > dist.max() * 0.85], axis=0)
print("IMG-3 measured bg", bg3.round(), "ink", ink3.round())
cov3 = coverage(img3, box3, bg3, ink3)
save(compose(cov3, TOK["cream"], TOK["burgundy"]), "logo-monogram.png")                   # on cream
save(compose(cov3, TOK["burgundy-deep"], TOK["ivory"]), "logo-monogram-cream.png")       # on dark

# untouched crops kept for comparison (not shipped)
Image.fromarray(np.uint8(img5[box5[1]:box5[3], box5[0]:box5[2]])).save(os.path.join(prev, "orig-wordmark-cream.png"))
Image.fromarray(np.uint8(img3[box3[1]:box3[3], box3[0]:box3[2]])).save(os.path.join(prev, "orig-monogram.png"))
img4 = load("(4)")
Image.fromarray(np.uint8(img4[608:840, 149:906])).save(os.path.join(prev, "orig-wordmark-burgundy-old-lockup.png"))

# preview sheet: original vs processed, plus 2x zoom of a detail
def pad(im, w, h, col):
    c = Image.new("RGB", (w, h), tuple(int(x) for x in col)); c.paste(im, ((w - im.width) // 2, (h - im.height) // 2)); return c
items = [
    ("orig-wordmark-cream.png", None, TOK["burgundy-deep"]),
    ("logo-wordmark-cream.png", out, TOK["burgundy-deep"]),
    ("logo-wordmark-burgundy.png", out, TOK["cream"]),
    ("orig-wordmark-burgundy-old-lockup.png", None, TOK["cream"]),
    ("orig-monogram.png", None, rgb("#FEFBF3")),
    ("logo-monogram.png", out, TOK["cream"]),
    ("logo-monogram-cream.png", out, TOK["burgundy-deep"]),
]
tiles = []
for n, d, col in items:
    im = Image.open(os.path.join(d or prev, n)).convert("RGB")
    im.thumbnail((640, 560))
    tiles.append(pad(im, 720, 600, col))
sheet = Image.new("RGB", (720 * 4, 600 * 2), (200, 200, 200))
for i, t in enumerate(tiles): sheet.paste(t, ((i % 4) * 720, (i // 4) * 600))
sheet.save(os.path.join(prev, "logos-preview.png"))
z = Image.open(os.path.join(prev, "orig-wordmark-cream.png")).crop((0, 0, 240, 150)).resize((720, 450), Image.NEAREST)
z2 = Image.open(os.path.join(out, "logo-wordmark-cream.png")).crop((0, 0, 240, 150)).resize((720, 450), Image.NEAREST)
z3 = Image.open(os.path.join(out, "logo-wordmark-burgundy.png")).crop((0, 0, 240, 150)).resize((720, 450), Image.NEAREST)
zz = Image.new("RGB", (2160, 450)); [zz.paste(x, (i * 720, 0)) for i, x in enumerate((z, z2, z3))]
zz.save(os.path.join(prev, "logos-zoom.png"))
