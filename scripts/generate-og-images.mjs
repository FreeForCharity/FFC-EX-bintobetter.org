/**
 * Builds the 1200x630 social cards in public/og/.
 *
 * Every page on this site shared one card — public/logo.webp — so a link to the
 * tennis-ball page, the workshops page, or the donate page previewed
 * identically in Slack, iMessage, LinkedIn and X. A card that does not describe
 * the page it links to is a click nobody makes.
 *
 * Run with `npm run og` after adding or replacing a source photo. The output is
 * committed: the site is a static export and generating these at build time
 * would put sharp on the build's critical path for images that change maybe
 * twice a year.
 *
 * 1200x630 is the size every platform crops toward (1.91:1). Portraits of
 * people are cropped from the top so faces survive the crop, which is the same
 * reason the homepage bento anchors its people photos to the top.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(root, "public", "og");

const WIDTH = 1200;
const HEIGHT = 630;

/** --canvas and --paper from app/globals.css, so the cards match the site. */
const CANVAS = { r: 12, g: 36, b: 24, alpha: 1 };
const PAPER = { r: 245, g: 245, b: 238, alpha: 1 };

/**
 * JPEG, not WebP. The cards themselves would be a third the size as WebP, but
 * link unfurlers are not browsers: several — LinkedIn's among them — quietly
 * render nothing for a WebP og:image, and a card that fails on one major
 * platform is worse than a card that is 90 KB larger everywhere.
 *
 * `position: "top"` for any photo whose subject is a standing person: a 1.91:1
 * crop out of a portrait photo throws away most of the frame, and centring it
 * throws away the heads.
 */
const cards = [
  // The homepage card is the wordmark, padded rather than cropped — a 1.91:1
  // crop of a wordmark cuts the word in half. On paper, not canvas: the "bin
  // to" half of the wordmark is near-black and disappears on the dark green.
  { out: "home.jpg", src: "logo.webp", logo: true },
  { out: "bounce-back.jpg", src: "bounce-back/school-teacher-box.webp", position: "top" },
  { out: "tech-to-treasure.jpg", src: "workshops/group-photo.webp" },
  { out: "eco-filament.jpg", src: "cleanups/bagging-litter.webp" },
  { out: "partners.jpg", src: "bounce-back-logos/page-29-xref-117.webp" },
  { out: "get-involved.jpg", src: "cleanups/check-in.webp", position: "top" },
  { out: "officers-and-team.jpg", src: "workshops/stations.webp" },
  { out: "achievements.jpg", src: "bounce-back-logos/page-30-xref-120.webp" },
  { out: "donate.jpg", src: "cleanups/full-bag.webp", position: "top" },
  { out: "chapter.jpg", src: "workshops/hands-on.webp" },
];

await mkdir(OUT_DIR, { recursive: true });

for (const card of cards) {
  const source = path.join(root, "public", card.src);
  const target = path.join(OUT_DIR, card.out);

  if (card.logo) {
    // Composited, not flattened: the wordmark is a transparent PNG, and
    // flattening it before it reaches the canvas fills its own bounding box
    // rather than the card, which lands the logo in a black rectangle.
    const wordmark = await sharp(source)
      .resize({ width: 640, fit: "inside" })
      .png()
      .toBuffer();

    await sharp({
      create: { width: WIDTH, height: HEIGHT, channels: 3, background: PAPER },
    })
      .composite([{ input: wordmark, gravity: "centre" }])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(target);
  } else {
    await sharp(source)
      .resize({
        width: WIDTH,
        height: HEIGHT,
        fit: "cover",
        position: card.position ?? "centre",
      })
      .flatten({ background: CANVAS })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(target);
  }

  const { size } = await sharp(target).metadata();
  console.log(`${card.out} <- ${card.src} (${Math.round((size ?? 0) / 1024)} KB)`);
}
