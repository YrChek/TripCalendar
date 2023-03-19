import { validThere, validBack } from './validator';
import Calendar from './calendar';

export default class Events {
  constructor(calendar) {
    this.switch = document.querySelector('.checkbox');//
    this.formThere = document.querySelector('.way-there-input');//
    this.formBack = document.querySelector('.way-back-input');//
    this.waitingDate = document.querySelector('.container-forms');
    this.wayBack = document.querySelector('.way-back');
    this.error = document.querySelectorAll('.error');
    this.button = document.querySelector('.search-btn');
    this.thereError = document.querySelector('.way-there-error');
    this.backError = document.querySelector('.way-back-error');
    this.calendar = calendar;
    this.calendarDisplayControl = false;
    this.selectedDate = '';
    this.selectedInputForm = '';
    this.buttonActions = this.buttonActions.bind(this);
    this.bingo = this.bingo.bind(this);
    this.clickForms = this.clickForms.bind(this);
    this.clickCalendar = this.clickCalendar.bind(this);
    this.manualInput = this.manualInput.bind(this);
    this.switchDisplayFormBack = this.switchDisplayFormBack.bind(this);
    this.removeBingo = this.removeBingo.bind(this);

    this.button.addEventListener('click', this.buttonActions);
    this.switch.addEventListener('click', this.switchDisplayFormBack);
    this.formThere.addEventListener('click', this.clickForms);
    this.formBack.addEventListener('click', this.clickForms);
    this.formThere.addEventListener('input', this.manualInput);
    this.formBack.addEventListener('input', this.manualInput);
    this.waitingDate.addEventListener('click', this.clickCalendar);
  }

  buttonActions(e) {
    e.preventDefault();
    const validDateThere = validThere(this.formThere.value);
    if (validDateThere) {
      this.thereError.textContent = validDateThere;
      return false;
    }
    if (this.switch.checked) {
      const validDateBack = validBack(this.formThere.value, this.formBack.value);
      if (validDateBack) {
        this.backError.textContent = validDateBack;
        return false;
      }
      this.bingo();
      return true;
    }
    this.bingo();
    return true;
  }

  bingo() {
    this.popup = document.createElement('div');
    this.popup.classList.add('bingo');
    this.popup.textContent = 'Идет поиск билетов... Наверное!';
    const parent = document.querySelector('.selection-menu');
    this.formThere.value = '';
    this.formBack.value = '';
    parent.append(this.popup);
    this.removeBingo();
  }

  removeBingo() {
    setTimeout(() => {
      this.popup.remove();
      return true;
    }, 2000);
  }

  clickForms(e) {
    const elForm = e.target;
    const div = elForm.closest('div');
    this.calendar.parentEl = div;
    if (!this.calendarDisplayControl) {
      this.error.forEach((el) => el.textContent = '');
      this.calendar.calendarWidget();
      this.calendarDisplayControl = true;
      this.selectedInputForm = elForm;
    }
  }

  clickCalendar(e) {
    const elDate = e.target;
    if (elDate.classList.contains('number')) {
      this.selectedDate = elDate.getAttribute('date');
      Events.fillingInputForm(this.selectedInputForm, this.selectedDate);
      this.calendar.delCalendarWidget();
      this.calendarDisplayControl = false;
    }
  }

  manualInput() {
    if (this.calendarDisplayControl) {
      this.calendar.delCalendarWidget();
      this.calendarDisplayControl = false;
    }
    this.error.forEach((el) => el.textContent = '');
  }

  switchDisplayFormBack() {
    if (!this.switch.checked) {
      this.wayBack.style.display = 'none';
    } else {
      this.wayBack.style.display = '';
    }
  }

  static fillingInputForm(form, date) {
    const stylizedDate = date.replace(/(\d{4})(\d{2})(\d{2})/i, '$3.$2.$1');
    form.value = stylizedDate;
  }
}
