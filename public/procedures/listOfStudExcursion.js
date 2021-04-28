import {getRequest, row} from './template.js';

const header = '<th>ФИО</th><th>Наименование экскурсии</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'listOfStudExcursion', 'numex', header);