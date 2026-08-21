/**
 * Renders a JSON-LD block. Server component by design: the payload is built at
 * build time (the site is a static export) and lands in the HTML the crawler
 * receives, rather than being injected by client JS that Googlebot may or may
 * not run before it decides what the page is about.
 *
 * The stringified payload goes through `dangerouslySetInnerHTML` because React
 * escapes text children — `&`, `<` and quotes inside a <script> body would come
 * out as HTML entities and the JSON would not parse. `<` is escaped to its
 * unicode form instead, which is valid JSON and cannot close the script tag
 * early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
