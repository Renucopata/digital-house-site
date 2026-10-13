"""Phase 0: render every PDF page to PNG and list embedded fonts/images per page.
Usage: python -I render_pdf.py <brand-assets dir> <out dir>"""
import sys, os, pymupdf
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for f in sorted(os.listdir(src)):
    if not f.endswith(".pdf"): continue
    d = pymupdf.open(os.path.join(src, f))
    tag = "modelo" if "Modelo" in f else "portafolio"
    print(f, "pages:", d.page_count, "size(pt):", [round(x) for x in d[0].rect[2:]], "meta:", {k: v for k, v in d.metadata.items() if v})
    for i, p in enumerate(d):
        imgs = p.get_images(full=True)
        fonts = sorted({x[3] for x in p.get_fonts()})
        print(f"  p{i+1}: images={len(imgs)} fonts={fonts}")
        p.get_pixmap(dpi=60).save(os.path.join(out, f"{tag}-p{i+1:02d}.png"))
