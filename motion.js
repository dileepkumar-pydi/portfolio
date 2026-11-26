// Every effect completes in under 400ms. Text is always supplied by the HTML.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  root.classList.add("motion-enabled");
  const reveal = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      target.classList.toggle("reveal-pending", !isIntersecting);
      target.classList.toggle("is-visible", isIntersecting);
    }
  }, { threshold: 0.05 });

  document.querySelectorAll(".stat, .section-heading, .project, .job, .toolkit > div, .about-copy, footer").forEach((element) => {
    if (element.getBoundingClientRect().top >= innerHeight) element.classList.add("reveal-pending");
    reveal.observe(element);
  });

  // Keep the final number accessible while its decorative copy counts up.
  const activeCounters = new Map();
  const counters = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      counters.unobserve(target);
      const value = Number(target.dataset.count);
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 320, 1);
        target.textContent = Math.round(value * (1 - (1 - progress) ** 3));
        if (progress < 1) activeCounters.set(target, requestAnimationFrame(tick));
        else activeCounters.delete(target);
      };
      activeCounters.set(target, requestAnimationFrame(tick));
    }
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((counter) => counters.observe(counter));

  // Short hops, separated by quiet pauses, follow the existing topology branches.
  const topology = document.querySelector(".topology");
  const diagram = topology.querySelector(".diagram");
  const nodes = [...diagram.querySelectorAll(".node")];
  const signal = document.createElement("span");
  signal.className = "signal";
  signal.setAttribute("aria-hidden", "true");
  diagram.append(signal);
  let flowTimer;
  let hopAnimation;
  let visible = false;
  let stopped = false;

  function stopFlow() {
    clearTimeout(flowTimer);
    hopAnimation?.cancel();
    nodes.forEach((node) => node.classList.remove("is-active"));
  }

  function hop(from, to) {
    const diagramBox = diagram.getBoundingClientRect();
    const start = from.getBoundingClientRect();
    const end = to.getBoundingClientRect();
    signal.style.left = `${start.left + start.width / 2 - diagramBox.left - 2}px`;
    signal.style.top = `${start.bottom - diagramBox.top}px`;
    hopAnimation = signal.animate([
      { transform: "translate(0, 0)", opacity: 0 },
      { opacity: 1, offset: 0.2 },
      { transform: `translate(${end.left + end.width / 2 - start.left - start.width / 2}px, ${end.top - start.bottom}px)`, opacity: 0 },
    ], { duration: 280, easing: "ease-out" });
  }

  function startFlow() {
    stopFlow();
    if (stopped || !visible || document.hidden) return;
    let step = 0;
    const next = () => {
      nodes.forEach((node) => node.classList.remove("is-active"));
      const node = nodes[step];
      node.classList.add("is-active");
      if (step === 1) hop(nodes[0], node);
      if (step > 1) hop(nodes[1], node);
      step += 1;
      if (step < nodes.length) flowTimer = setTimeout(next, 600);
      else flowTimer = setTimeout(() => {
        stopFlow();
        flowTimer = setTimeout(startFlow, 1400);
      }, 600);
    };
    next();
  }

  const flow = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    startFlow();
  });
  flow.observe(topology);
  document.addEventListener("visibilitychange", startFlow);

  reducedMotion.addEventListener("change", ({ matches }) => {
    if (!matches) return;
    stopped = true;
    stopFlow();
    flow.disconnect();
    reveal.disconnect();
    counters.disconnect();
    document.removeEventListener("visibilitychange", startFlow);
    root.classList.remove("motion-enabled");
    document.querySelectorAll(".reveal-pending").forEach((element) => element.classList.remove("reveal-pending"));
    for (const [target, frame] of activeCounters) {
      cancelAnimationFrame(frame);
      target.textContent = target.dataset.count;
    }
    activeCounters.clear();
  });
}
