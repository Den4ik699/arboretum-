import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Наименование экскурсии</th><th>Продолжительность экскурсии</th><th>Название региона</th></tr>';
getRequest('excursionInEurope', header);