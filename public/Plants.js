async function GetClientRequest() {
    const response = await fetch("/api/plants", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        const plants = await response.json();
        let thead = document.querySelector("#thead1");
        const tr = document.createElement("tr");
        for (const key in plants[0]) {
            tr.append(head(key));
        }
        thead.append(tr)
        let rows = document.querySelector("#tbody1");
        plants.forEach(employee => {
            rows.append(row(employee));
        });
    }
}

async function createPlant() {
    const modal = document.querySelector('.decor');
    const inpUniqNum = document.querySelector('#inpUniqNum'),
        inpNamePlant = document.querySelector('#inpNamePlant'),
        inpSystLocation = document.querySelector('#inpSystLocation'),
        inpLife = document.querySelector('#inpLife'),
        inpBioDescr = document.querySelector('#inpBioDescr'),
        inpEcoDescr = document.querySelector('#inpEcoDescr'),
        inpDateOfLand = document.querySelector('#inpDateOfLand'),
        inpInfWrOff = document.querySelector('#inpInfWrOff'),
        inpLocaton = document.querySelector('#inpLocaton'),
        inpUsing = document.querySelector('#inpUsing'),
        inpNumOfreg = document.querySelector('#inpNumOfreg'),

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
        const response = await fetch("/api/createPlant", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['???????????????????? ??????????']: inpUniqNum.value,
                ['???????????????? ????????????????']: inpNamePlant.value,
                ['?????????????????????????????? ??????????????????']: inpSystLocation.value,
                ['?????????????????? ??????????']: inpLife.value,
                ['?????????????????????????? ????????????????']: inpBioDescr.value,
                ['?????????????????????????? ????????????????']: inpEcoDescr.value,
                ['???????? ??????????????']: inpDateOfLand.value,
                ['???????????????????? ?? ????????????????']: inpInfWrOff.value,
                ['???????????????????????????? ?? ??????????????????????']: inpLocaton.value,
                ['????????????????????']: inpUsing.value,
                ['?????????? ??????????????']: inpNumOfreg.value
            })
        });
        if (response.ok === true) {
            const user = await response.json();

            if (user.err) {
                switch (user.err.number) {
                    case 229:
                        alert('?? ?????? ???????????????????????? ????????')
                        break;

                    case 547:
                        alert('???????????? ??????????????????????')
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

async function editPlant(id) {
    const response = await fetch("/api/getPlant/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let uniqNum, namePlant, systLocation, life, bioDescr, ecoDescr, dateOfLand, infWrOff, location, using,numOfreg;
    if (response.ok === true) {
        const getPlant = await response.json();
        uniqNum = getPlant['???????????????????? ??????????'];
        namePlant = getPlant['???????????????? ????????????????'];
        systLocation = getPlant['?????????????????????????????? ??????????????????'];
        life = getPlant['?????????????????? ??????????'];
        bioDescr = getPlant['?????????????????????????? ????????????????'];
        ecoDescr = getPlant['?????????????????????????? ????????????????'];
        dateOfLand = getPlant['???????? ??????????????'];
        infWrOff = getPlant['???????????????????? ?? ????????????????'];
        location = getPlant['???????????????????????????? ?? ??????????????????????'];
        using = getPlant['????????????????????'];
        numOfreg = getPlant['?????????? ??????????????'];
    }

    const editResponse = await fetch("/api/editPlants/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['???????????????????? ??????????']: uniqNum,
            ['???????????????? ????????????????']: prompt('?????????????? ???????????????? ????????????????', `${namePlant}`),
            ['?????????????????????????????? ??????????????????']: prompt('?????????????? ?????????????????????????????? ??????????????????', `${systLocation}`),
            ['?????????????????? ??????????']: prompt('?????????????? ?????????????????? ??????????', `${life}`),
            ['?????????????????????????? ????????????????']: prompt('?????????????? ?????????????????????????? ????????????????', `${bioDescr}`),
            ['?????????????????????????? ????????????????']: prompt('?????????????? ?????????????????????????? ????????????????', `${ecoDescr}`),
            ['???????? ??????????????']: prompt('?????????????? ???????? ??????????????', `${dateOfLand}`),
            ['???????????????????? ?? ????????????????']: prompt('?????????????? ???????????????????? ?? ????????????????', `${infWrOff}`),
            ['???????????????????????????? ?? ??????????????????????']: prompt('?????????????? ???????????????????????????? ?? ??????????????????????', `${location}`),
            ['????????????????????']: prompt('?????????????? ????????????????????', `${using}`),
            ['?????????? ??????????????']: prompt('?????????????? ?????????? ??????????????', `${numOfreg}`),

        })
    });
    if (editResponse.ok === true) {
        const plants = await editResponse.json();
        document.querySelector("tr[data-rowid='" + plants['???????????????????? ??????????'] + "']").replaceWith(row(plants));
    }
}

async function deletePlant(id) {
    const response = await fetch("/api/getPlant/" + id, {
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

function head(key) {
    const th = document.createElement("th");
    th.append(key)
    return th;
}

function row(plants) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", plants['???????????????????? ??????????']);

    for (const field in plants) {
        const idTd = document.createElement("td");
        let date
        typeof plants[field] == 'string' ? date = plants[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(plants[field])
        tr.append(idTd);
    }

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", plants['???????????????????? ??????????']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("????????????????");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        editPlant(plants['???????????????????? ??????????']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", plants['???????????????????? ??????????']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    removeLink.append("??????????????");
    removeLink.addEventListener("click", e => {

        e.preventDefault();

        let confDelItem = confirm("???? ??????????????, ?????? ???????????? ?????????????? ?????????????");
        if (confDelItem) {
            deletePlant(plants['???????????????????? ??????????']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

GetClientRequest()