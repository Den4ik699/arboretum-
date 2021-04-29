import {getRequest, row} from './template.js';

const header = '<th>Название растения</th><th>Название вещества</th></tr>'
const submitBtn = document.querySelector('.btn-search')
submitBtn.onclick = getRequest.bind({}, 'infSubstanceProc', 'nameOfSubstance', header);