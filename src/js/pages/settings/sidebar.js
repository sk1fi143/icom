import { smoothScrollToTop, getQueryParams, showTab } from '../../modules/modules.js'; // переход к верху страницы, переключение по блокам
// все функции бокового меню в настройках
const sidebar = () => {
  let currentPage = 1;
  let progress = 0;
  //  функция переключения пунктов сайдбара
  function updateActiveSidebarItem(page) {
    const pageNumber = parseInt(page.slice(-1), 10);
    const navLinks = document.querySelectorAll('.sidebar-item');
    for (let i = 0; i < navLinks.length; i += 1) {
      if (i === pageNumber - 1) {
        navLinks[i].classList.add('activeSett');
      } else {
        navLinks[i].classList.remove('activeSett');
      }
    }
  }
  //  функция обновления позиции маски свг у сайдбара
  function updateMaskPosition() {
    requestAnimationFrame(() => {
      const activeItem = document.querySelector('.sidebar-item.activeSett'); // активный пункт
      const mask = document.querySelector('.mask');
      const yOffset = activeItem.offsetTop; // координата активного пункта
      const itemHeight = activeItem.offsetHeight; // высота активного пункта
      mask.style.transform = `translateY(${yOffset - itemHeight}px)`; // перемещение маски
      setTimeout(() => {
        mask.style.transition = '';
      }, 300);
    });
  }
  updateMaskPosition();
  function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.sidebar-item');
    for (let i = 0; i < pages.length; i += 1) {
      pages[i].style.display = 'none';
    }
    const pageId = `page${pageNumber}`;
    document.getElementById(pageId).style.display = 'flex';
    currentPage = pageNumber;

    const items = document.querySelectorAll('.sidebar-item');
    items.forEach((item, index) => {
      if (index + 1 === pageNumber) {
        item.classList.add('activeSett');
      } else {
        item.classList.remove('activeSett');
      }
    });

    updateActiveSidebarItem(pageId); // активный пункт в зависимости от страницы
    updateMaskPosition(); // обновление позиции маски

    for (let i = 0; i < navLinks.length; i += 1) {
      if (i === pageNumber - 1) {
        navLinks[i].classList.add('activeSett');
      } else {
        navLinks[i].classList.remove('activeSett');
      }
    }
    let firstUnsavedPage = -1;
    for (let i = 0; i < pages.length; i += 1) {
      if (!pages[i].hasAttribute('data-saved')) {
        firstUnsavedPage = i + 1;
        break;
      }
    }
    const pageProgressTextMap = {
      1: ['Заполните основные данные >', 'Заполните основные данные >'],
      2: ['Укажите данные паспорта >', 'Укажите данные руководителя >'],
      3: ['Укажите адрес >', 'Укажите адрес >'],
      4: ['Укажите данные счёта >', 'Укажите данные счёта >'],
      5: ['Укажите контактные данные >', 'Укажите контактные данные >'],
    };

    const progressTexts = pageProgressTextMap[firstUnsavedPage]
          || ['Все страницы заполнены', 'Все страницы заполнены'];

    const textIndex = $('.page-sett-Ul-block').css('display') === 'flex' ? 1 : 0;
    $('.progressSpan-bar-dannie-sett').html(progressTexts[textIndex]);
  }
  // переключение на следующую страницу и изменение текста прогрессбара
  $('.btn-save-sett').on('click', function prog() {
    if (!$(this).hasClass('clicked')) {
      $(this).addClass('clicked');

      const pageId = `page${currentPage}`;
      document.getElementById(pageId).setAttribute('data-saved', 'true');
      progress += 20;

      if (progress > 100) {
        progress = 100;
        $('.progress-barSett').css('width', '100%');
      }

      $('.progress-barSett').css('width', `${progress}%`);
      $('.progressSpan-bar-profSett').html(progress);
      showPage(currentPage + 1);
    }
  });
  // смена текста в сайдбаре в зависимости от Физ лиц и ЮЛ
  if ($('.page-sett-Ul-block').css('display') === 'flex') {
    $('#sidebar-sett-punct2').html('Руководитель');
  } else {
    $('#sidebar-sett-punct2').html('Паспорт');
  }
  // попстейт и переключение по кнопкам браузера
  document.addEventListener('DOMContentLoaded', () => {
    updateMaskPosition();
    [].forEach.call(document.querySelectorAll('.btn-popstate'), (button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const page = button.getAttribute('data-link');
        smoothScrollToTop();
        window.history.pushState({
          page,
        }, page.toUpperCase(), `?page=${page.slice(-1)}`);
      });
    });

    const queryParams = getQueryParams();
    const initialBlockNumber = queryParams.page || '1';

    const totalPages = document.querySelectorAll('.page').length;
    const sanitizedBlockNum = Math.min(totalPages, Math.max(1, parseInt(initialBlockNumber, 10)));

    const initialBlock = `page${sanitizedBlockNum}`;
    window.history.replaceState({
      page: initialBlock,
    }, initialBlock.toUpperCase(), `?page=${initialBlock.slice(-1)}`);

    updateActiveSidebarItem(initialBlock);
    updateMaskPosition(initialBlock);
    showPage(sanitizedBlockNum);
  });
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      showTab(e.state.page, '.page');
      updateActiveSidebarItem(e.state.page);
      updateMaskPosition(e.state.page);
      smoothScrollToTop();
    }
  });
  // поиск первой страницы где не сохранены данные
  function findFirstUnsavedPage() {
    const pages = document.querySelectorAll('.page');
    for (let i = 0; i < pages.length; i += 1) {
      if (!pages[i].hasAttribute('data-saved')) {
        return i + 1;
      }
    }
    return -1;
  }
  // переход к странице где не сохранены данные
  $('.progress-textSett2').on('click', () => {
    const firstUnsavedPage = findFirstUnsavedPage();
    showPage(firstUnsavedPage);
  });

  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showPage(index + 1);
      return false;
    });
  });
};
export default sidebar;
