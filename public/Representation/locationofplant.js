import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Уникальный номер</th><th>Название растения</th><th>Систематическое положение</th><th>Жизненная форма</th><th>Биологическое описание</th><th>Экологическое описание</th><th>Дата посадки</th><th>Информация о списании</th><th>Местоположение в дендропарке</th><th>Применение</th><th>Номер региона</th></tr>';
getRequest('locationofplant', header);
