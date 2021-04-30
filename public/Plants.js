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
                ['Уникальный номер']: inpUniqNum.value,
                ['Название растения']: inpNamePlant.value,
                ['Систематическое положение']: inpSystLocation.value,
                ['Жизненная форма']: inpLife.value,
                ['Биологическое описание']: inpBioDescr.value,
                ['Экологическое описание']: inpEcoDescr.value,
                ['Дата посадки']: inpDateOfLand.value,
                ['Информация о списании']: inpInfWrOff.value,
                ['Местоположение в дендропарке']: inpLocaton.value,
                ['Применение']: inpUsing.value,
                ['Номер региона']: inpNumOfreg.value
            })
        });
        if (response.ok === true) {
            const user = await response.json();
            document.querySelector("#tbody1").append(row(user));
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
        uniqNum = getPlant['Уникальный номер'];
        namePlant = getPlant['Название растения'];
        systLocation = getPlant['Систематическое положение'];
        life = getPlant['Жизненная форма'];
        bioDescr = getPlant['Биологическое описание'];
        ecoDescr = getPlant['Экологическое описание'];
        dateOfLand = getPlant['Дата посадки'];
        infWrOff = getPlant['Информация о списании'];
        location = getPlant['Местоположение в дендропарке'];
        using = getPlant['Применение'];
        numOfreg = getPlant['Номер региона'];
    }

    const editResponse = await fetch("/api/editPlants/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Уникальный номер']: uniqNum,
            ['Название растения']: prompt('Введите название растения', `${namePlant}`),
            ['Систематическое положение']: prompt('Введите Систематическое положение', `${systLocation}`),
            ['Жизненная форма']: prompt('Введите Жизненную форму', `${life}`),
            ['Биологическое описание']: prompt('Введите Биологическое описание', `${bioDescr}`),
            ['Экологическое описание']: prompt('Введите Экологическое описание', `${ecoDescr}`),
            ['Дата посадки']: prompt('Введите Дату посадки', `${dateOfLand}`),
            ['Информация о списании']: prompt('Введите Информацию о списании', `${infWrOff}`),
            ['Местоположение в дендропарке']: prompt('Введите Местоположение в дендропарке', `${location}`),
            ['Применение']: prompt('Введите Применение', `${using}`),
            ['Номер региона']: prompt('Введите Номер региона', `${numOfreg}`),

        })
    });
    if (editResponse.ok === true) {
        const plants = await editResponse.json();
        document.querySelector("tr[data-rowid='" + plants['Уникальный номер'] + "']").replaceWith(row(plants));
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
    tr.setAttribute("data-rowid", plants['Уникальный номер']);

    for (const field in plants) {
        const idTd = document.createElement("td");
        let date
        typeof plants[field] == 'string' ? date = plants[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(plants[field])
        tr.append(idTd);
    }

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", plants['Уникальный номер']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        editPlant(plants['Уникальный номер']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", plants['Уникальный номер']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();

        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            deletePlant(plants['Уникальный номер']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

GetClientRequest()