"""Phase 3+: crops of the approved brand photos (D22) into public/images/.
Usage: python -I photos.py <brand-assets dir> <public/images dir>

hero-camara-dh.jpg  IMG-2 (Sony camera story, 900x1600) cropped below the baked-in
                    "SÍGUENOS EN" pill: box 0,400 → 900,1600 = 900x1200 (3:4).
JPEG re-encoded once at high quality; next/image serves WebP/AVIF from it.
"""
import sys, os
from PIL import Image

src, out = sys.argv[1:3]
os.makedirs(out, exist_ok=True)
base = "WhatsApp Image 2026-10-07 at 7.21.04 PM"

crops = {
    "hero-camara-dh.jpg": (f"{base} (2).jpeg", (0, 400, 900, 1600)),
}
for name, (file, box) in crops.items():
    im = Image.open(os.path.join(src, file)).convert("RGB").crop(box)
    p = os.path.join(out, name)
    im.save(p, quality=92, optimize=True, progressive=True)
    print(f"{name:24s} {im.size[0]}x{im.size[1]}  {os.path.getsize(p) // 1024} KB")
