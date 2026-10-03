# Smart Mobility Systems and Operations Lab — Website

Website for Dr. Lakshay's lab, Department of Mechanical Engineering, IIT (BHU) Varanasi.
Plain HTML/CSS — no build step, no paid hosting. Deployed free with **GitHub Pages**.

## File structure

```
sml-lab/
├── index.html          → Home / About page
├── research.html        → Research areas
├── people.html           → PI, PhD/M.Tech scholars, collaborators, "join us"
├── publications.html   → Journal + conference papers
├── projects.html        → Funded grants + agency engagements
├── contact.html         → Contact details + embedded map
├── css/
│   └── style.css        → All styling (single shared stylesheet)
└── assets/
    ├── photos/           → Put people's photos here (see below)
    └── icons/            → Optional icons/logo files
```

## 1. How to publish this for free on GitHub Pages

1. Create a **new public GitHub repository**, e.g. `sml-lab` (or `<your-username>.github.io` if you want it as your main GitHub Pages site).
2. Upload all files in this folder to that repository (keep the folder structure — `css/` and `assets/` must stay as subfolders).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main**, folder **/(root)**. Save.
5. After a minute, your site will be live at:
   - `https://<your-username>.github.io/sml-lab/` (if repo is named `sml-lab`), or
   - `https://<your-username>.github.io/` (if the repo is named exactly `<your-username>.github.io`)

No payment, no server, no domain required. GitHub Pages is free forever for public repositories.

**Optional — custom domain:** if the lab later buys a domain (e.g. `smllab.in`), add a `CNAME` file with the domain name at the repo root and point the domain's DNS to GitHub Pages. Entirely optional — the free `github.io` URL works fine on its own.

## 2. Adding real photos (currently placeholders)

Right now, the PI and each student show a circular avatar with initials (e.g. "DL") instead of a photo. To swap in a real photo:

1. Save the photo as a square image (min. 300×300px) into `assets/photos/`, e.g. `assets/photos/lakshay.jpg`.
2. In the relevant HTML file, find the block like:
   ```html
   <div class="avatar">DL</div>
   ```
   and replace it with:
   ```html
   <div class="avatar"><img src="assets/photos/lakshay.jpg" alt="Dr. Lakshay"></div>
   ```
3. Repeat for each student in `people.html`.

## 3. The logo

The header already carries the final logo — a gold hub connected by four teal spokes, one per letter of **S·M·S·O** (Smart, Mobility, Systems, Operations). It's inlined directly as SVG code inside `<div class="brand-mark">...</div>` in every page, not linked as an image file — this is what makes it animate (hub rotates, spokes thicken, nodes grow) when you hover over it.

Two source files live in `assets/icons/`:
- `logo-smso-header.svg` — the compact mark currently live in the header
- `logo-smso-emblem-final.svg` — a larger, more detailed version with the full "SMART / MOBILITY / SYSTEMS / OPERATIONS" wordmark spelled out underneath in matching colours. Use this one for: your GitHub Pages favicon, LinkedIn/Twitter profile picture, printed posters, or a PDF letterhead.

Open `logo-final.html` in your browser any time to see both side by side.

**To change the header logo later:** open any HTML file, find `<div class="brand-mark">` and replace the SVG code between its tags with a different one — then repeat across all 6 pages so it stays consistent site-wide.

**Adding a favicon** (the little icon in the browser tab): save `logo-smso-emblem-final.svg` as `favicon.svg`, drop it in the repo root, and add this line inside `<head>` of every HTML file:
```html
<link rel="icon" type="image/svg+xml" href="favicon.svg">
```

## 4. Updating content

- **Announcements / open positions**: edit the `.announce` block in `index.html` and `people.html`.
- **Adding a new publication**: copy an existing `<div class="pub">...</div>` block in `publications.html` and edit the text — group under the right `<div class="pub-year">YYYY</div>` heading.
- **Adding a new student**: copy an existing `.card.person` block in `people.html`.
- **Adding a new project**: copy a `.stop` block in `projects.html`.
- **Colors/fonts**: all defined once at the top of `css/style.css` under `:root { ... }` — change a hex value there and it updates across every page.

## 5. Checking it locally before publishing

You don't need any software installed — just double-click `index.html` and it opens in your browser. Click through the nav to check all pages before uploading to GitHub.

## 6. Renaming the lab

If you want a different lab name than "Smart Mobility Systems and Operations Lab":
- Use "Find and Replace" across all `.html` files for the phrase `Smart Mobility Systems and Operations Lab` (and `SMSO` for the short mark).
- Also update the `<title>` tag at the top of each file.

## 7. What's animated / interactive now

- **Network canvas** in the hero of every page — animated dots that drift and connect with lines when close, echoing the transit/logistics-network theme. Pure JS canvas, no libraries, respects the visitor's OS-level "reduce motion" setting automatically.
- **Scroll-reveal**: sections and cards fade/slide into view as you scroll (`assets/js/main.js`, `initReveal()`).
- **Animated stat counters** on the homepage "By the numbers" section — numbers count up when scrolled into view (`data-counter` attribute).
- **Hover interactions**: cards lift with a shadow and a gold-to-teal top accent bar sweeps in; publication rows highlight; timeline "stops" nudge sideways.
- **Publications filter bar**: click "Journal articles" / "Conference papers" / "All" to instantly filter the list — no page reload.
- **Live publication search box**: type any word (author, title, year) and the list filters as you type.
- **Dark / light mode toggle** (☾ / ☀ icon, top-right of every page): the visitor's choice is remembered across visits via their browser's local storage — no login needed.
- **Scroll progress bar**: thin gold-to-teal bar at the very top of the page fills as you scroll, so long pages (like Publications) feel navigable.
- **FAQ accordion** on the People → Join the Lab section — click a question to expand its answer.
- **Lab journey timeline** on the homepage About section — a horizontal (vertical on mobile) route-style timeline of Dr. Lakshay's career milestones.
- **Tools & methods tag cloud** on the Research page — hover any tag to see it lift.
- **Mobile menu**: below 760px width, the nav collapses behind a ☰ button.
- **Back-to-top button**: appears after scrolling down, smooth-scrolls back up.

All of this lives in two files only:
- `css/style.css` — bottom sections labelled "Interactivity & motion layer" and "New: theme toggle, scroll progress, accordion, search, tag cloud"
- `assets/js/main.js` — plain vanilla JavaScript, no build step, no dependencies, works as-is on GitHub Pages.

**Extending these patterns:**
- New FAQ item → copy a `.faq` block in `people.html` and edit the question/answer text.
- New timeline milestone → copy a `.journey-stop` block in `index.html`.
- New tool/tag → add a `<span>` inside `.tag-cloud` in `research.html`.
- New filterable publication → add `data-tags="journal"` or `data-tags="conference"` to the section it lives in (already done); the search box works automatically on any `.pub` element's text.

## 8. Tips to make this the best version of the site

**Content — the single biggest lever**
- Real photos beat initials-avatars every time. A well-lit headshot of Dr. Lakshay and each scholar will do more for credibility than any animation.
- Fill in every "Update with exact venue & DOI" placeholder in `publications.html` — incomplete citations look unfinished to visiting academics and recruiters.
- Add 1–2 sentences of *personality* to each PhD scholar's card (why they chose this topic, one interesting fact) — it makes the People page memorable instead of a directory.
- Keep the Announcements block current. A stale "PhD positions open" banner from 8 months ago actively hurts credibility — update or remove it the moment it's no longer true.

**Growth — things to add as the lab grows**
- A **News/Blog** page for short posts (paper accepted, talk given, award won) — reuses the `.route-list` timeline component already in `projects.html`.
- A **Gallery** page for conference photos, lab outings, poster sessions — builds culture and helps recruiting.
- **Alumni** section on `people.html` once scholars graduate — "where are they now" is one of the most-viewed sections on lab sites.
- A **Teaching** page if Dr. Lakshay wants to list courses taught — useful for prospective students picking an advisor.

**Technical hygiene**
- Run your site through Google's free PageSpeed Insights (pagespeed.web.dev) periodically — paste in your github.io URL.
- Check the browser console (F12 → Console tab) on each page after big edits — a red error usually means a typo broke a tag.
- Keep image file sizes small (compress photos before uploading — tinypng.com is free) so the site stays fast.
- Every new HTML page you add should copy the exact `<header>`, `.scroll-progress`, and footer `<script>` block from an existing page, so the theme toggle and animations keep working everywhere.

**Getting found**
- Submit your URL to Google Search Console (free) so it shows up in search results.
- Add the site link to Dr. Lakshay's official IIT (BHU) faculty page, his Google Scholar profile, and his email signature.
- Share it on the department's website/newsletter if they allow external lab-page links.

## Content sources

All research, project, funding, and student information was compiled from Dr. Lakshay's official IIT (BHU) faculty page and public Google Scholar profile as of August 2026. Please review and correct any details (exact grant amounts, publication venues/DOIs, student names) before publishing — placeholders marked "Update with exact venue & DOI" in `publications.html` still need to be filled in with real citation details.
