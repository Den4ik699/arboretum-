import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>ФИО</th><th>Должность</th><th>Цель использования материалов дендропарка</th></tr>';
getRequest('goalOb', header);