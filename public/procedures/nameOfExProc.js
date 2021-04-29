import {getRequest, row} from './template.js';

const header = '<th>Название экскурсии</th><th>Информация о посетителях</th><th>Дата проведения</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'nameOfExProc', 'nameOfEx', header);