const motion = portfolio.motion;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (motion?.enabled && !reducedMotion.matches && "IntersectionObserver" in window) {
  const root = document.documentElement;
  root.style.setProperty("--reveal-duration", `${motion.duration}ms`);
  root.classList.add("motion-enabled");

  renderHeadline(true);

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting, intersectionRatio } of entries) {
      if (isIntersecting && intersectionRatio >= 0.12) {
        target.classList.remove("reveal-pending");
        target.classList.add("is-visible");
        // The sticky header stays visible; other elements can replay.
        if (target.matches(".header") || motion.replay === false) observer.unobserve(target);
      } else if (!isIntersecting) {
        // Reset only after fully leaving view, avoiding flicker at the edge.
        target.classList.remove("is-visible");
        target.classList.add("reveal-pending");
      }
    }
  }, { threshold: [0, 0.12] });

  const revealGroups = [
    ".header",
    ".hero > div:first-child > *",
    ".topology",
    ".impact > .eyebrow",
    ".stat",
    ".section-heading",
    ".project",
    ".job",
    ".toolkit > div",
    ".about-title, .about-copy, #contact > .eyebrow, .contact-intro",
    ".contact-row",
    "footer",
  ];

  for (const selector of revealGroups) {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index, 3) * motion.stagger}ms`);
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
  }

  const signal = document.createElement("span");
  signal.className = "signal";
  signal.setAttribute("aria-hidden", "true");
  document.querySelector(".diagram").append(signal);

  const topology = document.querySelector(".topology");
  const flowObserver = new IntersectionObserver(([entry]) => {
    topology.classList.toggle("flow-active", entry.isIntersecting);
  });
  flowObserver.observe(topology);

  const updateSignal = () => {
    const request = document.querySelector(".request");
    const service = document.querySelector(".service");
    const start = request.offsetTop + request.offsetHeight + 3;
    signal.style.setProperty("--signal-top", `${start}px`);
    signal.style.setProperty("--signal-second", `${service.offsetTop + service.offsetHeight + 3 - start}px`);
    signal.style.setProperty("--signal-end", `${service.offsetTop + service.offsetHeight + 35 - start}px`);
  };
  const signalObserver = "ResizeObserver" in window ? new ResizeObserver(updateSignal) : null;
  signalObserver?.observe(document.querySelector(".diagram"));
  window.addEventListener("resize", updateSignal);
  updateSignal();

  let frame;
  const updateProgress = () => {
    const distance = root.scrollHeight - innerHeight;
    root.style.setProperty("--scroll-progress", distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0);
    frame = null;
  };
  const scheduleProgress = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
  window.addEventListener("scroll", scheduleProgress, { passive: true });
  window.addEventListener("resize", scheduleProgress);
  updateProgress();

  // Switching the OS preference during a visit also stops every effect.
  reducedMotion.addEventListener("change", ({ matches }) => {
    if (!matches) return;
    observer.disconnect();
    flowObserver.disconnect();
    signalObserver?.disconnect();
    window.removeEventListener("resize", updateSignal);
    root.classList.remove("motion-enabled");
    document.querySelectorAll(".reveal-pending").forEach((element) => element.classList.remove("reveal-pending"));
    window.removeEventListener("scroll", scheduleProgress);
    window.removeEventListener("resize", scheduleProgress);
    cancelAnimationFrame(frame);
  });
}
