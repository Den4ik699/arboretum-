import {getRequest, row} from './templateForRepresentations.js';

const header = '<th>Название растения</th><th>Причина замены</th></tr>';
getRequest('infoAboutReplace', header);