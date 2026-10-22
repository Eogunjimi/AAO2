import { describe, expect, it } from 'vitest';

import { buildHeadTags, escapeHtml, stripManagedHead } from './headTags';

describe('buildHeadTags', () => {
  it('emits title, description, canonical and social tags for an indexable page', () => {
    const html = buildHeadTags({
      title: 'CCTV Systems — AAO',
      description: 'Install CCTV in Lagos.',
      canonical: 'https://example.com/services/cctv',
      image: 'https://example.com/og.jpg',
    });

    expect(html).toContain('<title>CCTV Systems — AAO</title>');
    expect(html).toContain('<meta name="description" content="Install CCTV in Lagos." />');
    expect(html).toContain('<link rel="canonical" href="https://example.com/services/cctv" />');
    expect(html).toContain(
      '<meta property="og:url" content="https://example.com/services/cctv" />',
    );
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(html).toContain('<meta name="robots" content="index, follow" />');
  });

  it('marks noindex pages and uses the summary card without an image', () => {
    const html = buildHeadTags({ title: 'Private', noIndex: true });

    expect(html).toContain('<meta name="robots" content="noindex, nofollow" />');
    expect(html).toContain('<meta name="twitter:card" content="summary" />');
    expect(html).not.toContain('og:image');
  });

  it('escapes attribute values and keeps JSON-LD from closing its script tag', () => {
    const html = buildHeadTags({
      title: 'Solar & "Inverters" <b>',
      jsonLd: [{ name: '</script><script>alert(1)</script>' }],
    });

    expect(html).toContain('<title>Solar &amp; &quot;Inverters&quot; &lt;b&gt;</title>');
    expect(html).not.toContain('</script><script>alert(1)');
    expect(html).toContain('\\u003c/script>');
  });
});

describe('stripManagedHead', () => {
  it('removes only the tags the pre-renderer owns', () => {
    const template = `<head>
    <title>Home</title>
    <meta
      name="description"
      content="Static"
    />
    <meta property="og:site_name" content="AAO Engineering Services" />
    <meta property="og:image:width" content="1200" />
    <link rel="canonical" href="https://example.com/" />
    <link rel="icon" href="/favicon.svg" />
  </head>`;

    const stripped = stripManagedHead(template);

    expect(stripped).not.toContain('<title>');
    expect(stripped).not.toContain('name="description"');
    expect(stripped).not.toContain('rel="canonical"');
    expect(stripped).toContain('og:site_name');
    expect(stripped).toContain('og:image:width');
    expect(stripped).toContain('rel="icon"');
  });
});

describe('escapeHtml', () => {
  it('escapes the characters that matter inside attributes and text', () => {
    expect(escapeHtml(`a&b<c>"d"`)).toBe('a&amp;b&lt;c&gt;&quot;d&quot;');
  });
});
