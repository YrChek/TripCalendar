import moment from 'moment';

moment.locale('ru');

export default class Calendar {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.setDate = moment();
    this.list = [];
    this.listOfDates = this.listOfDates.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.calendarTemplate = this.calendarTemplate.bind(this);
    this.calendarWidget = this.calendarWidget.bind(this);
    this.delCalendarWidget = this.delCalendarWidget.bind(this);
    this.eventsCalendarWidjet = this.eventsCalendarWidjet.bind(this);
  }

  listOfDates() {
    this.month = this.setDate.format('MM');
    this.year = this.setDate.format('YYYY');
    const numberOfDays = this.setDate.daysInMonth(); // количество дней в месяце (число)
    const dayOfTheWeek = moment(`${this.year}${this.month}01`).isoWeekday(); // день недели (число)
    this.list = [];

    for (let i = 1; i <= numberOfDays; i += 1) {
      this.list.push(i);
    }
    for (let i = 1; i < dayOfTheWeek; i += 1) {
      this.list.unshift('');
    }
    const len = this.list.length;
    const count = 42 - len;
    for (let i = 0; i < count; i += 1) {
      this.list.push('');
    }
  }

  previousMonth() {
    this.setDate.subtract(1, 'months');
    this.delCalendarWidget();
    this.calendarWidget();
  }

  nextMonth() {
    this.setDate.add(1, 'months');
    this.delCalendarWidget();
    this.calendarWidget();
  }

  calendarTemplate() {
    return `
    <div class="calendar">
      <div class="month">
        <div class="previous">&lt</div>
        <div class="month-name">${this.setDate.format('MMMM')[0].toUpperCase() + this.setDate.format('MMMM').slice(1)} ${this.setDate.format('YYYY')}</div>
        <div class="next">&gt</div>
      </div>
      <div class="weekday">
        <div class="weekday-item">Пн</div>
        <div class="weekday-item">Вт</div>
        <div class="weekday-item">Ср</div>
        <div class="weekday-item">Чт</div>
        <div class="weekday-item">Пт</div>
        <div class="weekday-item relax">Сб</div>
        <div class="weekday-item relax">Вс</div>
      </div>
      <div class="dates"></div>
    </div>
    `;
  }

  calendarWidget() {
    this.listOfDates();
    const today = moment().format('YYYYMMDD');
    const shortDate = `${this.year}${this.month}`;
    const html = this.calendarTemplate();
    this.parentEl.insertAdjacentHTML('beforeend', html);
    const dates = this.parentEl.querySelector('.dates');
    this.list.forEach((date) => {
      const strDate = `0${date}`;
      const longDate = shortDate + strDate.slice(-2);
      const div = document.createElement('div');
      div.classList.add('date');
      if (date) {
        div.setAttribute('date', longDate);
        div.classList.add('number');
        if (Number(today) === Number(longDate)) {
          div.classList.add('today');
        }
        if (Number(today) > Number(longDate)) {
          div.classList.add('past');
        }
      }
      div.textContent = date;
      dates.append(div);
    });
    this.eventsCalendarWidjet();
  }

  delCalendarWidget() {
    const widget = this.parentEl.querySelector('.calendar');
    widget.remove();
  }

  eventsCalendarWidjet() {
    this.previous = this.parentEl.querySelector('.previous');
    this.next = this.parentEl.querySelector('.next');
    this.previous.addEventListener('click', this.previousMonth);
    this.next.addEventListener('click', this.nextMonth);
  }
}
