import {getRequest} from '../Representation/templateForRepresentations.js';

const header = '<th>Общее количество удаленных растений</th></tr>';
getRequest('cursCountOfDeletedUsers', header);