# PDK Portfolio

My portfolio as a Java backend engineer, with projects, experience, and the tools I use. Built with HTML, CSS, and JavaScript.

## Run locally

From this folder:

```sh
python3 -m http.server 5173
```

Open [localhost:5173](http://localhost:5173). You can also open `index.html` directly in a browser. There's nothing to install or build.

## Update the content

Most changes go in `content.js`: your bio, projects, experience, skills, and links. Add or remove entries in the lists as needed.

- Add experience dates to `dates`. Blank dates stay hidden.
- Use `mailto:you@example.com` for your email URL.
- For a resume, add `resume.pdf` to this folder and set its URL to `./resume.pdf`.
- Add a project's `url` to make its title clickable. Its `stack` list controls the technology tags.
- Contact `text` is the label shown beside the link. Blank URLs remain placeholders.

## Files

| File | What it does |
| --- | --- |
| `content.js` | Portfolio content, icon mapping, and animation settings |
| `index.html` | Page sections and service diagram |
| `styles.css` | Dark theme, layout, and hover effects |
| `app.js` | Renders the content and updates navigation |
| `motion.js` | Scroll reveals and diagram animation |
| `assets/icons/` | Local technology icons |

Colors are at the top of `styles.css`. The mobile layout starts at `760px`.

Animations replay when you scroll away and return. In `content.js`, set `motion.replay` to `false` to play them once, or `motion.enabled` to `false` to turn off scroll and diagram animations. `duration` and `stagger` are in milliseconds. Reduced-motion preferences are respected.

## Deploy

Upload the HTML, CSS, JavaScript files, and `assets` folder to a static host. Include your resume if you've added one. Leave the build command empty and use the repository root as the publish directory.

Fill in your contact links and check the project details before publishing.

Technology icons come from [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0). The license is included in `assets/icons/LICENSE`.
