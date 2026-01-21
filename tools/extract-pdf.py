import json
import os
from pathlib import Path

import fitz  # PyMuPDF


def extract(pdf_path: Path, out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    images_dir = out_dir / "images"
    images_dir.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf_path)

    text_parts: list[str] = []
    images_index: list[dict] = []

    for page_index in range(len(doc)):
        page = doc.load_page(page_index)
        page_number = page_index + 1

        # Text
        page_text = page.get_text("text")
        text_parts.append(f"\n\n---\n\n## Page {page_number}\n\n")
        text_parts.append(page_text.rstrip() + "\n")

        # Images
        for img in page.get_images(full=True):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image.get("ext", "bin")

            filename = f"page-{page_number:02d}-xref-{xref}.{image_ext}"
            file_path = images_dir / filename

            # Avoid rewriting same xref multiple times across pages
            if not file_path.exists():
                file_path.write_bytes(image_bytes)

            rects = []
            try:
                for r in page.get_image_rects(xref):
                    rects.append([r.x0, r.y0, r.x1, r.y1])
            except Exception:
                # Some PDFs don't provide image rects reliably
                pass

            images_index.append(
                {
                    "page": page_number,
                    "xref": xref,
                    "file": str(Path("images") / filename).replace("\\", "/"),
                    "rects": rects,
                }
            )

    (out_dir / "text.md").write_text("".join(text_parts), encoding="utf-8")
    (out_dir / "images.json").write_text(
        json.dumps(images_index, indent=2), encoding="utf-8"
    )


if __name__ == "__main__":
    repo_root = Path(__file__).resolve().parents[1]
    pdf_path = repo_root / "Bin to Better_ Website Content & Outline.pdf"
    out_dir = repo_root / "pdf-extract"

    if not pdf_path.exists():
        raise SystemExit(f"PDF not found: {pdf_path}")

    extract(pdf_path, out_dir)
    print(f"Extracted to: {out_dir}")
