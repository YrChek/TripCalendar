import moment from 'moment';

export function validThere(date) {
  const currentDate = moment().format('YYYYMMDD');
  if (!date) return 'Укажите дату';
  if (/[^. \d]/.test(date)) return 'В качестве разделителя используйте точку или пробел. Месяц должен быть числом.';
  let newDate = date.replace(/\./g, '');
  newDate = newDate.replace(/\s/g, '');
  if (newDate.length < 8) return 'Короткая дата. Проверьте, что день и месяц имеют по две цифры, а год четыре цифры.';
  if (newDate.length > 8) return 'Имеются лишние цифры. Проверьте правильность ввода.';
  if (!moment(newDate, 'DDMMYYYY').isValid()) return 'Используйте запись в формате "День Месяц Год"';
  newDate = newDate.replace(/(\d{2})(\d{2})(\d{4})/i, '$3$2$1');
  if (Number(newDate) < Number(currentDate)) return 'Этот поезд уже ушел! Дата не может быть ранее сегодняшней.';
  return false;
}

export function validBack(dateThere, dateBack) {
  if (!dateBack) return 'Укажите дату';
  if (/[^. \d]/.test(dateBack)) return 'В качестве разделителя используйте точку или пробел. Месяц должен быть числом.';
  let newDateBack = dateBack.replace(/\./g, '');
  newDateBack = newDateBack.replace(/\s/g, '');
  if (newDateBack.length < 8) return 'Короткая дата. Проверьте, что день и месяц имеют по две цифры, а год четыре цифры.';
  if (newDateBack.length > 8) return 'Имеются лишние цифры. Проверьте правильность ввода.';
  if (!moment(newDateBack, 'DDMMYYYY').isValid()) return 'Используйте запись в формате "День Месяц Год"';
  newDateBack = newDateBack.replace(/(\d{2})(\d{2})(\d{4})/i, '$3$2$1');
  let newDateThere = dateThere.replace(/\./g, '');
  newDateThere = newDateThere.replace(/\./g, '');
  newDateThere = newDateThere.replace(/(\d{2})(\d{2})(\d{4})/i, '$3$2$1');
  if (Number(newDateBack) < Number(newDateThere)) return 'Вы не можете приехать раньше, чем уехали.';
  return false;
}
