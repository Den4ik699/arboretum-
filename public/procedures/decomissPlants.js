import {getRequest, row} from './template.js';

const header = '<th>Номер акта</th><th>Наименование списанного объекта</th><th>Количество</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'decomissPlants', 'date', header);