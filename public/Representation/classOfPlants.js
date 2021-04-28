import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Название растения</th><th>Систематическое положение</th><th>Жизненная форма</th></tr>';
getRequest('classOfPlants', header);