async function GetRegion() {
    const response = await fetch("/api/regionOfDendropark", {
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

function row(request) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", request['Номер региона']);


    for (const field in request) {
        const idTd = document.createElement("td");
        let date
        typeof request[field] == 'string' ? date = request[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(request[field])
        tr.append(idTd);
    }

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", request['Номер региона']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        console.log(request['Номер региона']);
        editRegion(request['Номер региона']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-tabNum", request['Номер региона']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color: gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            deleteRegion(request['Номер региона']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

async function createRegion() {
   // let triggerMessage = 'Данные добавлены в таблицу "Добавленные должностные лица"'
    const modal = document.querySelector('.decor');
    const inpNum = document.querySelector('#inpNum'),
        inpName = document.querySelector('#inpName'),
        inpLocation = document.querySelector('#inpLocation'),
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
        if (inpNum.value === '' || inpName.value === '' || inpLocation.value === '' || inpInfo.value === '') {
            alert('Не должно быть пустых полей');
        } else {

            e.preventDefault();
            hideModal();
            const response = await fetch("/api/createRegion", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ['Номер региона']: inpNum.value,
                    ['Название региона']: inpName.value,
                    ['Положение на схеме']: inpLocation.value,
                    ['Краткая информация']: inpInfo.value
                })
            });
            if (response.ok === true) {
                const region = await response.json();
                if (region.err) {
                    switch (region.err.number) {
                        case 229:
                            alert('У вас недостаточно прав')
                            break;

                        case 547:
                            alert('Ошибка целостности')
                            break;
                        default:
                            alert(region.err.message)
                            break;
                    }
                } else {
                    document.querySelector("#tbody1").append(row(region.result));
                }
            }
        }
    })
}

async function editRegion(num) {
    const response = await fetch("/api/getRegion/" + num, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let pnum, name, location, info;
    console.log(response);
    if (response.ok === true) {
        const getRegion = await response.json();
        pnum = getRegion['Номер региона'];
        name = getRegion['Название региона'];
        location = getRegion['Положение на схеме'];
        info = getRegion['Краткая информация'];
    }

    const editResponse = await fetch("/api/editRegion/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Номер региона']: prompt('Введите номер региона', `${pnum}`),
            ['Название региона']: prompt('Введите название региона', `${name}`),
            ['Положение на схеме']: prompt('Введите положение на схеме', `${location}`),
            ['Краткая информация']: prompt('Введите краткую информацию', `${info}`)
        })
    });
    if (editResponse.ok === true) {
        const region = await editResponse.json();
        document.querySelector("tr[data-rowid='" + region['Номер региона'] + "']").replaceWith(row(region));
    }
}

async function deleteRegion(num) {
    const response = await fetch("/api/getRegion/" + num, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        const num = await response.json();
        document.querySelector("tr[data-rowid='" + num + "']").remove();
    }
}

GetRegion()