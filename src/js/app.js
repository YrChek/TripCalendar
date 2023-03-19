import Calendar from './calendar';
import Events from './events';

document.addEventListener('DOMContentLoaded', () => {
  const parentEl = document.querySelector('.container-forms');
  const calendar = new Calendar(parentEl);
  const events = new Events(calendar);
});
