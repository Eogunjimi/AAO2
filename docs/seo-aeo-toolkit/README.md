# SEO & AEO Toolkit for Claude Code

Drop-in `.claude/` toolkit. Rank higher in Google. Get cited in ChatGPT, Perplexity, and AI Overviews. Claude does the work — you make the decisions.

8 commands, 12 skills, 4 agents, and a Google Indexing API helper. Copy the `.claude/` folder into any project and Claude Code picks it up automatically.

---

## Install

### Option A — Add to an existing project

From the root of your project:

```bash
git clone https://github.com/Produlis/seo-aeo-toolkit.git /tmp/seo-aeo-toolkit
cp -R /tmp/seo-aeo-toolkit/.claude/* .claude/
rm -rf /tmp/seo-aeo-toolkit
```

If your project doesn't have a `.claude/` folder yet, create one first: `mkdir .claude`.

### Option B — Use as a starter

```bash
git clone https://github.com/Produlis/seo-aeo-toolkit.git my-project
cd my-project
rm -rf .git && git init
```

Open the project in Claude Code and run:

```
/seo-aeo
```

---

## Before you start

1. **Claude Code** — [claude.ai/code](https://claude.ai/code)
2. **A website URL** — your live site (rebuild) or planned domain (new site)
3. **Google Search Console** connected — free at [search.google.com/search-console](https://search.google.com/search-console)
4. **Google Analytics 4** connected — free at [analytics.google.com](https://analytics.google.com)

---

## How it works

Run `/seo-aeo` and Claude guides you through every phase — doing the audits, writing the content, generating schema, building your keyword strategy, and tracking progress. Come back anytime and run `/seo-aeo` again. It picks up exactly where you left off.

### New site or rebuild?

Claude asks first. It matters:

**New site** — starts with a competitive audit and technical setup before any content goes live.

**Rebuilding an existing site** — runs a pre-migration snapshot first: crawls the live site, captures current rankings from Search Console, documents the full URL structure, and builds a 301 redirect map. Skipping this is the most common reason sites lose traffic after a relaunch.

---

## What happens at each phase

| Phase | What Claude does |
|-------|-----------------|
| 00 — Foundation Audit | Audits the site, snapshots rankings, tests AI engine visibility |
| 01 — Technical SEO | Fixes crawl issues, on-page elements, schema, Core Web Vitals |
| 02 — Keyword Strategy | Keyword research, topic clustering, 12-month content calendar |
| 03 — AEO Content | Answer-first rewrites, FAQ sections, content structured for AI citation |
| 04 — Link Building | Quick wins, unlinked mentions, outreach templates, linkable assets |
| 05 — Content Production | Pillar pages, cluster articles, glossary, FAQ hubs |
| 06 — Brand & Entity | Entity footprint, Wikidata, press page, AI citation building |
| 07 — Schema & AI Access | HowTo/ItemList schema, llms.txt, AI crawler access |
| 08 — Link Building at Scale | Monthly outreach system, guest posts, partnerships |
| 09 — UX & Conversion | CTR optimization, page experience, content performance |
| 10 — Measurement | Full-year review, AEO progress, Year 2 planning |

---

## Commands

| Command | What it does |
|---------|-------------|
| `/seo-aeo` | The full phased SEO & AEO process. Picks up where you left off. |
| `/index-pages <url>` | Submit a URL to Google's Indexing API for fast indexing |
| `/seo-check` | Quick SEO check on any page |
| `/generate-schema` | Generate schema markup for any content type |
| `/keyword-cluster` | Cluster a list of keywords into topic groups |
| `/create-content` | Write an SEO + AEO optimized article |
| `/create-topic` | Research and build a complete topic cluster |
| `/translate-content` | Translate content with full international SEO |

Or just ask Claude in plain English — most tasks trigger the right skill automatically.

---

## What's included

**Commands** (8) — slash-invoked workflows in `.claude/commands/`

**Skills** (12) — auto-trigger from natural language, in `.claude/skills/`:
- `seo-audit`, `technical-seo`, `on-page-seo`, `internal-linking`, `broken-links`
- `keyword-clustering`, `content-strategy`, `content-brief`, `content-translation`
- `schema-markup`, `ai-visibility`, `google-indexing`

**Agents** (4) — deeper autonomous work, in `.claude/agents/`:
- `seo-auditor`, `searchfit-seo-auditor`, `competitor-analyzer`, `content-strategist`

**Helper script** — zero-dependency Node script for the Google Indexing API at `.claude/scripts/google-index.js`.

---

## Google Indexing API setup (one-time)

The `google-indexing` skill walks you through this when you first use it. In short:

1. Create a Google Cloud project, enable the Web Search Indexing API
2. Create a service account, download the JSON key
3. Save it as `.google-indexing-key.json` in your project root (add to `.gitignore` — never commit)
4. Add the service account email as **Owner** in Google Search Console

After that, `/index-pages <url>` submits any page to Google in seconds.

---

## Progress tracking

`/seo-aeo` saves your progress in `SEO-AEO-PROGRESS.md` at your project root. Every completed phase is checked off. Every session picks up where the last one ended.

For rebuild users, additional files are created:
- `MIGRATION-URL-INVENTORY.md` — every URL on the current site
- `MIGRATION-RANKINGS-SNAPSHOT.md` — current rankings before migration
- `MIGRATION-REDIRECT-MAP.md` — 301 redirect plan

---

## Plugin version

Want to install this as a Claude Code plugin instead of copying files? See [Produlis/seo-aeo-plugin](https://github.com/Produlis/seo-aeo-plugin).

---

## License

MIT
