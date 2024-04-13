import { smoothScrollToTop, getQueryParams, showTab } from '../../modules/modules.js'; // переход к верху страницы, переключение по страницам
/** popstate на новой заявке */
const newAppPopstate = () => {
  function updateNavigation(activeNavId) {
    document.querySelectorAll('.main-trigger__buttons div').forEach((navItem) => {
      navItem.classList.remove('nav-blue');
      if (!navItem.classList.contains('nav-active') && navItem.getAttribute('data-had-blue') === 'true') {
        navItem.classList.add('nav-active');
      }
    });
    const activeNavItem = document.getElementById(activeNavId);
    activeNavItem.classList.remove('nav-active');
    activeNavItem.classList.add('nav-blue');
    activeNavItem.setAttribute('data-had-blue', 'true');
    // Ниже мы устанавливаем класс nav-active для всех предыдущих навигационных элементов
    const currentStep = parseInt(activeNavItem.id.replace('nav-step', ''), 10);
    for (let i = 1; i < currentStep; i += 1) {
      const previousNavItem = document.getElementById(`nav-step${i}`);
      previousNavItem.classList.remove('nav-blue');
      previousNavItem.classList.add('nav-active');
    }
  }
  function updateNavigationSpan(activeSpanId) {
    document.querySelectorAll('.main-trigger__buttons span').forEach((navSpan) => {
      navSpan.classList.remove('nav-step-text-yellow');
      if (!navSpan.classList.contains('nav-step-text') && navSpan.getAttribute('data-text-yellow') === 'true') {
        navSpan.classList.add('nav-step-text');
      }
    });
    const activeNavSpan = document.getElementById(activeSpanId);
    activeNavSpan.classList.remove('nav-step-text');
    activeNavSpan.classList.add('nav-step-text-yellow');
    activeNavSpan.setAttribute('data-text-yellow', 'true');
  }
  document.addEventListener('DOMContentLoaded', () => {
    [].forEach.call(document.querySelectorAll('.btnAPI'), (button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonNavId = `nav-step${button.getAttribute('data-link').slice(-1)}`;
        if (document.getElementById(buttonNavId).classList.contains('cant-trigger')) {
          return;
        }
        const page = button.getAttribute('data-link');
        showTab(page, '.block');
        updateNavigation(`nav-step${page.slice(-1)}`); // вызываем updateNavigation с кусказанным ID активной кнопки
        updateNavigationSpan(`nav-step-text${page.slice(-1)}`);
        smoothScrollToTop(); // вызываем плавный скролл вверх
        window.history.pushState({ page }, page.toUpperCase(), `?block=${page.slice(-1)}`);
      });
    });
    const initActiveNavId = 'nav-step1';
    const initActiveNav = document.getElementById(initActiveNavId);
    initActiveNav.classList.add('nav-blue');
    initActiveNav.setAttribute('data-had-blue', 'true');
    const initActiveSpanId = 'nav-step-text1';
    const initActiveSpan = document.getElementById(initActiveSpanId);
    initActiveSpan.classList.add('nav-step-text-yellow');
    initActiveSpan.setAttribute('data-text-yellow', 'true');
    const queryParams = getQueryParams();
    const initialBlockNumber = queryParams.block || '1';
    const initialBlock = `block${initialBlockNumber}`;
    const initialNavId = `nav-step${initialBlockNumber}`;
    const initialNavSpanId = `nav-step-text${initialBlockNumber}`;
    // Замените вызовы обновления навигации и вывода таба
    showTab(initialBlock, '.block');
    updateNavigation(initialNavId);
    updateNavigationSpan(initialNavSpanId);
    // Установите начальное значение history
    window.history.replaceState({ page: initialBlock }, initialBlock.toUpperCase(), `?block=${initialBlock.slice(-1)}`);
    // Настройте начальное значение текста навигации для всех предыдущих шагов
    for (let i = 1; i < initialBlockNumber; i += 1) {
      const previousNavSpanId = `nav-step-text${i}`;
      const previousNavSpan = document.getElementById(previousNavSpanId);
      previousNavSpan.classList.add('nav-step-text');
    }
    const initialActiveSpan = document.getElementById(initialNavSpanId);
    initialActiveSpan.classList.remove('nav-step-text');
    initialActiveSpan.classList.add('nav-step-text-yellow');
    initialActiveSpan.setAttribute('data-text-yellow', 'true');
  });
  window.addEventListener('popstate', (e) => {
    const a1 = document.getElementById('img-passport1');
    const a2 = document.getElementById('img-passport2');
    if (e.state && e.state.page && !e.state.imageOpen) {
      showTab(e.state.page, '.block');
      updateNavigation(`nav-step${e.state.page.slice(-1)}`); // вызываем updateNavigation с указанным ID активной кнопки
      updateNavigationSpan(`nav-step-text${e.state.page.slice(-1)}`);
      smoothScrollToTop(); // вызываем плавный скролл вверх
    } else if (e.state.imageOpen) {
      if (a1.style.display === 'block') {
        window.history.replaceState({}, '', window.location.pathname);
      } else if (a2.style.display === 'block') {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  });
};
export default newAppPopstate();
