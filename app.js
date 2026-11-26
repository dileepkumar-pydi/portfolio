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
