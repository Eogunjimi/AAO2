# Partner & accreditation logos — sourcing

The trust strip under the hero (`<TrustBadges />` → `<PartnerStrip />`) lists ten
organisations. Every one currently renders as a typographic wordmark because no artwork has
been supplied yet. This file records where the real artwork comes from and what permission
each mark needs.

Drop files in `public/images/partners/` and set `logo` on the matching entry in
`src/data/company.js`. The file contract is in
[`public/images/partners/README.md`](../public/images/partners/README.md).

---

## Read this before uploading anything

The ten marks fall into two groups, and they carry different risk.

**Five are regulators or professional bodies** — CAC, COREN, NEMSA, NSE, REAN. Displaying
their logo under the heading _"Certified, accredited & partnered with the best"_ is a public
claim that AAO Engineering Services holds that accreditation. Only use a mark the business
actually holds, and check the certificate: these bodies usually issue a specific
_"Registered Firm"_ / _"Licensed Contractor"_ / _"Member"_ mark bearing your registration
number, and that is the artwork to use — **not** the body's corporate logo, which generally
may only be used by the body itself.

**Five are manufacturers** — Felicity Solar, Luminous, Growatt, Deye, Hikvision. Showing
their logo implies an authorised dealer or partner relationship. Each has brand guidelines
and most require written permission. Hikvision's partner guidelines state the position
plainly: the corporate logo may not be used beyond the stated purposes _"unless explicitly
authorized by Hikvision"_. In practice your distributor can usually supply both the approved
logo pack and the authorisation.

If a given accreditation or partnership is aspirational rather than current, leave that entry
as a wordmark or remove it. A wordmark makes a far weaker claim than a logo.

---

## Where to get each one

Domains confirmed by research; the deep links are the pages that carry the artwork.

### Accreditation bodies

| Mark      | Organisation                                           | Source                                       |
| --------- | ------------------------------------------------------ | -------------------------------------------- |
| **CAC**   | Corporate Affairs Commission                           | `cac.gov.ng`                                 |
| **COREN** | Council for the Regulation of Engineering in Nigeria   | `coren.gov.ng` — footer logo asset is 375×94 |
| **NEMSA** | Nigerian Electricity Management Services Agency (2012) | `nemsa.gov.ng`                               |
| **NSE**   | Nigerian Society of Engineers (1958, Abuja)            | `nse.org.ng`                                 |
| **REAN**  | Renewable Energy Association of Nigeria (2016, Abuja)  | `rean.org.ng`                                |

For all five, the reliable route is to email the body and ask for the member/registered-firm
mark as SVG or EPS, quoting your registration number. Site artwork is usually a small raster
that will not hold up at 2×.

### Manufacturer partners

| Mark               | Source                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Hikvision**      | `hikvision.com/uk/support/marketing-portal/logos/` — official PNG + PDF; see also their _Brand Guidelines for Partners_ PDF |
| **Felicity Solar** | `felicitysolar.com` (Guangzhou Felicity Solar Technology Co., Ltd.)                                                         |
| **Growatt**        | `growatt.com` — confirm the current brand/press page                                                                        |
| **Deye**           | `deyeinverter.com` — confirm the current brand/press page                                                                   |
| **Luminous**       | `luminousindia.com` — confirm the current brand/press page                                                                  |

Hikvision and Felicity Solar were confirmed directly. The remaining three are the
well-known official domains but were not individually verified — check the brand or press
section before downloading, or ask your distributor.

---

## Why these were not fetched automatically

Two reasons, both worth knowing before anyone tries again:

1. **Automated image search returns the wrong artwork.** A search for the COREN logo returned,
   as its top results, the Federal University Oye-Ekiti crest (from a university's upload
   folder) and a generic avatar placeholder from a contact-scraping site. Committing those
   would have put a university crest on the page captioned as an engineering regulator. These
   niche institutional marks are not reliably indexed, so every file needs a human to confirm
   it against the organisation's own site.

2. **Trademark artwork should come from the owner.** Third-party logo aggregators host
   outdated variants, wrong colourways and redrawn approximations. For marks that assert
   accreditation, an out-of-date or redrawn version is worse than no logo at all.
