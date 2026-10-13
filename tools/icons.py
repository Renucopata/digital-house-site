"""Phase 2: favicon + app icons from the approved monogram (public/brand/logo-monogram-cream.png).
Usage: python -I icons.py <public/brand dir> <src/app dir>

Writes (Next.js file conventions, picked up automatically):
  favicon.ico      16/32/48 px
  icon.png         512 px
  apple-icon.png   180 px
The monogram (ivory on burgundy-deep) is centered on a burgundy-deep square with ~16 % margin.
"""
import sys, os
from PIL import Image

brand, app = sys.argv[1:3]
BG = (0x51, 0x02, 0x0C)  # --burgundy-deep (the monogram file's own background)

mono = Image.open(os.path.join(brand, "logo-monogram-cream.png")).convert("RGB")

def square(size, margin=0.16):
    inner = round(size * (1 - 2 * margin))
    m = mono.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas = Image.new("RGB", (size, size), BG)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas

square(512).save(os.path.join(app, "icon.png"), optimize=True)
square(180).save(os.path.join(app, "apple-icon.png"), optimize=True)
# tiny sizes: less margin so the hairlines of the "d" survive
# RGBA frames: Next.js' ICO decoder rejects RGB PNG frames
square(256, margin=0.1).convert("RGBA").save(os.path.join(app, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
for n in ("icon.png", "apple-icon.png", "favicon.ico"):
    p = os.path.join(app, n)
    print(f"{n:16s} {os.path.getsize(p) // 1024 + 1} KB")
