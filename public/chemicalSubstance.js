async function GetChemicalSubstance() {
    const response = await fetch("/api/chemicalSubstance", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        const requests = await response.json();
        let thead = document.querySelector("#thead1");
        const tr = document.createElement("tr");
        for (const key in requests[0]) {
            tr.append(head(key));
        }
        thead.append(tr)
        let rows = document.querySelector("#tbody1");
        requests.forEach(request => {
            rows.append(row(request));
        });
    }
}

async function createSubstance() {
    const modal = document.querySelector('.decor');
    const inpNum = document.querySelector('#inpNum'),
        inpNameSubst = document.querySelector('#inpNameSubst'),
        inpRecommend = document.querySelector('#inpRecommend'),
        inpInfo = document.querySelector('#inpInfo'),

        inpBtnAdd = document.querySelector('#inpBtnAdd'),
        close = document.querySelector('.close');



    function showModal() {
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    showModal();

    close.addEventListener('click', () => {
        hideModal();
    })

    inpBtnAdd.addEventListener('click', async (e) => {
        if (inpNum.value === '' || inpNameSubst.value === '' || inpRecommend.value === '' || inpInfo.value === '') {
            alert('Не должно быть пустых полей');
        } else {

        e.preventDefault();

        hideModal();
        const response = await fetch("/api/createSubstance", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['Номенклатурный номер']: inpNum.value,
                ['Название вещества']: inpNameSubst.value,
                ['Рекомендации по применению']: inpRecommend.value,
                ['Информация об использовании']: inpInfo.value
            })
        });
        if (response.ok === true) {
            const user = await response.json();
            document.querySelector("#tbody1").append(row(user));
        }
    }
    })
}

async function editSubstance(id) {
    const response = await fetch("/api/getSubstance/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let num, nameSubst, recommend, inf;
    if (response.ok === true) {
        const getSubstance = await response.json();
        num = getSubstance['Номенклатурный номер'];
        nameSubst = getSubstance['Название вещества'];
        recommend = getSubstance['Рекомендации по применению'];
        inf = getSubstance['Информация об использовании'];
    }

    const editResponse = await fetch("/api/editSubstance/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Номенклатурный номер']: num,
            ['Название вещества']: prompt('Введите название вещества', `${nameSubst}`),
            ['Рекомендации по применению']: prompt('Введите Рекомендации по применению', `${recommend}`),
            ['Информация об использовании']: prompt('Введите Информацию об использовании', `${inf}`)
        })
    });
    if (editResponse.ok === true) {
        const substance = await editResponse.json();
        document.querySelector("tr[data-rowid='" + substance['Номенклатурный номер'] + "']").replaceWith(row(substance));
    }
}

async function deleteSubstance(id) {
    const response = await fetch("/api/getSubstance/" + id, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        const id = await response.json();
        document.querySelector("tr[data-rowid='" + id + "']").remove();
    }
}

function head(key){
    const th = document.createElement("th");
    th.append(key)
    return th;
}

function row(request) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", request['Номенклатурный номер']);


    for (const field in request) {
        const idTd = document.createElement("td");
        let date
        typeof request[field] == 'string' ? date = request[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(request[field])
        tr.append(idTd);
    }


    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", request['Номенклатурный номер']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        editSubstance(request['Номенклатурный номер']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", request['Номенклатурный номер']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color: gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            deleteSubstance(request['Номенклатурный номер']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetChemicalSubstance()