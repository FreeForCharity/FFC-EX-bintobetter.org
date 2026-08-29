/**
 * Re-encodes the oversized source images in public/ to WebP at the size they
 * are actually displayed at.
 *
 * The site ships `images: { unoptimized: true }` — it has to, because a static
 * export has no image optimizer behind it — so whatever is committed under
 * public/ is exactly what a visitor downloads. That left the homepage pulling
 * four PNG photographs totalling roughly 9 MB into bento tiles 174 pixels wide,
 * and the team page pulling 27 MB of headshots into 176-pixel circles. Largest
 * Contentful Paint is a ranking signal and a 3.5 MB PNG behind a thumbnail is
 * the most expensive way to fail it.
 *
 * Run with `npm run optimize:images`. It rewrites in place: each source is
 * converted to a .webp sibling and the original is deleted, so re-running it is
 * a no-op. Update the references in content/ and app/ in the same commit — the
 * assets test will not catch a path that points at a file that no longer
 * exists, but the build will.
 *
 * MAX_WIDTH per folder is roughly twice the largest size the image is displayed
 * at, which covers 2x-density screens without paying for 3x nobody can see.
 */
import sharp from "sharp";
import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  // Circles 176px across on /officers-and-team.
  { dir: "members", maxWidth: 480, quality: 82 },
  // Bento tiles ~175px wide on the homepage; also the source photographs for
  // three of the social cards, which are 1200px.
  { dir: "bounce-back-logos", maxWidth: 1400, quality: 82 },
  // Logo lockups rendered at 200x100 and 360x200 on /partners.
  { dir: "partners-logos", maxWidth: 800, quality: 85 },
];

const CONVERTIBLE = /\.(png|jpe?g)$/i;

let savedBytes = 0;

for (const { dir, maxWidth, quality } of targets) {
  const abs = path.join(root, "public", dir);

  for (const name of await readdir(abs)) {
    if (!CONVERTIBLE.test(name)) continue;

    const source = path.join(abs, name);
    const target = path.join(abs, name.replace(CONVERTIBLE, ".webp"));

    // Read through a buffer rather than letting sharp open the path itself:
    // sharp keeps the input handle open, and on Windows (more so under
    // OneDrive) the unlink below then fails with EBUSY halfway through a run.
    const bytes = await readFile(source);
    const { size: before } = await stat(source);
    const { width = 0 } = await sharp(bytes).metadata();

    const output = await sharp(bytes)
      // `withoutEnlargement` so a logo that is already small is re-encoded
      // rather than upscaled into blur.
      .resize({ width: Math.min(width || maxWidth, maxWidth), withoutEnlargement: true })
      // Alpha is preserved: several partner logos are transparent lockups and
      // flattening them would put a white box on the page's cream background.
      .webp({ quality })
      .toBuffer();

    await writeFile(target, output);
    const after = output.byteLength;
    await unlink(source);

    savedBytes += before - after;
    console.log(
      `${dir}/${name} → ${path.basename(target)}  ` +
        `${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB`
    );
  }
}

console.log(`\nSaved ${(savedBytes / (1024 * 1024)).toFixed(1)} MB.`);
