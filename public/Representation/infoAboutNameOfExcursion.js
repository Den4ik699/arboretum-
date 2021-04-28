import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Название экскурсии</th><th>Информация о посетителях</th><th>Дата проведения</th></tr>';
getRequest('infoAboutNameOfExcursion', header);