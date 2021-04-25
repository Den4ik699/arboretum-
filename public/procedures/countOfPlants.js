import {getRequest, row} from './template.js';

const header = '<th>Жизненная форма</th><th>Название растения</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'countOfPlants', 'life', header);