/**
 * Icon registry.
 *
 * Icons are plain data so they can be tree-shaken, tested and reused without
 * pulling in an icon library. `filled: true` switches the SVG from stroke to
 * fill rendering.
 *
 * A path is normally just its `d` string. Brand marks whose identity depends
 * on colour may instead use `{ d, fill }`; the fill is honoured only when the
 * icon is rendered with `<Icon brand />`, so the same definition serves both
 * the full-colour logo and a monochrome currentColor version.
 */

export const icons = {
  clipboard: {
    paths: ['M9 5h6M9 5a3 3 0 0 1 6 0M7 5h10v16H7zM10 10h4M10 13.5h4M10 17h2.5'],
  },
  bolt: {
    filled: true,
    paths: ['M13.6 2 4.8 13.4h5.3L9.3 22l9.4-12.1h-5.6z'],
  },
  gear: {
    paths: [
      'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0L6.2 6.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
      'M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z',
    ],
  },
  sun: {
    paths: [
      'M12 4.6a7.4 7.4 0 1 0 0 14.8 7.4 7.4 0 0 0 0-14.8z',
      'M12 1.5v1.7M12 20.8v1.7M4.6 4.6l1.2 1.2M18.2 18.2l1.2 1.2M1.5 12h1.7M20.8 12h1.7M4.6 19.4l1.2-1.2M18.2 5.8l1.2-1.2',
    ],
  },
  user: {
    paths: ['M20 21a8 8 0 0 0-16 0', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  },
  quote: {
    filled: true,
    paths: ['M1 3H10V11L6.5 18.5H4L7 11H1Z', 'M13 3H22V11L18.5 18.5H16L19 11H13Z'],
  },
  shield: {
    paths: ['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', 'M9 12l2 2 4-4.5'],
  },
  home: {
    paths: [
      'M3 11l9-7 9 7',
      'M5 10v10h14V10',
      'M12 17c1.8-1.6 3-2.8 3-4a1.7 1.7 0 0 0-3-1 1.7 1.7 0 0 0-3 1c0 1.2 1.2 2.4 3 4z',
    ],
  },
  medal: {
    paths: [
      'M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5',
      'M12 6.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3z',
    ],
    circles: [{ cx: 12, cy: 9, r: 5 }],
  },
  support: {
    paths: ['M4 13a8 8 0 0 1 16 0', 'M20 20a3 3 0 0 1-3 2h-3'],
    rects: [
      { x: 2, y: 13, width: 4, height: 7, rx: 1.5 },
      { x: 18, y: 13, width: 4, height: 7, rx: 1.5 },
    ],
  },
  warning: {
    paths: ['M12 4l9 16H3z', 'M12 10v4M12 17.5v.5'],
  },
  whatsapp: {
    paths: [
      'M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6z',
      'M9.1 8.2c.4 1.8 2.4 3.8 4.2 4.2l.9-1.2 2 .9c-.2 1.2-1.3 1.8-2.4 1.6-2.7-.5-5.2-3-5.7-5.7-.2-1.1.4-2.2 1.6-2.4l.9 2z',
    ],
  },
  phone: {
    paths: [
      'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z',
    ],
  },
  // The "f" glyph in Facebook blue. Kept as the bare letterform rather than
  // the full roundel so the monochrome version (footer, dark headers) still
  // reads as a logo instead of a solid disc.
  facebook: {
    filled: true,
    paths: [
      {
        d: 'M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V14h2.7v8h3.2z',
        fill: '#1877f2',
      },
    ],
  },
  instagram: {
    filled: true,
    paths: [
      'M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z',
    ],
  },
  // The four quadrants of the Google "G" carry the official brand palette.
  // They only paint themselves when the icon is rendered with `brand`;
  // otherwise the mark falls back to currentColor like every other icon.
  google: {
    filled: true,
    viewBox: '0 0 48 48',
    paths: [
      {
        d: 'M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.6v5.5h7.1c4.2-3.8 6.6-9.4 6.6-16.1z',
        fill: '#4285f4',
      },
      {
        d: 'M24 46c5.9 0 10.9-2 14.6-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.5 2.1-5.7 0-10.6-3.9-12.3-9.1H4.3v5.7C8 41.1 15.4 46 24 46z',
        fill: '#34a853',
      },
      {
        d: 'M11.7 28.2c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.7H4.3C2.9 17.1 2 20.5 2 24s.9 6.9 2.3 9.9l7.4-5.7z',
        fill: '#fbbc05',
      },
      {
        d: 'M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8 6.9 4.3 14.1l7.4 5.7c1.7-5.2 6.6-9 12.3-9z',
        fill: '#ea4335',
      },
    ],
  },
  copyright: {
    viewBox: '0 0 48 48',
    paths: ['M30.5 18a8.5 8.5 0 1 0 0 12'],
    circles: [{ cx: 24, cy: 24, r: 21 }],
  },
};
