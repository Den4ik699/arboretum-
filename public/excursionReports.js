async function GetWriteOffCertificate() {
    const response = await fetch("/api/excursionReports", {
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

async function createExcursionReport() {
    const modal = document.querySelector('.decor');
    const inpNum = document.querySelector('#inpNum'),
        inpInf = document.querySelector('#inpInf'),
        inpNameExcurs = document.querySelector('#inpNameExcurs'),
        inpDateSpend = document.querySelector('#inpDateSpend'),
        inpTabNum = document.querySelector('#inpTabNum'),

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
        const response = await fetch("/api/createExcursionReports", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['Порядковый номер экскурсии']: inpNum.value,
                ['Информация о посетителях']: inpInf.value,
                ['Название экскурсии']: inpNameExcurs.value,
                ['Дата проведения']: inpDateSpend.value,
                ['Табельный номер']: inpTabNum.value
            })
        });
        if (response.ok === true) {
            const resp = await response.json();
            if (resp.err) {
                switch (resp.err.number) {
                    case 229:
                        alert('У вас недостаточно прав')
                        break;

                    case 547:
                        alert('Ошибка целостности')
                        break;
                    default:
                        alert(resp.err.message)
                        break;
                }
            }
            else if (resp.infoMessage) {
                    alert(resp.infoMessage.message);
            }
            else {
                document.querySelector("#tbody1").append(row(resp));
            }
        }
    })
}

async function editReport(id) {
    const response = await fetch("/api/getExcursionReports/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let numEx, info, nameEx, datespend, tabnum;
    if (response.ok === true) {
        const getReport = await response.json();
        numEx = getReport['Порядковый номер экскурсии'];
        info = getReport['Информация о посетителях'];
        nameEx = getReport['Название экскурсии'];
        datespend = getReport['Дата проведения'];
        tabnum = getReport['Табельный номер'];

    }

    const editResponse = await fetch("/api/editExcursionReports/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Порядковый номер экскурсии']: numEx,
            ['Информация о посетителях']: prompt('Введите Информацию о посетителях', `${info}`),
            ['Название экскурсии']: prompt('Введите Название экскурсии', `${nameEx}`),
            ['Дата проведения']: prompt('Введите Дату проведения', `${datespend}`),
            ['Табельный номер']: prompt('Введите Табельный номер', `${tabnum}`)
})
    });
    if (editResponse.ok === true) {
        const report = await editResponse.json();
        document.querySelector("tr[data-rowid='" + report['Порядковый номер экскурсии'] + "']").replaceWith(row(report));
    }
}

async function deleteReport(id) {
    const response = await fetch("/api/getExcursionReport/" + id, {
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
        editReport(request['Порядковый номер экскурсии']);
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
            deleteReport(request['Порядковый номер экскурсии']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetWriteOffCertificate()