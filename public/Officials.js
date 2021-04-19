async function GetOfficials() {
    const response = await fetch("/api/Officials", {
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

function head(key) {
    const th = document.createElement("th");
    th.append(key)
    return th;
}



async function createOfficial() {
    const modal = document.querySelector('.decor');
    const inpTabNum = document.querySelector('#inpTabNum'),
        inpfio = document.querySelector('#inpfio'),
        inprank = document.querySelector('#inprank'),
        inprespons = document.querySelector('#inprespons'),
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

    inpBtnAdd.addEventListener('click', async () => {

        const response = await fetch("/api/createOfficial", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['Табельный номер']: inpTabNum.value,
                ['ФИО']: inpfio.value,
                ['Административная должность']: inprank.value,
                ['Должностные обязанности']: inprespons.value
            })
        });
        if (response.ok === true) {
            const officials = await response.json();
            document.querySelector("#tbody1").append(row(officials));
        }
    })
}



async function editOfficial(tubnum) {
    const response = await fetch("/api/getOfficial/" + tubnum, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let tabNum, fio, position, respons;
    console.log(response);
    if (response.ok === true) {
        const getOfficial = await response.json();
        tabNum = getOfficial['Табельный номер'];
        fio = getOfficial['ФИО'];
        position = getOfficial['Административная должность'];
        respons = getOfficial['Должностные обязанности'];
    }

    const editResponse = await fetch("/api/editOfficial/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Табельный номер']: prompt('Введите табельный номер', `${tabNum}`),
            ['ФИО']: prompt('Введите ФИО', `${fio}`),
            ['Административная должность']: prompt('Введите должность', `${position}`),
            ['Должностные обязанности']: prompt('Введите Должностные обязанности', `${respons}`)
        })
    });
    if (editResponse.ok === true) {
        const official = await editResponse.json();
        document.querySelector("tr[data-rowid='" + official['Табельный номер'] + "']").replaceWith(row(official));
    }
}





async function deleteOfficial(tabNum) {
    const response = await fetch("/api/officials/" + tabNum, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        const tabNum = await response.json();
        document.querySelector("tr[data-rowid='" + tabNum + "']").remove();
    }
}






function row(request) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", request['Табельный номер']);


    for (const field in request) {
        const idTd = document.createElement("td");
        let date
        typeof request[field] == 'string' ? date = request[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(request[field])
        tr.append(idTd);
    }

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", request['Табельный номер']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        console.log(request['Табельный номер']);
        editOfficial(request['Табельный номер']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-tabNum", request['Табельный номер']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color: gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            deleteOfficial(request['Табельный номер']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetOfficials()