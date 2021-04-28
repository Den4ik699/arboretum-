import {getRequest, row} from './template.js';

const header = '<th>Администратиавная должность</th><th>Количество</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'countOfOfficials', 'rank', header);