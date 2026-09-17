# Publishing Musings

## Where to write

Open `/Users/akwasis/Documents/quartz/content` as an Obsidian vault. This is the single source of truth for notes that should appear in Musings.

Write new notes inside the garden path that fits best:

- `work-and-practice/`
- `learning/`
- `ideas-and-observations/`
- `experiments/`
- `people-and-public-engagement/`

A note can live in one path while linking to ideas across the rest of the garden. Do not worry about finding the perfect category.

## A simple note

Create a Markdown file with a clear filename, for example `compliance-isnt-commitment.md`.

Optional frontmatter:

```markdown
---
title: Compliance isn't the same as commitment
description: A short note about the difference between following a process and genuinely taking ownership.
tags:
  - leadership
  - culture
  - behaviour
---
```

Use Obsidian links to connect notes, for example `[[psychological-safety]]`.

## Publishing a change

From Terminal, run:

```bash
cd /Users/akwasis/Documents/quartz
git add content
git commit -m "Add note about compliance and commitment"
git push
```

GitHub Pages will publish the change automatically. The update normally appears within a few minutes.
