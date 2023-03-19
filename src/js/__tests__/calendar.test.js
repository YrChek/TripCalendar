/**
 * @jest-environment jsdom
 */

import moment from 'moment';
import Calendar from '../calendar';

moment.locale('ru');

document.body.innerHTML = '<div class="container-forms">';
const parentEl = document.querySelector('.container-forms');
const calendar = new Calendar(parentEl);

test('Тест на открытый календарь', () => {
  calendar.calendarWidget();
  const result = document.querySelector('.calendar');
  expect(result).toBeTruthy();
});

test('Тест на закрытие календаря', () => {
  calendar.delCalendarWidget();
  const result = document.querySelector('.calendar');
  expect(result).toBeFalsy();
});

test('Тест на совпадение дня недели и первого дня месяца', () => {
  calendar.setDate = moment('20230315');
  calendar.calendarWidget();
  const dates = document.querySelectorAll('.date');
  const date = dates[2].textContent;
  calendar.delCalendarWidget();
  expect(date).toBe('1');
});

test('Тест на отображение месяца и года', () => {
  calendar.setDate = moment('20220115');
  calendar.calendarWidget();
  const month = document.querySelector('.month-name');
  const result = month.textContent;
  calendar.delCalendarWidget();
  expect(result).toBe('Январь 2022');
});

test('Тест переключения на предидущий месяц', () => {
  calendar.setDate = moment('20230115');
  calendar.calendarWidget();
  calendar.previous.click();
  const month = document.querySelector('.month-name');
  const result = month.textContent;
  calendar.delCalendarWidget();
  expect(result).toBe('Декабрь 2022');
});

test('Тест переключения на следующий месяц', () => {
  calendar.setDate = moment('20221215');
  calendar.calendarWidget();
  calendar.next.click();
  const month = document.querySelector('.month-name');
  const result = month.textContent;
  calendar.delCalendarWidget();
  expect(result).toBe('Январь 2023');
});
