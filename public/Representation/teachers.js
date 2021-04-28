import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>ФИО</th><th>Административная должность</th><th>Должностные обязанности</th></tr>';
getRequest('showTeacher', header);