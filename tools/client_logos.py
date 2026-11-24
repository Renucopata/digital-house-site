"""Client logos (home band): each brand's complete logo in its ORIGINAL colors, background removed.
No redraw: every output pixel comes from the source image. Decided 2026-11-24: light band (salt),
complete logos (symbol + name), small unreadable sub-lines and the (R)/TM marks cut out (except Technogym's, inside its badge), and the
parts that are pure white lettering made for a dark background (Fury Cup, Totto, Carabao's text)
turned black, the usual one-color version of a logo.
Usage: python -I client_logos.py <brand-assets/logos dir> <out dir (public/client-logos)> <preview dir>

Per pixel, against the background color (measured on the image border, or given):
  dist  = |p - bg|
  alpha = dist / (largest dist within 3 px, at least DMIN)  -> edge pixels get their true coverage
  color = bg + (p - bg) / alpha                              -> the logo's own color, no bg halo
`solid` ellipses (cx, cy, rx, ry, deg) are kept fully opaque with their source pixels: the inside
of a seal/badge that contains the background color (UCB seal, SP circle, La Suprema oval, Burguesa
medallion). `blank` rectangles are erased. `whiten`: near-white pixels become CHARCOAL, except
inside the `keep_white` ellipses (Carabao's skull on the red disc).
Also prints the display height for each logo (equal visual area, see src/content/home.ts).
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter

src, out, prev = sys.argv[1:4]
os.makedirs(out, exist_ok=True); os.makedirs(prev, exist_ok=True)

SALT = (0xEA, 0xDF, 0xDB)
CHARCOAL = np.array([17, 17, 17], float)
HEIGHT = 200  # output height in px (shown at up to ~80 px, so 2.5x)
DMIN = 60.0   # minimum "full ink" distance, so JPEG noise in the background never becomes opaque
NOISE = 22.0  # distances below this are background

LOGOS = [
    # name, file, extras
    ("aster-surgery", "astersurgerylogo.jpeg", {"blank": [(150, 940, 1120, 1020)]}),
    ("burguesa", "burguesalogo.jpeg", {"blank": [(470, 1125, 830, 1216)], "solid": [(645, 517, 284, 302, 0)]}),
    ("carabao", "carabaologo.jpeg", {"blank": [(935, 585, 1005, 645)], "whiten": True,
                                     "keep_white": [(600, 470, 232, 232, 0), (480, 360, 240, 310, None)]}),
    ("fury-cup", "furycuplogo.jpeg", {"whiten": True}),
    ("guinness", "guinnesslogo.jpeg", {"blank": [(565, 165, 600, 188), (800, 338, 825, 360)]}),
    ("ials", "ialslogo.jpeg", {"blank": [(680, 395, 1040, 625)]}),
    ("italia-bolivia", "italialogo.jpeg", {"blank": [(200, 815, 1340, 975)]}),
    ("schmidts-pharma", "splogo.jpeg", {"solid": [(262, 275, 196, 196, 0)]}),
    ("la-suprema", "supremalogo.jpeg", {"bg": (225, 30, 30), "solid": [(222, 224, 150, 82, -12)]}),
    ("technogym", "tglogo.jpeg", {}),  # its (R) sits inside the yellow badge: kept
    ("totto", "tottologo.jpeg", {"whiten": True}),
    ("ucb", "ucblogo.jpeg", {"blank": [(720, 405, 1345, 515), (1355, 115, 1392, 505)], "solid": [(432, 295, 186, 256, 0)]}),
    ("zareliz", "zarelizlogo.jpeg", {"blank": [(890, 630, 1185, 695), (950, 180, 1470, 300), (1330, 300, 1470, 470), (1355, 690, 1420, 750)]}),
]


def smoothstep(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def region(shape, spec):
    """Boolean mask: an ellipse (cx, cy, rx, ry, deg) or, with deg None, a rectangle (x0, y0, x1, y1)."""
    h, w = shape
    yy, xx = np.mgrid[0:h, 0:w]
    a, b, c, d, deg = spec
    if deg is None:
        return (xx >= a) & (xx < c) & (yy >= b) & (yy < d)
    t = np.radians(deg)
    u = (xx - a) * np.cos(t) + (yy - b) * np.sin(t)
    v = -(xx - a) * np.sin(t) + (yy - b) * np.cos(t)
    return (u / c) ** 2 + (v / d) ** 2 <= 1


def extract(img, ex):
    p = np.asarray(img).astype(float)
    h, w, _ = p.shape
    if "bg" in ex:
        bg = np.asarray(ex["bg"], float)
    else:  # median of an 8 px frame around the image
        f = np.concatenate([p[:8].reshape(-1, 3), p[-8:].reshape(-1, 3), p[:, :8].reshape(-1, 3), p[:, -8:].reshape(-1, 3)])
        bg = np.median(f, axis=0)
    dist = np.sqrt(((p - bg) ** 2).sum(-1))
    d8 = Image.fromarray(np.uint8(np.clip(dist / 2, 0, 255)))
    local = np.asarray(d8.filter(ImageFilter.MaxFilter(7))).astype(float) * 2
    a = np.clip(dist / np.maximum(local, DMIN), 0, 1)
    a = smoothstep(a, 0.06, 0.94)
    a[dist < NOISE] = 0
    safe = np.maximum(a, 0.02)[..., None]
    c = np.clip(bg + (p - bg) / safe, 0, 255)
    for s in ex.get("solid", []):
        m = region((h, w), s)
        a[m] = 1; c[m] = p[m]
    if ex.get("whiten"):
        keep = np.zeros((h, w), bool)
        for s in ex.get("keep_white", []):
            keep |= region((h, w), s)
        white = (c.min(-1) > 170) & (c.max(-1) - c.min(-1) < 45) & ~keep
        c[white] = CHARCOAL
    for x0, y0, x1, y1 in ex.get("blank", []):
        a[y0:y1, x0:x1] = 0
    # some source files have a thin line along their edges (scan/export border)
    a[:6] = 0; a[-6:] = 0; a[:, :6] = 0; a[:, -6:] = 0
    rgba = np.dstack([c, a * 255]).round().astype(np.uint8)
    return Image.fromarray(rgba, "RGBA"), bg


def main():
    sheet, sizes = [], []
    for name, file, ex in LOGOS:
        img = Image.open(os.path.join(src, file)).convert("RGB")
        rgba, bg = extract(img, ex)
        bbox = rgba.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
        rgba = rgba.crop(bbox)
        w = round(rgba.width * HEIGHT / rgba.height)
        # resize premultiplied, so transparent pixels' colors never bleed into the edges
        rgba = rgba.convert("RGBa").resize((w, HEIGHT), Image.LANCZOS).convert("RGBA")
        p = os.path.join(out, f"{name}.png")
        rgba.save(p, optimize=True)
        sizes.append((name, w))
        print(f"{name:16s} {w}x{HEIGHT}  {os.path.getsize(p) // 1024:3d} KB  bg {np.round(bg).astype(int)}")
        sheet.append((name, img, rgba))
    # preview: source | result on the band color (salt)
    W, RH = 1400, 210
    s = Image.new("RGB", (W, RH * len(sheet)), SALT)
    for i, (name, orig, rgba) in enumerate(sheet):
        o = orig.copy(); o.thumbnail((W // 2 - 20, RH - 20))
        r = rgba.copy(); r.thumbnail((W // 2 - 20, RH - 20))
        s.paste(Image.new("RGB", (W // 2, RH), (128, 128, 128)), (0, i * RH))
        s.paste(o, (10, i * RH + (RH - o.height) // 2))
        s.paste(r, (W // 2 + 10, i * RH + (RH - r.height) // 2), r)
    s.save(os.path.join(prev, "clients-sheet.png"))
    # display size: equal visual area (a 4:1 logo is 44 px high), clamped to 30..80 px
    print("\nwidth, height for src/content/home.ts and display height (px, desktop):")
    for name, w in sizes:
        aspect = w / HEIGHT
        print(f'  {name:16s} width: {w}, height: {HEIGHT}, h: {round(min(80, max(30, (7744 / aspect) ** 0.5)))}')


main()
