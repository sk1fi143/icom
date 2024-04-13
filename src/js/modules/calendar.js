import AirDatepicker from 'air-datepicker';
/** Скрипт для календаря, подключается в балансе, выплатах и рефералах */
const calendar = () => {
  $(() => {
    function formatDate(date) {
      const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    }
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);

    const datePicker = new AirDatepicker('#dateRangePicker', {
      range: true,
      multipleDatesSeparator: ' - ',
      autoClose: true,
      maxDate,
      onSelect() {
        updateTextFromInput();
        currentRange = 'custom';
      },
    });

    document.getElementById('header-menu-active-visible1').style.margin = '0px';
    function setYellowText() {
      const allRangeButtons = document.querySelectorAll('[data-range]');
      allRangeButtons.forEach((button) => {
        button.classList.remove('active');
      });
    }
    $('.chart-search-date').on('click', () => {
      $('.hidden-date').removeClass('hide');
    });
    $('[data-range]').on('click', function dataRange() {
      datePicker.clear();
      const range = $(this).data('range');
      const currentDate = new Date();
      let startDate;
      let endDate;
      const weekStart = currentDate.getDate() - currentDate.getDay();
      switch (range) {
        case 'week':
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            weekStart + 1,
          );
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            weekStart + 7,
          );
          $('#ico-back-btn').removeClass('opacity-kal-btn');
          datePicker.selectDate([startDate, currentDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'month':
          $('#ico-back-btn').removeClass('opacity-kal-btn');
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          if (endDate > currentDate) {
            endDate = currentDate;
          }
          datePicker.selectDate([startDate, endDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'year':
          $('#ico-back-btn').removeClass('opacity-kal-btn');
          startDate = new Date(currentDate.getFullYear(), 0, 1);
          endDate = new Date(currentDate.getFullYear(), 11, 31);
          if (endDate > currentDate) {
            endDate = currentDate;
          }
          datePicker.selectDate([startDate, endDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'custom':
          $('#ico-back-btn').removeClass('opacity-kal-btn');
          setYellowText(this);
          updateText(range);
          break;
        case 'all':
          $('#ico-back-btn').addClass('opacity-kal-btn');
          $('#ico-next-btn').addClass('opacity-kal-btn');
          document.getElementById('kal_1').style.width = '270px';
          datePicker.clear();
          updateText(range); // Добавьте вызов updateText здесь.
          break;
        default:
          break;
      }

      document.querySelector('.hidden-date').style.display = 'none';
      document.getElementById('kal_1').style.width = '300px';
      currentRange = range;
    });

    function getSelectedRange() {
      const selectedRangeButton = document.querySelector('[data-range].active');
      const hasCustomRange = datePicker.range;

      if (hasCustomRange) {
        return currentRange; // Используйте текущий выбранный диапазон вместо 'custom'
      }
      return selectedRangeButton ? selectedRangeButton.dataset.range : 'month';
    }

    function isFutureRange(endDate) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return endDate > now;
    }

    function updateTextFromInput() {
      const { selectedDates } = datePicker;
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        let displayedStartYear; let
          displayedEndYear;

        if (startDate.getFullYear() !== endDate.getFullYear()) {
          displayedStartYear = ` ${startDate.getFullYear()}`;
          displayedEndYear = ` ${endDate.getFullYear()}`;
        } else {
          displayedStartYear = '';
          displayedEndYear = startDate.getFullYear() !== new Date().getFullYear() ? ` ${endDate.getFullYear()}` : '';
        }

        $('#kal-text').html(`с ${formattedStartDate}${displayedStartYear} по ${formattedEndDate}${displayedEndYear}`);
        document.querySelector('.hidden-date').style.display = 'none';
      }
    }

    function getNextRange(startDate, endDate, range) {
      const nextStartDate = new Date(startDate);
      const nextEndDate = new Date(endDate);

      if (range === 'week') {
        nextStartDate.setDate(startDate.getDate() + 7);
        nextEndDate.setDate(endDate.getDate() + 7);
      }
      if (range === 'month') {
        nextStartDate.setMonth(startDate.getMonth() + 1);
        nextStartDate.setDate(1);
        nextEndDate.setMonth(endDate.getMonth() + 2, 0);
      }
      if (range === 'year') {
        nextStartDate.setFullYear(startDate.getFullYear() + 1);
        nextEndDate.setFullYear(endDate.getFullYear() + 1);
        nextEndDate.setMonth(11);
        nextEndDate.setDate(31);
      }
      if (range === 'custom') {
        const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        nextStartDate.setDate(startDate.getDate() + dayDifference + 1);
        nextEndDate.setDate(endDate.getDate() + dayDifference + 1);
      }

      return { nextStartDate, nextEndDate };
    }

    function getPreviousRange(startDate, endDate, range) {
      const prevStartDate = new Date(startDate);
      let prevEndDate = new Date(endDate);

      if (range === 'week') {
        prevStartDate.setDate(startDate.getDate() - 7);
        prevEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1);
      }
      if (range === 'month') {
        prevStartDate.setMonth(startDate.getMonth() - 1);
        prevEndDate = new Date(prevStartDate.getFullYear(), prevStartDate.getMonth() + 1, 0);
      }
      if (range === 'year') {
        prevStartDate.setFullYear(startDate.getFullYear() - 1);
        prevEndDate.setFullYear(endDate.getFullYear() - 1);
        prevEndDate.setMonth(11);
        prevEndDate.setDate(31);
      }
      if (range === 'custom') {
        const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        prevStartDate.setDate(startDate.getDate() - dayDifference - 1);
        prevEndDate.setDate(endDate.getDate() - dayDifference - 1);
      }

      return { prevStartDate, prevEndDate };
    }
    $('#ico-next-btn').addClass('opacity-kal-btn');
    $('#ico-back-btn').addClass('opacity-kal-btn');

    $('#ico-back-btn').on('click', () => {
      const { selectedDates } = datePicker;
      const selectedRange = getSelectedRange();
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        $('#ico-next-btn').removeClass('opacity-kal-btn');
        if (selectedRange === 'year') {
          startDate.setFullYear(startDate.getFullYear() - 1);
          endDate.setFullYear(endDate.getFullYear() - 1);
        } else {
          let prevStartDate; let
            prevEndDate;
          ({ prevStartDate, prevEndDate } = getPreviousRange(startDate, endDate, selectedRange));
          datePicker.selectDate([prevStartDate, prevEndDate]);
        }

        updateText(selectedRange);

        $('#ico-next-btn').removeClass('opacity-kal-btn');
        $('#ico-next-btn').prop('disabled', false);
      }
    });

    $('#ico-next-btn').on('click', () => {
      const { selectedDates } = datePicker;
      const selectedRange = getSelectedRange();
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];

        let nextStartDate; let
          nextEndDate;
        ({ nextStartDate, nextEndDate } = getNextRange(startDate, endDate, selectedRange));

        if (isFutureRange(nextStartDate, nextEndDate)) {
          if (selectedRange === 'year' || selectedRange === 'month' || selectedRange === 'week' || selectedRange !== 'custom') {
            const currentDate = new Date();
            if (selectedRange === 'year') {
              nextStartDate.setFullYear(currentDate.getFullYear() + 0, 0, 1);
              nextEndDate = currentDate;
            } else {
              nextStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

              if (selectedRange === 'month') {
                nextEndDate = currentDate;
              } else if (selectedRange === 'week') {
                nextStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
                nextEndDate = currentDate;
              } else {
                nextEndDate = currentDate;
              }
            }
          } else {
            $('#ico-next-btn').addClass('opacity-kal-btn');
            return;
          }
        }

        datePicker.selectDate([nextStartDate, nextEndDate]);
        updateText(selectedRange);

        if (isFutureRange(nextStartDate, nextEndDate) || nextEndDate > maxDate) {
          $('#ico-next-btn').addClass('opacity-kal-btn');
        } else {
          $('#ico-next-btn').removeClass('opacity-kal-btn');
        }
      }
    });
  });

  $(() => {
    function formatDate(date) {
      const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    }
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    const datePicker = new AirDatepicker('#dateRangePicker2', {
      range: true,
      multipleDatesSeparator: ' - ',
      maxDate,
      autoClose: true,
      onSelect() {
        updateTextFromInput();
        currentRange = 'custom'; // Задайте currentRange как 'custom', когда пользователь выбирает собственный диапазон
      },
    });

    let lastSelected;
    function setYellowText(element) {
      const allRangeButtons = document.querySelectorAll('[data-range2]');
      allRangeButtons.forEach((button) => {
        button.classList.remove('active');
      });

      if (lastSelected) {
        lastSelected.classList.remove('yellow-text');
      }

      element.classList.add('yellow-text');
      element.classList.add('active');
      lastSelected = element;
    }
    $('.chart-search-date1').on('click', () => {
      $('.hidden-date-chart').removeClass('hide');
    });
    $('[data-range2]').on('click', function () {
      datePicker.clear();
      const range = $(this).data('range2');
      const currentDate = new Date();
      let startDate;
      let endDate;
      switch (range) {
        case 'week':
          const weekStart = currentDate.getDate() - currentDate.getDay();
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            weekStart + 1,
          );
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            weekStart + 7,
          );
          $('#ico-back-btn2').removeClass('opacity-kal-btn');
          datePicker.selectDate([startDate, currentDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'month':
          $('#ico-back-btn2').removeClass('opacity-kal-btn');
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          if (endDate > currentDate) {
            endDate = currentDate;
          }
          datePicker.selectDate([startDate, endDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'year':
          $('#ico-back-btn2').removeClass('opacity-kal-btn');
          startDate = new Date(currentDate.getFullYear(), 0, 1);
          endDate = new Date(currentDate.getFullYear(), 11, 31);
          if (endDate > currentDate) {
            endDate = currentDate;
          }
          datePicker.selectDate([startDate, endDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'custom':
          $('#ico-back-btn2').removeClass('opacity-kal-btn');
          setYellowText(this);
          updateText(range);
          break;
        case 'all':
          $('#ico-back-btn2').addClass('opacity-kal-btn');
          $('#ico-next-btn2').addClass('opacity-kal-btn');
          datePicker.clear();
          updateText(range); // Добавьте вызов updateText здесь.
          break;
        default:
          break;
      }
      document.querySelector('.hidden-date-chart').style.display = 'none';
      document.getElementById('kal_2').style.width = '300px';
      currentRange = range;
    });

    function getSelectedRange() {
      const selectedRangeButton = document.querySelector('[data-range2].active');
      const hasCustomRange = datePicker.range2;

      if (hasCustomRange) {
        return currentRange; // Используйте текущий выбранный диапазон вместо 'custom'
      }
      return selectedRangeButton ? selectedRangeButton.dataset.range2 : 'month';
    }

    function isFutureRange(startDate, endDate) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return endDate > now;
    }
    function updateText(range) {
      const { selectedDates } = datePicker;
      if (selectedDates.length === 2) {
        startDate = selectedDates[0];
        endDate = selectedDates[1];
      }

      if (range === 'week') {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const displayedYear = startDate.getFullYear() !== new Date().getFullYear() ? ` ${startDate.getFullYear()}` : ''; // Добавьте год, если выбранный год не равен текущему
        $('#kal-text2').html(`с ${formattedStartDate} по ${formattedEndDate}${displayedYear}`);
        return;
      }

      if (range === 'year') {
        const year = startDate.getFullYear();
        $('#kal-text2').html(year);
        return;
      }

      if (range === 'month') {
        const monthStart = 1;
        const monthEnd = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate();
        const month = formatDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1));
        const displayedYear = startDate.getFullYear() !== new Date().getFullYear() ? ` ${startDate.getFullYear()}` : ''; // Добавьте год, если выбранный год не равен текущему
        $('#kal-text2').html(`${monthStart}-${monthEnd} ${month}${displayedYear}`);
        return;
      }
      if (range === 'all') {
        $('#kal-text2').html('За всё время');
        document.querySelector('.hidden-date-chart').style.display = 'none';
        setYellowText(this);
        document.getElementById('kal_2').style.width = '270px';
        $('.ico-next-btn2').addClass('.opacity-kal-btn');
      }
      if (range === 'custom') {
        const { selectedDates } = datePicker;
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        $('#kal-text2').html(`с ${formattedStartDate} по ${formattedEndDate}`);
        document.querySelector('.hidden-date-chart').style.display = 'none';
      }
    }

    function updateTextFromInput() {
      const { selectedDates } = datePicker;
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        let displayedStartYear; let
          displayedEndYear;

        if (startDate.getFullYear() !== endDate.getFullYear()) {
          displayedStartYear = ` ${startDate.getFullYear()}`;
          displayedEndYear = ` ${endDate.getFullYear()}`;
        } else {
          displayedStartYear = '';
          displayedEndYear = startDate.getFullYear() !== new Date().getFullYear() ? ` ${endDate.getFullYear()}` : '';
        }

        $('#kal-text2').html(`с ${formattedStartDate}${displayedStartYear} по ${formattedEndDate}${displayedEndYear}`);
        document.querySelector('.hidden-date-chart').style.display = 'none';
      }
    }
    function getNextRange(startDate, endDate, range) {
      const nextStartDate = new Date(startDate);
      const nextEndDate = new Date(endDate);

      if (range === 'week') {
        nextStartDate.setDate(startDate.getDate() + 7);
        nextEndDate.setDate(endDate.getDate() + 7);
      }
      if (range === 'month') {
        nextStartDate.setMonth(startDate.getMonth() + 1);
        nextStartDate.setDate(1);
        nextEndDate.setMonth(endDate.getMonth() + 2, 0);
      }
      if (range === 'year') {
        nextStartDate.setFullYear(startDate.getFullYear() + 1);
        nextEndDate.setFullYear(endDate.getFullYear() + 1);
        nextEndDate.setMonth(11);
        nextEndDate.setDate(31);
      }
      if (range === 'custom') {
        const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        nextStartDate.setDate(startDate.getDate() + dayDifference + 1);
        nextEndDate.setDate(endDate.getDate() + dayDifference + 1);
      }

      return { nextStartDate, nextEndDate };
    }

    function getPreviousRange(startDate, endDate, range) {
      const prevStartDate = new Date(startDate);
      let prevEndDate = new Date(endDate);

      if (range === 'week') {
        prevStartDate.setDate(startDate.getDate() - 7);
        prevEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1);
      }
      if (range === 'month') {
        prevStartDate.setMonth(startDate.getMonth() - 1);
        prevEndDate = new Date(prevStartDate.getFullYear(), prevStartDate.getMonth() + 1, 0);
      }
      if (range === 'year') {
        prevStartDate.setFullYear(startDate.getFullYear() - 1);
        prevEndDate.setFullYear(endDate.getFullYear() - 1);
        prevEndDate.setMonth(11);
        prevEndDate.setDate(31);
      }
      if (range === 'custom') {
        const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        prevStartDate.setDate(startDate.getDate() - dayDifference - 1);
        prevEndDate.setDate(endDate.getDate() - dayDifference - 1);
      }

      return { prevStartDate, prevEndDate };
    }
    $('#ico-next-btn2').addClass('opacity-kal-btn');
    $('#ico-back-btn2').addClass('opacity-kal-btn');

    $('#ico-back-btn2').on('click', () => {
      const { selectedDates } = datePicker;
      const selectedRange = getSelectedRange();
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        $('#ico-next-btn2').removeClass('opacity-kal-btn');
        if (selectedRange === 'year') {
          startDate.setFullYear(startDate.getFullYear() - 1);
          endDate.setFullYear(endDate.getFullYear() - 1);
        } else {
          let prevStartDate; let
            prevEndDate;
          ({ prevStartDate, prevEndDate } = getPreviousRange(startDate, endDate, selectedRange));
          datePicker.selectDate([prevStartDate, prevEndDate]);
        }

        updateText(selectedRange);

        $('#ico-next-btn2').removeClass('opacity-kal-btn');
        $('#ico-next-btn2').prop('disabled', false);
      }
    });

    $('#ico-next-btn2').on('click', () => {
      const { selectedDates } = datePicker;
      const selectedRange = getSelectedRange();
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];

        let nextStartDate; let
          nextEndDate;
        ({ nextStartDate, nextEndDate } = getNextRange(startDate, endDate, selectedRange));

        if (isFutureRange(nextStartDate, nextEndDate)) {
          if (selectedRange === 'year' || selectedRange === 'month' || selectedRange === 'week' || selectedRange !== 'custom') {
            const currentDate = new Date();
            if (selectedRange === 'year') {
              nextStartDate.setFullYear(currentDate.getFullYear() + 0, 0, 1);
              nextEndDate = currentDate;
            } else {
              nextStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

              if (selectedRange === 'month') {
                nextEndDate = currentDate;
              } else if (selectedRange === 'week') {
                nextStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
                nextEndDate = currentDate;
              } else {
                nextEndDate = currentDate;
              }
            }
          } else {
            $('#ico-next-btn2').addClass('opacity-kal-btn');
            return;
          }
        }

        datePicker.selectDate([nextStartDate, nextEndDate]);
        updateText(selectedRange);

        if (isFutureRange(nextStartDate, nextEndDate) || nextEndDate > maxDate) {
          $('#ico-next-btn2').addClass('opacity-kal-btn');
        } else {
          $('#ico-next-btn2').removeClass('opacity-kal-btn');
        }
      }
    });
  });

  $(() => {
    function formatDate(date) {
      const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    }
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    const datePicker = new AirDatepicker('#dateRangePicker3', {
      range: true,
      multipleDatesSeparator: ' - ',
      maxDate,
      autoClose: true,
      onSelect() {
        updateTextFromInput();
        currentRange = 'custom'; // Задайте currentRange как 'custom', когда пользователь выбирает собственный диапазон
      },
    });

    let lastSelected;
    function setYellowText(element) {
      const allRangeButtons = document.querySelectorAll('[data-range3]');
      allRangeButtons.forEach((button) => {
        button.classList.remove('active');
      });

      if (lastSelected) {
        lastSelected.classList.remove('yellow-text');
      }

      element.classList.add('yellow-text');
      element.classList.add('active');
      lastSelected = element;
    }
    $('.details-search-date').on('click', () => {
      $('.hidden-date-search').removeClass('hide');
    });
    $('[data-range3]').on('click', function () {
      datePicker.clear();
      const range = $(this).data('range3');
      const currentDate = new Date();
      let startDate;
      let endDate;
      switch (range) {
        case 'week':
          const weekStart = currentDate.getDate() - currentDate.getDay();
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            weekStart + 1,
          );
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            weekStart + 7,
          );
          $('#ico-back-btn3').removeClass('opacity-kal-btn');
          datePicker.selectDate([startDate, currentDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'month':
          $('#ico-back-btn3').removeClass('opacity-kal-btn');
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          if (endDate > currentDate) {
            endDate = currentDate;
          }
          datePicker.selectDate([startDate, endDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'year':
          $('#ico-back-btn3').removeClass('opacity-kal-btn');
          startDate = new Date(currentDate.getFullYear(), 0, 1);
          endDate = new Date(currentDate.getFullYear(), 11, 31);
          if (endDate > currentDate) {
            endDate = currentDate;
          }
          datePicker.selectDate([startDate, endDate]);
          setYellowText(this);
          updateText(range);
          break;
        case 'custom':
          $('#ico-back-btn3').removeClass('opacity-kal-btn');
          setYellowText(this);
          updateText(range);
          break;
        case 'all':
          $('#ico-back-btn3').addClass('opacity-kal-btn');
          $('#ico-next-btn3').addClass('opacity-kal-btn');
          datePicker.clear();
          updateText(range); // Добавьте вызов updateText здесь.
          break;
        default:
          break;
      }
      document.querySelector('.hidden-date-search').style.display = 'none';
      document.getElementById('kal_3').style.width = '300px';
      currentRange = range;
    });

    function getSelectedRange() {
      const selectedRangeButton = document.querySelector('[data-range3].active');
      const hasCustomRange = datePicker.range3;

      if (hasCustomRange) {
        return currentRange; // Используйте текущий выбранный диапазон вместо 'custom'
      }
      return selectedRangeButton ? selectedRangeButton.dataset.range3 : 'month';
    }

    function isFutureRange(startDate, endDate) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return endDate > now;
    }
    function updateText(range) {
      const { selectedDates } = datePicker;
      if (selectedDates.length === 2) {
        startDate = selectedDates[0];
        endDate = selectedDates[1];
      }

      if (range === 'week') {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const displayedYear = startDate.getFullYear() !== new Date().getFullYear() ? ` ${startDate.getFullYear()}` : ''; // Добавьте год, если выбранный год не равен текущему
        $('#kal-text3').html(`с ${formattedStartDate} по ${formattedEndDate}${displayedYear}`);
        return;
      }

      if (range === 'year') {
        const year = startDate.getFullYear();
        $('#kal-text3').html(year);
        return;
      }

      if (range === 'month') {
        const monthStart = 1;
        const monthEnd = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate();
        const month = formatDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1));
        const displayedYear = startDate.getFullYear() !== new Date().getFullYear() ? ` ${startDate.getFullYear()}` : ''; // Добавьте год, если выбранный год не равен текущему
        $('#kal-text3').html(`${monthStart}-${monthEnd} ${month}${displayedYear}`);
        return;
      }
      if (range === 'all') {
        $('#kal-text3').html('За всё время');
        document.querySelector('.hidden-date-search').style.display = 'none';
        setYellowText(this);
        document.getElementById('kal_3').style.width = '270px';
        $('.ico-next-btn3').addClass('.opacity-kal-btn');
      }
      if (range === 'custom') {
        const { selectedDates } = datePicker;
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        $('#kal-text3').html(`с ${formattedStartDate} по ${formattedEndDate}`);
        document.querySelector('.hidden-date-search').style.display = 'none';
      }
    }

    function updateTextFromInput() {
      const { selectedDates } = datePicker;
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        let displayedStartYear; let
          displayedEndYear;

        if (startDate.getFullYear() !== endDate.getFullYear()) {
          displayedStartYear = ` ${startDate.getFullYear()}`;
          displayedEndYear = ` ${endDate.getFullYear()}`;
        } else {
          displayedStartYear = '';
          displayedEndYear = startDate.getFullYear() !== new Date().getFullYear() ? ` ${endDate.getFullYear()}` : '';
        }

        $('#kal-text3').html(`с ${formattedStartDate}${displayedStartYear} по ${formattedEndDate}${displayedEndYear}`);
        document.querySelector('.hidden-date-search').style.display = 'none';
      }
    }
    function getNextRange(startDate, endDate, range) {
      const nextStartDate = new Date(startDate);
      const nextEndDate = new Date(endDate);

      if (range === 'week') {
        nextStartDate.setDate(startDate.getDate() + 7);
        nextEndDate.setDate(endDate.getDate() + 7);
      }
      if (range === 'month') {
        nextStartDate.setMonth(startDate.getMonth() + 1);
        nextStartDate.setDate(1);
        nextEndDate.setMonth(endDate.getMonth() + 2, 0);
      }
      if (range === 'year') {
        nextStartDate.setFullYear(startDate.getFullYear() + 1);
        nextEndDate.setFullYear(endDate.getFullYear() + 1);
        nextEndDate.setMonth(11);
        nextEndDate.setDate(31);
      }
      if (range === 'custom') {
        const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        nextStartDate.setDate(startDate.getDate() + dayDifference + 1);
        nextEndDate.setDate(endDate.getDate() + dayDifference + 1);
      }

      return { nextStartDate, nextEndDate };
    }

    function getPreviousRange(startDate, endDate, range) {
      const prevStartDate = new Date(startDate);
      let prevEndDate = new Date(endDate);

      if (range === 'week') {
        prevStartDate.setDate(startDate.getDate() - 7);
        prevEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1);
      }
      if (range === 'month') {
        prevStartDate.setMonth(startDate.getMonth() - 1);
        prevEndDate = new Date(prevStartDate.getFullYear(), prevStartDate.getMonth() + 1, 0);
      }
      if (range === 'year') {
        prevStartDate.setFullYear(startDate.getFullYear() - 1);
        prevEndDate.setFullYear(endDate.getFullYear() - 1);
        prevEndDate.setMonth(11);
        prevEndDate.setDate(31);
      }
      if (range === 'custom') {
        const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        prevStartDate.setDate(startDate.getDate() - dayDifference - 1);
        prevEndDate.setDate(endDate.getDate() - dayDifference - 1);
      }

      return { prevStartDate, prevEndDate };
    }
    $('#ico-next-btn3').addClass('opacity-kal-btn');
    $('#ico-back-btn3').addClass('opacity-kal-btn');

    $('#ico-back-btn3').on('click', () => {
      const { selectedDates } = datePicker;
      const selectedRange = getSelectedRange();
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];
        $('#ico-next-btn3').removeClass('opacity-kal-btn');
        if (selectedRange === 'year') {
          startDate.setFullYear(startDate.getFullYear() - 1);
          endDate.setFullYear(endDate.getFullYear() - 1);
        } else {
          let prevStartDate; let
            prevEndDate;
          ({ prevStartDate, prevEndDate } = getPreviousRange(startDate, endDate, selectedRange));
          datePicker.selectDate([prevStartDate, prevEndDate]);
        }

        updateText(selectedRange);

        $('#ico-next-btn3').removeClass('opacity-kal-btn');
        $('#ico-next-btn3').prop('disabled', false);
      }
    });

    $('#ico-next-btn3').on('click', () => {
      const { selectedDates } = datePicker;
      const selectedRange = getSelectedRange();
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];

        let nextStartDate; let
          nextEndDate;
        ({ nextStartDate, nextEndDate } = getNextRange(startDate, endDate, selectedRange));

        if (isFutureRange(nextStartDate, nextEndDate)) {
          if (selectedRange === 'year' || selectedRange === 'month' || selectedRange === 'week' || selectedRange !== 'custom') {
            const currentDate = new Date();
            if (selectedRange === 'year') {
              nextStartDate.setFullYear(currentDate.getFullYear() + 0, 0, 1);
              nextEndDate = currentDate;
            } else {
              nextStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

              if (selectedRange === 'month') {
                nextEndDate = currentDate;
              } else if (selectedRange === 'week') {
                nextStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
                nextEndDate = currentDate;
              } else {
                nextEndDate = currentDate;
              }
            }
          } else {
            $('#ico-next-btn3').addClass('opacity-kal-btn');
            return;
          }
        }

        datePicker.selectDate([nextStartDate, nextEndDate]);
        updateText(selectedRange);

        if (isFutureRange(nextStartDate, nextEndDate) || nextEndDate > maxDate) {
          $('#ico-next-btn3').addClass('opacity-kal-btn');
        } else {
          $('#ico-next-btn3').removeClass('opacity-kal-btn');
        }
      }
    });
  });
};
export default calendar;
