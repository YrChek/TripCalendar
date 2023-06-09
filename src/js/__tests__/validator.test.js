import { validThere, validBack } from '../validator';
// import moment from 'moment';

test.each([
  ['20022030', '20022030'],
  ['20 02 2030', '20 02 2030'],
  ['20.02.2030', '20.02.2030'],
  [' 2 0 02 203 0  ', ' 2 0 02 203 0  '],
])('Тест функции validThere на ввод валидного значения: %s', (_, date) => {
  const result = validThere(date);
  expect(result).toBeFalsy();
});

test.each([
  ['20022023/21022023', '20022023', '20022023'],
  ['20 02 2023/21 02 2023', '20 02 2023', '21 02 2023'],
  ['20.02.2023/20.02.2023', '20.02.2023', '20.02.2023'],
  [' 2 0 02 202 3  / 2 1 02 202 3  ', ' 2 0 02 203 0  ', ' 2 1 02 202 3  '],
])('Тест функции validBack на ввод валидных значений: %s', (_, date1, date2) => {
  const result = validBack(date1, date2);
  expect(result).toBeFalsy();
});

test.each([
  ['17032023', '17032023'],
  ['20/02/2030', '20/02/2030'],
  ['без значения', ''],
  ['20 02 30', ' 20 02 30'],
  ['2030 03 20', '2030 03 20'],
  ['20 02 20030', '20 02 20030'],
])('Тест функции validThere на ввод невалидного значения: %s', (_, date) => {
  const result = validThere(date);
  expect(result).toBeTruthy();
});

test.each([
  ['19022023', '19022023'],
  ['без значения', ''],
  ['21/02/2023', '21/02/2023'],
  ['20.03.23', '20.03.23'],
  ['20030 02 20', '20030 02 20'],
  ['2030 02 20', '2030 02 20'],
  ['20.3.2023', '20.3.2023'],
])('Тест функции validBack на ввод невалидного значения: %s', (_, date) => {
  const result = validBack('18032023', date);
  expect(result).toBeTruthy();
});
