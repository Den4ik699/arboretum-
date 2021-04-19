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

/*     const num = document.createElement("td");
    num.append(request['Порядковый номер учетной карточки']);
    tr.append(num);

    const uniqNum = document.createElement("td");
    uniqNum.append(request['Уникальный номер']);
    tr.append(uniqNum);

    const name = document.createElement("td");
    name.append(request['Название заменяемого растения']);
    tr.append(name);

    const causeOfReplace = document.createElement("td");
    causeOfReplace.append(request['Причина замены']);
    tr.append(causeOfReplace);

    const dateOfrelace = document.createElement("td");
    dateOfrelace.append(request['Дата замены']);
    tr.append(dateOfrelace);

    const tabNum = document.createElement("td");
    tabNum.append(request['Табельный номер']);
    tr.append(tabNum); */


    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", request['Уникальный номер']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        //EditUser(user['Табельный номер']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", request['Уникальный номер']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color: gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        //DeleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetPlantReplacement()