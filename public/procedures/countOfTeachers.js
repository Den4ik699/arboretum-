import {getRequest, row} from './template.js';

const header = '<th>Табельный номер</th><th>ФИО</th><th>Административная должность</th><th>Должностные обязанности</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'countOfTeachers', 'rank', header);