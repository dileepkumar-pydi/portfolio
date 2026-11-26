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
- `motion.js`: scroll reveals, animated impact counters and service topology effects. Reduced-motion preferences disable animations.
- `assets/icons/`: local technology icons from [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0), with its license included.
- `sitemap.xml` and `robots.txt`: discovery metadata for the GitHub Pages URL.

Project diagrams are conceptual; private project source, endpoints and internal infrastructure are not published here. Only the personal open-source library has a public project link.

## Included assets

The Download Resume button uses `assets/Pydi_Dileep_Kumar_Resume.pdf`. Replace that file to update the resume. The social preview image is `assets/og-image.png`; Open Graph, Twitter and Person JSON-LD reference its absolute GitHub Pages URL.

Case studies use native `<details>` elements. They expand with a mouse or keyboard without JavaScript. Contribution summaries, stack chips and all case-study text are present in the HTML.

The copy-email button appears when the Clipboard API is available; email, LinkedIn and GitHub links work without JavaScript. Every animated effect is under 400ms, with the service topology moving in short hops separated by pauses. Reduced-motion preferences show final counter values and disable motion. Navigation and the scroll progress indicator update on scroll.

No phone number appears in the page text. The supplied resume PDF is available as a download.

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
