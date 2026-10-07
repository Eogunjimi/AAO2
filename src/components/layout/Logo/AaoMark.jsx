/**
 * AAO Engineering pictorial mark.
 *
 * Thin wrapper that renders the pre-authored SVG asset in
 * `/public/images/aao-logo.svg`. The SVG was traced to exactly match the
 * client's supplied reference (split green gear, white ring, yellow sun)
 * and is served as a static file so browsers can cache it like a PNG.
 */
export function AaoMark({ className, title = '' }) {
  return (
    <img
      src="/images/aao-logo.svg"
      alt=""
      aria-hidden="true"
      className={className}
      width={46}
      height={46}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );
}
