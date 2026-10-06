/**
 * Test stub for `next/link`.
 *
 * The real component needs an App Router context that only exists inside a
 * running Next app. Components under test care about the rendered `<a href>`,
 * so the stub renders exactly that and drops the router-only props.
 */
export default function Link({
  href,
  children,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  ...rest
}) {
  const url = typeof href === 'string' ? href : (href?.pathname ?? '#');

  return (
    <a href={url} {...rest}>
      {children}
    </a>
  );
}
