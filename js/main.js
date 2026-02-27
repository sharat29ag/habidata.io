/* ══════════════════════════════════════════════════
   main.js — All site interactivity
   ══════════════════════════════════════════════════ */

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile nav toggle ──
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
document.querySelectorAll('.nav-link, .nav-cta').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ── Scroll-triggered fade-up animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Copy BibTeX ──
function copyBibtex() {
  const code = document.getElementById('bibtexCode').textContent;
  const btn = document.getElementById('copyBtn');
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy BibTeX';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ── Download form ──
function handleDownload() {
  const name = document.getElementById('dlName').value.trim();
  const email = document.getElementById('dlEmail').value.trim();
  const inst = document.getElementById('dlInstitution').value.trim();

  if (!name || !email || !inst) {
    if (!name) document.getElementById('dlName').style.borderColor = '#ff5f57';
    if (!email) document.getElementById('dlEmail').style.borderColor = '#ff5f57';
    if (!inst) document.getElementById('dlInstitution').style.borderColor = '#ff5f57';
    setTimeout(() => {
      document.querySelectorAll('.download-input').forEach(i => i.style.borderColor = '');
    }, 2000);
    return;
  }

  // TODO: Connect to backend (Formspree, Google Sheet, etc.)
  console.log('Download request:', { name, email, institution: inst });

  document.getElementById('downloadForm').style.display = 'none';
  document.getElementById('downloadSuccess').classList.add('show');
}

// Allow Enter key to submit download form
document.querySelectorAll('.download-input').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleDownload();
  });
});