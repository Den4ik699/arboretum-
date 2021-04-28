import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Номенклатурный номер</th><th>Название вещества</th><th>Рекомендации по применению</th><th>Информация об использовании</th></tr>';
getRequest('fullInfoAboutSubstances', header);