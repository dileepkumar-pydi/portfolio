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
  const distance = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty("--scroll-progress", distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0);
  navigationFrame = null;
}

function scheduleNavigation() {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
}

window.addEventListener("scroll", scheduleNavigation, { passive: true });
window.addEventListener("resize", scheduleNavigation);
document.querySelectorAll("details").forEach((details) => details.addEventListener("toggle", scheduleNavigation));
updateNavigation();

// Email links remain available when clipboard access or JavaScript is unavailable.
const copyEmail = document.querySelector(".copy-email");
const emailAddress = document.querySelector(".email-address");
const copyStatus = document.querySelector(".copy-status");
if (navigator.clipboard?.writeText) {
  copyEmail.hidden = false;
  copyEmail.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailAddress.textContent.trim());
      copyStatus.textContent = "Email copied.";
    } catch {
      copyStatus.textContent = "Could not copy. Select the email address above to copy it.";
    }
  });
}
