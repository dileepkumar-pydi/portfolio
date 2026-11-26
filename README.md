# Dileep's portfolio

My Java backend portfolio, hosted at [dileepkumar-pydi.github.io/portfolio](https://dileepkumar-pydi.github.io/portfolio/).

Built with static HTML, CSS and vanilla JavaScript. No install or build step. All career details and project descriptions are in the HTML, so the page also works without JavaScript.

## Run locally

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000).

## Make changes

- `index.html`: text, links, project diagrams and SEO metadata. Edit the visible content directly. Keep the Person JSON-LD and social metadata in sync with your details.
- `styles.css`: dark palette, layout and responsive styles.
- `app.js`: active navigation state.
- `motion.js`: scroll reveals, animated impact counters and service topology effects. The settings at the top control timing and replay. Reduced-motion preferences disable animations.
- `assets/icons/`: local technology icons from [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0), with its license included.
- `sitemap.xml` and `robots.txt`: discovery metadata for the GitHub Pages URL.

Project diagrams are conceptual; private project source, endpoints and internal infrastructure are not published here. Only the personal open-source library has a public project link.

## Before publishing

- TODO: Add `assets/Pydi_Dileep_Kumar_Resume.pdf`. The Download Resume button already points to this file. Remove the visible resume TODO from `index.html` once the PDF is in place, and remove its `aria-describedby="resume-todo"` reference.
- TODO: Add `assets/og-image.png` (recommended 1200 × 630). Social metadata already references the full GitHub Pages URL. Remove the matching TODO comment after adding it.

The resume link returns 404 until the PDF is added. Social image previews need the PNG. No phone number is published.

## Check changes

```sh
curl -s http://localhost:8000/ | grep -i 'Spring Boot'
npx html-validate index.html
npx lighthouse http://localhost:8000 --only-categories=performance,accessibility,seo,best-practices
```

These are optional development tools, not site dependencies. The site has no third-party scripts or trackers.

## Publish with GitHub Pages

1. Commit your changes and push the `portfolio-upgrade` branch.
2. Review and merge it into `main`.
3. In **Settings → Pages**, use **Deploy from a branch**, `main`, and `/(root)`.
4. Wait for the Pages deployment to finish, then open the live URL above. Keep HTTPS enforced.

Keep `robots.txt` in the repository for Pages to serve under `/portfolio/robots.txt`. Crawlers normally look for robots rules at the domain root; if you maintain `dileepkumar-pydi.github.io`, add the sitemap URL to its root `robots.txt` too.
