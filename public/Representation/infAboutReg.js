import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Название региона</th><th>Краткая информация</th></tr>';
getRequest('infAboutReg', header);