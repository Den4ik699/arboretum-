import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Табельный номер</th><th>ФИО</th><th>Административная должность</th><th>Должностные обязанности</th></tr>';
getRequest('fioOfteacher', header);
