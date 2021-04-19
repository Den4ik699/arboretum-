async function GetChemicalSubstance() {
    const response = await fetch("/api/chemicalSubstance", {
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
    tr.setAttribute("data-rowid", request['Номенклатурный номер']);


    for (const field in request) {
        const idTd = document.createElement("td");
        let date
        typeof request[field] == 'string' ? date = request[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(request[field])
        tr.append(idTd);
    }


   /*  const num = document.createElement("td");
    num.append(request['Номенклатурный номер']);
    tr.append(num);

    const nameOfSubst = document.createElement("td");
    nameOfSubst.append(request['Название вещества']);
    tr.append(nameOfSubst);

    const recommend = document.createElement("td");
    recommend.append(request['Рекомендации по применению']);
    tr.append(recommend);

    const infAboutUsing = document.createElement("td");
    infAboutUsing.append(request['Информация об использовании']);
    tr.append(infAboutUsing);
 */

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", request['Номенклатурный номер']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        //EditUser(user['Табельный номер']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", request['Табельный номер']);
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
GetChemicalSubstance()