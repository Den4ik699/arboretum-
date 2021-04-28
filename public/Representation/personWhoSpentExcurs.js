import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>ФИО</th><th>Наименование экскурсии</th></tr>';
getRequest('personWhoSpentExcurs', header);