async function GetPlantsUsersOfDendropark() {
    const response = await fetch("/api/PlantsUsersOfDendropark", {
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
        //editRegistrationCard(request['Уникальный номер']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", request['Уникальный номер']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();

        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            //deleteRegistrationCard(request['Уникальный номер']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

GetPlantsUsersOfDendropark();