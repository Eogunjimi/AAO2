# Partner & accreditation logos

Drop authorised logo artwork here, then point the matching entry in
`src/data/company.js` at it. Nothing else needs to change.

```js
// src/data/company.js
{ id: 'coren', name: 'COREN', descriptor: 'Accredited', logo: '/images/partners/coren.svg' },
```

Sourcing, and the authorisation each mark needs, is in
[`docs/partner-logos.md`](../../../docs/partner-logos.md).

## File contract

| Requirement | Value                                                                  |
| ----------- | ---------------------------------------------------------------------- |
| Format      | `.svg` preferred; `.png` with a **transparent** background otherwise   |
| Height      | Render height is 56px desktop / 42px mobile — supply ≥112px for retina |
| Width       | Capped at 190px desktop / 140px mobile; wider art is scaled to fit     |
| Background  | Must be transparent — the strip sits on the page surface               |
| Filename    | Lower-case, matches the entry `id` (`coren.svg`, `felicity-solar.svg`) |

## How the strip renders them

The strip shows marks **greyscale at 70% opacity** and restores full colour on
hover, so busy multi-colour logos still sit together calmly. A mark with no
`logo` renders as a wordmark-and-descriptor lockup instead.

If a `logo` path 404s or the file is corrupt, the mark falls back to that same
wordmark rather than showing a broken-image icon — so a half-finished upload
never breaks the strip. That fallback is covered by a test in
`PartnerStrip.test.jsx`; please keep it passing.
