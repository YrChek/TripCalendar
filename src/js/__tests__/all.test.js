/**
 * @jest-environment jsdom
 */

import moment from 'moment';
import Calendar from '../calendar';
import Events from '../events';

document.body.innerHTML = `
  <div class="selection-menu">
  <div class="preparation">
    <div class="preparation-text">Туда и обратно</div>
    <div class="preparation-checkbox">
      <input class="checkbox" type="checkbox" id="switch">
      <label for="switch" class="switch-box">
        <span class="switch-toggle"></span>
      </label>
    </div>
  </div>
  <div class="container-forms">
    <form>
      <div class="way-there">
        <div class="way-there-text">Дата туда</div>
        <div class="way-there-form">
          <input type="text" class="way-there-input">
        </div>
        <div class="way-there-error error"></div>
      </div>
      <div class="way-back" style="display: none;">
        <div class="way-back-text">Дата обратно</div>
        <div class="way-back-form">
          <input type="text" class="way-back-input">
        </div>
        <div class="way-back-error error"></div>
      </div>
      <div class="search">
        <button class="search-btn">Найти билеты</button>
      </div>
    </form>
  </div>  
  </div>
`;
const parentEl = document.querySelector('.container-forms');
const calendar = new Calendar(parentEl);
const events = new Events(calendar);

test('Тест на отображение поля ввода даты обратно', () => {
  events.switch.click();
  const divBack = events.wayBack;
  const result = divBack.style.display;
  events.switch.click();
  expect(result).toBe('');
});

test('Тест на ввод даты в поле ввода даты туда', () => {
  calendar.setDate = moment('20230318');
  events.formThere.click();
  const dateAll = document.querySelectorAll('.date');
  const date = dateAll[10];
  date.click();
  const form = document.querySelector('.way-there-input');
  const result = form.value;
  form.value = '';
  expect(result).toBe('09.03.2023');
});

test('Тест на ввод даты в поле ввода даты обратно', () => {
  events.switch.click();
  calendar.setDate = moment('20230318');
  events.formBack.click();
  const dateAll = document.querySelectorAll('.date');
  const date = dateAll[10];
  date.click();
  const form = document.querySelector('.way-back-input');
  const result = form.value;
  form.value = '';
  events.switch.click();
  expect(result).toBe('09.03.2023');
});

test('Тест вывода ошибки при нажатия кнопки с введенным невалидным значением в поле туда', () => {
  calendar.setDate = moment();
  events.formThere.click();
  const dateAll = document.querySelectorAll('.date');
  const date = dateAll[10];
  date.click();
  events.button.click();
  const divError = document.querySelector('.way-there-error');
  const result = divError.textContent;
  expect(result).not.toBe('');
});

test('Тест на закрытие сообщения ошибки, при ручном вводе в форму ввода', () => {
  events.manualInput();
  const divError = document.querySelector('.way-there-error');
  const result = divError.textContent;
  expect(result).toBe('');
});

test('Тест на закрытие календаря, при ручном вводе в форму ввода', () => {
  events.formThere.click();
  events.manualInput();
  const result = document.querySelector('.calendar');
  expect(result).toBeFalsy();
});

test('Тест на отсутствие двойного открытие календаря', () => {
  events.formThere.click();
  events.formThere.click();
  const result = document.querySelectorAll('.calendar').length;
  events.manualInput();
  expect(result).toBe(1);
});

test('Тест вывода ошибки при нажатия кнопки с введенным невалидным значением в поле обратно', () => {
  calendar.setDate = moment('20300308');
  events.switch.click();
  events.formThere.click();
  const dateThereAll = document.querySelectorAll('.date');
  const dateThere = dateThereAll[12];
  dateThere.click();
  events.formBack.click();
  const dateBackAll = document.querySelectorAll('.date');
  const dateBack = dateBackAll[11];
  dateBack.click();
  events.button.click();
  const divError = document.querySelector('.way-back-error');
  const result = divError.textContent;
  divError.textContent = '';
  events.switch.click();
  expect(result).not.toBe('');
});

test('Тест нажатия кнопки при вводе валидного значения в поле туда', () => {
  calendar.setDate = moment('20300308');
  events.formThere.click();
  const dateAll = document.querySelectorAll('.date');
  const date = dateAll[10];
  date.click();
  events.button.click();
  const result = document.querySelector('.bingo');
  expect(result).toBeTruthy();
});

test('Закрытие всплывающего окна. Ожидание 2,5 секунды', async () => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 2500));
  const result = document.querySelector('.bingo');
  expect(result).toBeFalsy();
});

test('Тест валидных значений в полях туда и обратно', () => {
  events.switch.click();
  calendar.setDate = moment('20300308');
  events.formThere.click();
  const dateThereAll = document.querySelectorAll('.date');
  const dateThere = dateThereAll[10];
  dateThere.click();
  events.formBack.click();
  const dateBackAll = document.querySelectorAll('.date');
  const dateBack = dateBackAll[11];
  dateBack.click();
  events.button.click();
  const result = document.querySelector('.bingo');
  events.switch.click();
  expect(result).toBeTruthy();
});
