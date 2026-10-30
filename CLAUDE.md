# CLAUDE.md

## Tech Stack

- Plain HTML, CSS, and JavaScript only.
- No frameworks, no libraries that need installing, no build step.
  Files are opened or served exactly as written.

## Project Structure

- `index.html`: the portal homepage (tool cards)
- `css/styles.css`: shared styles and theme colors
- `js/theme.js`: the light/dark theme toggle
- `tools/tool-1/index.html`: placeholder tool page
- `README.md`: short project readme
- `CLAUDE.md`: this file

Keep this list up to date as files and folders are added.

## Key Requirements

1. Every page must be responsive and work on desktop, tablet and phone.
2. Users can toggle between a light and a dark theme.
   The default is the light theme.
3. Text must stay easy to read, with good contrast (a clear difference
   between text color and background color), in both the light and the
   dark theme.

## Feature Plan

A web portal where biology students try out small web tools.

### Portal structure

- **Homepage** (`index.html`): site name, theme toggle, and a grid of
  tool cards. Each card has a title, a topic tag, a one-line
  description and an "Open tool" link.
- **Opening a tool**: a card links to `tools/<tool-name>/`. Every tool
  page has the same header and an "← All tools" link back to the
  homepage. The chosen theme carries over between pages.
- **Shared files**: `css/styles.css` (colors for both themes, layout)
  and `js/theme.js` (the theme toggle).
- **Adding a tool later**: create a folder `tools/<tool-name>/` with
  its own `index.html` (plus its own CSS/JS if needed), then add one
  card to the homepage.

### Phases

**Phase 1: portal + first tool**
- [x] Homepage, shared styles and theme toggle. Tested with a
  placeholder card, "Tool 1 — coming soon" (`tools/tool-1/`), which
  opens and links back to the homepage. Styling is neutral for now.
- [ ] First tool, replacing the placeholder: *Blood Flow Through the
  Heart*. Students step through the 14 stops on a labelled heart
  diagram (Back/Next), then put 8 key stops in order in a short quiz
  and get a score.

**Phase 2: more tools** (to be decided)
- Add more biology tools, one folder and one card each.

**Later** (ideas, not committed)
- Saving quiz scores, user accounts.

## Rules for Claude

- Explain technical terms in plain language.
- Ask before making big changes.
- When something is unclear, ask rather than guess.
