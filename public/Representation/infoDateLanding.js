import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Название растения</th><th>Дата посадки</th><th>Местоположение в дендропарке</th></tr>';
getRequest('infoDateLanding', header);