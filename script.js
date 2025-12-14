/* ============ THEME TOGGLE ============ */
const body = document.body;
const themeBtn = document.getElementById('themeToggle');
const themeBtnTop = document.getElementById('themeToggleTop');
const detailThemeBtn = document.getElementById('detailThemeToggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
}

function toggleTheme() {
  body.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    body.classList.contains('dark') ? 'dark' : 'light'
  );
}

themeBtn?.addEventListener('click', toggleTheme);
themeBtnTop?.addEventListener('click', toggleTheme);
detailThemeBtn?.addEventListener('click', toggleTheme);

/* ============ MOBILE SIDEBAR ============ */
const openSidebar = document.getElementById('openSidebar');
const sidebar = document.getElementById('sidebar');

openSidebar?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (window.innerWidth <= 900) {
    if (
      sidebar &&
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      !openSidebar.contains(e.target)
    ) {
      sidebar.classList.remove('open');
    }
  }
});

/* ============ SHOW MORE PROJECTS ============ */
const showMoreBtn = document.getElementById('showMoreBtn');
const moreProjects = document.getElementById('moreProjects');

if (showMoreBtn && moreProjects) {
  let expanded = false;

  showMoreBtn.addEventListener('click', () => {
    expanded = !expanded;
    moreProjects.style.display = expanded ? 'block' : 'none';
    showMoreBtn.textContent = expanded ? 'Show Less' : 'Show More (2)';
  });
}

/* ============ KNOW MORE TOGGLE (PROJECTS) ============ */
const knowButtons = document.querySelectorAll('.know-btn');

knowButtons.forEach((btn) => {
  const targetSelector = btn.getAttribute('data-target');
  const target = document.querySelector(targetSelector);

  if (!target) return;

  btn.addEventListener('click', () => {
    const isHidden = target.style.display === '' || target.style.display === 'none';
    target.style.display = isHidden ? 'block' : 'none';
    btn.textContent = isHidden ? 'Show Less' : 'Know More';
  });
});

/* ============ SCROLL REVEAL ============ */
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  // fallback
  reveals.forEach((el) => el.classList.add('visible'));
}

/* ============ KEYBOARD ACCESSIBILITY ============ */
openSidebar?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') openSidebar.click();
});

themeBtn?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') toggleTheme();
});

themeBtnTop?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') toggleTheme();
});

detailThemeBtn?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') toggleTheme();
});
