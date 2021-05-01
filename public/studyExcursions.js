async function GetStudyExcursions() {
    const response = await fetch("/api/studyExcursions", {
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

async function createExcursion() {
    const modal = document.querySelector('.decor');
    const inpNameEx = document.querySelector('#inpNameEx'),
        inpDescr = document.querySelector('#inpDescr'),
        inpTabNum = document.querySelector('#inpTabNum'),
        inpDuration = document.querySelector('#inpDuration'),

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
        e.preventDefault();
        hideModal();
        const response = await fetch("/api/createExcursion", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['Наименование экскурсии']: inpNameEx.value,
                ['Краткое содержание экскурсии']: inpDescr.value,
                ['Табельный номер']: inpTabNum.value,
                ['Продолжительность экскурсии']: inpDuration.value
            })
        });
        if (response.ok === true) {
            const user = await response.json();
            document.querySelector("#tbody1").append(row(user));
        }
    })
}

async function editExcursion(id) {
    const response = await fetch("/api/getExcursion/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let Findid, nameEx, descript, tabNum, duration;
    if (response.ok === true) {
        const getExcursion = await response.json();
        Findid = getExcursion['Порядковый номер экскурсии'];
        nameEx = getExcursion['Наименование экскурсии'];
        descript = getExcursion['Краткое содержание экскурсии'];
        tabNum = getExcursion['Табельный номер'];
        duration = getExcursion['Продолжительность экскурсии'];
    }

    const editResponse = await fetch("/api/editExcursion/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Порядковый номер экскурсии']: Findid,
            ['Наименование экскурсии']: prompt('Введите Наименование экскурсии', `${nameEx}`),
            ['Краткое содержание экскурсии']: prompt('Введите Краткое содержание экскурсии', `${descript}`),
            ['Табельный номер']: prompt('Введите Табельный номер', `${tabNum}`),
            ['Продолжительность экскурсии']: prompt('Введите Продолжительность экскурсии', `${duration}`)
        })
    });
    if (editResponse.ok === true) {
        const request = await editResponse.json();
        document.querySelector("tr[data-rowid='" + request['Порядковый номер экскурсии'] + "']").replaceWith(row(request));
    }
}

async function deleteExcursion(id) {
    const response = await fetch("/api/getExcursion/" + id, {
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
    tr.setAttribute("data-rowid", request['Порядковый номер экскурсии']);



    for (const field in request) {
        const idTd = document.createElement("td");
        let date
        typeof request[field] == 'string' ? date = request[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(request[field])
        tr.append(idTd);
    }


    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", request['Порядковый номер экскурсии']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        editExcursion(request['Порядковый номер экскурсии']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", request['Порядковый номер экскурсии']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color: gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            deleteExcursion(request['Порядковый номер экскурсии']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetStudyExcursions()