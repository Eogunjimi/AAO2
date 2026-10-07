/**
 * AAO Engineering pictorial mark.
 *
 * Thin wrapper that renders the client-supplied logo asset in
 * `/public/images/aao-logo.png` (the green gear with yellow sun core).
 * Served as a static PNG so browsers render it exactly as supplied.
 */
export function AaoMark({ className }) {
  return (
    <img
      src="/images/aao-logo.png"
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
