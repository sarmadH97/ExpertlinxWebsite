const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
const progressBar = document.querySelector('.scroll-progress span');
const heroMedia = document.querySelector('.hero-media');
const parallaxPanel = document.querySelector('[data-parallax]');
const processPhoto = document.querySelector('.process-photo');
const outcomePhoto = document.querySelector('.outcome-photo img');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' });

document.querySelectorAll('[data-reveal], [data-stagger]').forEach((element) => revealObserver.observe(element));

let ticking = false;
const updateScrollEffects = () => {
  const maxScroll = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  progressBar.style.transform = `scaleX(${Math.min(scrollY / maxScroll, 1)})`;
  nav?.classList.toggle('is-scrolled', scrollY > 70);
  if (!reduceMotion) {
    if (heroMedia) heroMedia.style.transform = `scale(1.04) translate3d(0, ${Math.min(scrollY * 0.055, 58)}px, 0)`;
    if (parallaxPanel && scrollY < 1150) parallaxPanel.style.transform = `translate3d(0, ${Math.min(scrollY * 0.085, 92)}px, 0)`;
    [processPhoto, outcomePhoto].forEach((photo) => {
      if (!photo) return;
      const rect = photo.getBoundingClientRect();
      const offset = Math.max(-10, Math.min(10, ((rect.top + rect.height / 2) - innerHeight / 2) / innerHeight * -12));
      photo.style.objectPosition = `50% ${50 + offset}%`;
    });
  }
  ticking = false;
};

addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateScrollEffects); ticking = true; }
}, { passive: true });
updateScrollEffects();

const processSteps = [
  { title: 'Discover the whole picture.', summary: 'We learn how your people, processes, platforms and data fit together before deciding what should change.', focus: 'Map systems & friction', points: [['Business context', 'Goals, constraints and priorities made visible.'], ['System landscape', 'Platforms, handoffs and gaps mapped clearly.'], ['Practical next move', 'A grounded starting point—not a generic solution.']], colors: ['#95d3de', '#d5e3e0', '#f2d29d'] },
  { title: 'Design one clear direction.', summary: 'We turn what we have learned into a joined-up architecture, delivery plan and experience people can understand.', focus: 'Shape the right solution', points: [['Coherent architecture', 'Each platform and component has a clear role.'], ['Useful priorities', 'The highest-value changes come first.'], ['Visible trade-offs', 'Decisions stay grounded and understandable.']], colors: ['#b8d2ef', '#d9d9f1', '#e8cbed'] },
  { title: 'Deliver in useful increments.', summary: 'We build, connect and test in stages so progress is visible and teams can adopt change with confidence.', focus: 'Build, test & connect', points: [['Iterative delivery', 'Working improvements arrive in sensible stages.'], ['Quality built in', 'Security, performance and usability are tested.'], ['People included', 'Teams see, shape and understand what is changing.']], colors: ['#c9dfbb', '#dce9d1', '#f0d6a6'] },
  { title: 'Evolve what works.', summary: 'We support the system after launch, learn from real use and keep improving it as the business changes.', focus: 'Support & improve', points: [['Operational support', 'Keep critical systems dependable day to day.'], ['Continuous improvement', 'Use real feedback to refine the experience.'], ['Ready for change', 'Extend the system without repeatedly starting over.']], colors: ['#a6ddd3', '#d5ece6', '#d7e9a8'] }
];

const processButtons = [...document.querySelectorAll('.process-rail button')];
const processStage = document.querySelector('.process-stage');
const processVisual = document.querySelector('.process-visual');
let activeProcessStep = 0;
let processTimer;

function setProcessStep(index, manual = false) {
  const step = processSteps[index];
  if (!step || !processStage) return;
  activeProcessStep = index;
  processStage.classList.add('is-switching');
  setTimeout(() => {
    processStage.querySelector('.process-number').textContent = String(index + 1).padStart(2, '0');
    processStage.querySelector('.current-step').textContent = String(index + 1).padStart(2, '0');
    processStage.querySelector('.process-copy h3').textContent = step.title;
    processStage.querySelector('.process-summary').textContent = step.summary;
    processStage.querySelector('.insight-card strong').textContent = step.focus;
    processStage.querySelectorAll('.process-points li').forEach((item, pointIndex) => {
      item.querySelector('b').textContent = step.points[pointIndex][0];
      item.querySelector('span').textContent = step.points[pointIndex][1];
    });
    processVisual.style.setProperty('--step-a', step.colors[0]);
    processVisual.style.setProperty('--step-b', step.colors[1]);
    processVisual.style.setProperty('--step-c', step.colors[2]);
    processButtons.forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === index));
    processStage.classList.remove('is-switching');
  }, reduceMotion ? 0 : 380);
  if (manual && !reduceMotion) {
    clearInterval(processTimer);
    processTimer = setInterval(() => setProcessStep((activeProcessStep + 1) % processSteps.length), 7500);
  }
}

processButtons.forEach((button) => button.addEventListener('click', () => setProcessStep(Number(button.dataset.step), true)));

const processObserver = new IntersectionObserver(([entry]) => {
  if (!entry || reduceMotion) return;
  if (entry.isIntersecting) {
    if (!processTimer) processTimer = setInterval(() => setProcessStep((activeProcessStep + 1) % processSteps.length), 7500);
  } else {
    clearInterval(processTimer); processTimer = undefined;
  }
}, { threshold: 0.35 });
if (processStage) processObserver.observe(processStage);

document.querySelectorAll('.accordion article').forEach((item) => {
  const button = item.querySelector('button');
  button.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion article').forEach((other) => {
      other.classList.remove('open');
      other.querySelector('button').setAttribute('aria-expanded', 'false');
      other.querySelector('button b').textContent = '+';
    });
    if (!wasOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('b').textContent = '−';
    }
  });
});

if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.bento-card, .feature-panel, .outcome-grid article, .engagement-grid article').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${y * -2.2}deg) rotateY(${x * 2.2}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
