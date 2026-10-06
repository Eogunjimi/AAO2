/**
 * Emits schema.org payloads as `application/ld+json`.
 *
 * A server component by design: the structured data is part of the HTML Next
 * ships, so crawlers read it without executing a line of JavaScript. (The SPA
 * previously appended these scripts from an effect, which meant they existed
 * only after hydration.)
 *
 * @param {Object} props
 * @param {Object|Object[]} props.schema One payload, or several.
 */
export function JsonLd({ schema }) {
  const payloads = Array.isArray(schema) ? schema : [schema];

  return payloads.filter(Boolean).map((payload, index) => (
    <script
      // The payloads are a fixed, ordered list per route.
      key={index}
      type="application/ld+json"
      // Content is built from our own data modules, never user input. `<` is
      // still escaped so a stray character can never close the script early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replaceAll('<', '\\u003c') }}
    />
  ));
}
