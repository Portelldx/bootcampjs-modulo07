import { eventListeners } from './ui';
import { nuevaPartida } from './motor';

document.addEventListener('DOMContentLoaded', () => {
  nuevaPartida();
  eventListeners();
});
