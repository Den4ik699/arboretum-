async function GetPlantReplacement() {
    const response = await fetch("/api/plantReplacement", {
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

async function createPlantReplacement() {
    const modal = document.querySelector('.decor');
    const inpNum = document.querySelector('#inpNum'),
        inpUniqNumPlant = document.querySelector('#inpUniqNumPlant'),
        inpPlantReplace = document.querySelector('#inpPlantReplace'),
        inpCauseRepl = document.querySelector('#inpCauseRepl'),
        inpDateReplace = document.querySelector('#inpDateReplace'),
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
        const response = await fetch("/api/createPlantReplacement", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['Порядковый номер учетной карточки']: inpNum.value,
                ['Уникальный номер']: inpUniqNumPlant.value,
                ['Название заменяемого растения']: inpPlantReplace.value,
                ['Причина замены']: inpCauseRepl.value,
                ['Дата замены']: inpDateReplace.value,
                ['Табельный номер']: inpTabNum.value
            })
        });
        if (response.ok === true) {
            const user = await response.json();
            if (user.err) {
                switch (user.err.number) {
                    case 229:
                        alert('У вас недостаточно прав')
                        break;

                    case 547:
                        alert('Ошибка целостности')
                        break;
                    default:
                        alert(user.err.message)
                        break;
                }
            }
            else if (user.infoMessage) {
                alert(user.infoMessage.message);
            }
            else {
                document.querySelector("#tbody1").append(row(user));
            }
        }
    })
}

async function editPlantReplacement(id) {
    const response = await fetch("/api/getPlantReplacement/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let numEx, uniqNum, namePlant, causeOfRepl, dateReplace, tabnum;
    if (response.ok === true) {
        const getPlantReplacement = await response.json();
        numEx = getPlantReplacement['Порядковый номер учетной карточки'];
        uniqNum = getPlantReplacement['Уникальный номер'];
        namePlant = getPlantReplacement['Название заменяемого растения'];
        causeOfRepl = getPlantReplacement['Причина замены'];
        dateReplace = getPlantReplacement['Дата замены'];
        tabnum = getPlantReplacement['Табельный номер'];

    }

    const editResponse = await fetch("/api/editPlantReplacement/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Порядковый номер учетной карточки']: numEx,
            ['Уникальный номер']: uniqNum,
            ['Название заменяемого растения']: prompt('Введите Название заменяемого растения', `${namePlant}`),
            ['Причина замены']: prompt('Введите Причину замены', `${causeOfRepl}`),
            ['Дата замены']: prompt('Введите Дату замены', `${dateReplace}`),
            ['Табельный номер']: prompt('Введите Табельный номер', `${tabnum}`)
        })
    });
    if (editResponse.ok === true) {
        const replace = await editResponse.json();
        document.querySelector("tr[data-rowid='" + replace['Уникальный номер'] + "']").replaceWith(row(replace));
    }
}

async function deletePlantReplacement(id) {
    const response = await fetch("/api/getPlantReplacement/" + id, {
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
    tr.setAttribute("data-rowid", request['Уникальный номер']);


    
    for (const field in request) {
        const idTd = document.createElement("td");
        let date
        typeof request[field] == 'string' ? date = request[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(request[field])
        tr.append(idTd);
    }


    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", request['Уникальный номер']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        editPlantReplacement(request['Уникальный номер']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", request['Уникальный номер']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color: gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            deletePlantReplacement(request['Уникальный номер']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetPlantReplacement()