function escapeHtml(value) {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value).replace(/[&<>"']/g, (character) => entities[character]);
}

function safeUrl(url) {
  return /^(https?:\/\/|mailto:|\.\/)/i.test(url) ? escapeHtml(url) : "";
}

function technologyIcon(label) {
  const icon = portfolio.icons[label];
  if (!icon || !/^[a-z-]+$/.test(icon)) return "";

  return `<img class="tech-icon" src="./assets/icons/${icon}.svg"
    width="18" height="18" alt="" aria-hidden="true">`;
}

function tags(items) {
  return items.map((item) => `<span>${technologyIcon(item)}${escapeHtml(item)}</span>`).join("");
}

function renderList(id, items, template) {
  document.getElementById(id).innerHTML = items.map(template).join("");
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function renderHeadline(animate = false) {
  const headline = document.getElementById("headline");
  const words = portfolio.headline.split(/\s+/);
  const accent = portfolio.headlineAccent;
  const accentStart = accent ? portfolio.headline.indexOf(accent) : -1;
  let position = 0;

  headline.setAttribute("aria-label", `${portfolio.headline}.`);
  headline.innerHTML = words.map((word, index) => {
    let text = escapeHtml(word);
    if (accentStart >= 0 && position >= accentStart && position < accentStart + accent.length) {
      text = `<span class="hero-accent">${text}</span>`;
    }
    position += word.length + 1;
    if (index === words.length - 1) text += '<span class="accent">.</span>';
    if (!animate) return text;

    return `<span class="word-mask" aria-hidden="true"><span class="word"
      style="--word-delay:${index * portfolio.motion.stagger}ms">${text}</span></span>`;
  }).join(" ");
}

function projectMarkup(project, index) {
  const url = safeUrl(project.url);
  const title = escapeHtml(project.title);
  const heading = url
    ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${title} <span class="accent" aria-hidden="true">↗</span></a>`
    : title;

  return `
    <article class="project">
      <div>
        <p class="eyebrow"><span class="project-number">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(project.category)}</p>
        <h3>${heading}</h3>
      </div>
      <div>
        <p>${escapeHtml(project.description)}</p>
        ${project.highlight ? `<p class="highlight">${escapeHtml(project.highlight)}</p>` : ""}
        <div class="project-stack">${tags(project.stack)}</div>
      </div>
    </article>`;
}

function experienceMarkup(job) {
  return `
    <article class="job">
      <div class="job-heading">
        <h3>${escapeHtml(job.title)}</h3>
        ${job.dates ? `<span class="stack">${escapeHtml(job.dates)}</span>` : ""}
      </div>
      <p>${escapeHtml(job.company)}</p>
      <ul>${job.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>`;
}

function contactMarkup(contact) {
  const url = safeUrl(contact.url);
  const detail = escapeHtml(contact.text || contact.url);
  const content = `<span>${escapeHtml(contact.label)}</span>
    <span class="contact-detail">${detail}${url ? ' <span class="accent" aria-hidden="true">↗</span>' : ""}</span>`;

  if (!url) return `<div class="contact-row unconfigured">${content}</div>`;
  const external = /^https?:/i.test(contact.url) ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="contact-row" href="${url}"${external}>${content}</a>`;
}

setText("name", portfolio.name);
setText("role", portfolio.role);
setText("intro", portfolio.intro);
setText("about-copy", portfolio.about);
setText("contact-intro", portfolio.contactIntro);
setText("footer-name", `${portfolio.name} / ${portfolio.title}`);
document.title = `${portfolio.name} | ${portfolio.title}`;
document.querySelector(".brand").textContent = portfolio.brand;
document.querySelector(".footer-note").textContent = portfolio.footerNote;
document.querySelector(".about-title").innerHTML = `${escapeHtml(portfolio.aboutHeadline)}<span class="accent">.</span>`;
document.querySelector('meta[name="description"]').content = `${portfolio.name} — ${portfolio.intro}`;
renderHeadline();
document.getElementById("hero-stack").innerHTML = tags(portfolio.heroStack);

renderList("stats", portfolio.stats, (stat) => `
  <div class="stat">
    <p>${stat.prefix ? `<small>${escapeHtml(stat.prefix)}</small>` : ""}${escapeHtml(stat.value)}</p>
    <span>${escapeHtml(stat.label)}</span>
  </div>`);
renderList("project-list", portfolio.projects, projectMarkup);
renderList("experience-list", portfolio.experience, experienceMarkup);
renderList("skill-list", portfolio.skills, (skill) => `
  <div>
    <p class="eyebrow">${escapeHtml(skill.category)}</p>
    <div class="skill-tags">${tags(skill.items)}</div>
  </div>`);
renderList("contact-list", portfolio.contacts, contactMarkup);

const navigationLinks = Array.from(document.querySelectorAll("nav a"));
const navigationSections = Array.from(document.querySelectorAll("#projects, #experience, #skills, #about, #contact"));
const header = document.querySelector(".header");
let navigationFrame;

function updateNavigation() {
  const offset = header.offsetHeight + 80;
  let current;
  for (const section of navigationSections) {
    if (section.getBoundingClientRect().top <= offset) current = section.id;
  }
  if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 3) current = "contact";

  for (const link of navigationLinks) {
    if (link.hash === `#${current}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  navigationFrame = null;
}

function scheduleNavigation() {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
}

window.addEventListener("scroll", scheduleNavigation, { passive: true });
window.addEventListener("resize", scheduleNavigation);
updateNavigation();
