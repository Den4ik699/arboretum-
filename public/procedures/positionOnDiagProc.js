import {getRequest, row} from './template.js';

const header = '<th>Наименование экскурсии</th><th>Продолжительность экскурсии</th><th>Название региона</th><th>Положение на схеме</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'positionOnDiagProc', 'location', header);