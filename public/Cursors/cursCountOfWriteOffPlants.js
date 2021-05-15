import {getRequest} from '../Representation/templateForRepresentations.js';

const header = '<th>Общее количетсво списанных растений</th></tr>';
getRequest('cursCountOfWriteOffPlants', header);