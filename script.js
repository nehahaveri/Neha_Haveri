/* ─── Typing Animation ─────────────────────────────────────────── */
const roles = ['Full-Stack Engineer', 'AI/ML Developer', 'Microservices Architect'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typingEl) type();

  /* ─── Navbar scroll behaviour ────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ─── Mobile hamburger ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  /* Close menu on nav-link click */
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ─── Intersection Observer — fade-in sections ───────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ─── Active nav link on scroll ─────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));
});
