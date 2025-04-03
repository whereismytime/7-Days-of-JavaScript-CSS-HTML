// 🎯 Element selection | Отримання елементів
const progressBar = document.getElementById('progress-bar');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

// 🧠 Update offset values on resize | Оновлення відступів при зміні розміру
function updateHeaderOffset() {
  const headerHeight = header.offsetHeight;

  document.body.style.paddingTop = headerHeight + 'px';
  sections.forEach(section => {
    section.style.scrollMarginTop = headerHeight + 'px';
  });
}

// 💡 Highlight active nav link | Підсвітка активного посилання
function updateActiveNav() {
  const currentScroll = window.scrollY;
  let currentSectionId = null;

  sections.forEach(section => {
    if (currentScroll >= section.offsetTop - header.offsetHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
  });
}

// 📏 Update scroll progress bar | Оновлення прогрес-бара прокрутки
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
}

// 🚀 Master scroll handler | Головний обробник події scroll
function handleScroll() {
  updateProgressBar();
  updateActiveNav();
}

// 🔁 Init | Ініціалізація
updateHeaderOffset();
updateActiveNav();
updateProgressBar();

// 🧷 Listeners | Обробники
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', updateHeaderOffset);
