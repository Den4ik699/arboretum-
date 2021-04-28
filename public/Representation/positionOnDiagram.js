import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Наименование экскурсии</th><th>Продолжительность экскурсии</th><th>Название региона</th><th>Положение на схеме</th></tr>';
getRequest('positionOnDiagram', header);