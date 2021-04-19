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

function head(key) {
    const th = document.createElement("th");
    th.append(key)
    return th;
}

function row(plants) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", plants['Уникальный номер']);

 /*    const uniqNum = document.createElement("td");
    uniqNum.append(plants['Уникальный номер']);
    tr.append(uniqNum);

    const nameOfPlant = document.createElement("td");
    nameOfPlant.append(plants['Название растения']);
    tr.append(nameOfPlant);

    const systPosition = document.createElement("td");
    systPosition.append(plants['Систематическое положение']);
    tr.append(systPosition);

    const lifeForm = document.createElement("td");
    lifeForm.append(plants['Жизненная форма']);
    tr.append(lifeForm);

    const bioDescr = document.createElement("td");
    bioDescr.append(plants['Биологическое описание']);
    tr.append(bioDescr);

    const ecoDescr = document.createElement("td");
    ecoDescr.append(plants['Экологическое описание']);
    tr.append(ecoDescr); */


    for (const field in plants) {
        const idTd = document.createElement("td");
        let date
        typeof plants[field] == 'string' ? date = plants[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(plants[field])
        tr.append(idTd);
    }




/*     const dateOfLending = document.createElement("td");
    dateOfLending.append(plants['Дата посадки']);
    tr.append(dateOfLending);

    const infAboutWrOff = document.createElement("td");
    infAboutWrOff.append(plants['Информация о списании']);
    tr.append(infAboutWrOff);

    const location = document.createElement("td");
    location.append(plants['Местоположение в дендропарке']);
    tr.append(location);

    const using = document.createElement("td");
    using.append(plants['Применение']);
    tr.append(using);

    const numOfreg = document.createElement("td");
    numOfreg.append(plants['Номер региона']);
    tr.append(numOfreg); */

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", plants['Уникальный номер']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        // EditUser(user['ID клиента']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", plants['Уникальный номер']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        //DeleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetClientRequest()