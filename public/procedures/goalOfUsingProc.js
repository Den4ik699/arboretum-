import {getRequest, row} from './template.js';

const header = '<th>Цель использования материалов дендропарка</th><th>Количество</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'goalOfUsingProc', 'goalOfUsing', header);