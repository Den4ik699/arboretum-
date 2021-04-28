export async function getRequest(url,header) {
    const response = await fetch(`/api/${url}`);
    if (response.ok === true) {
        const departments = await response.json();
        let thead = document.querySelector("#thead1");
        thead.innerHTML = `<tr>${header}`
        let rows = document.querySelector("#tbody1");
        rows.innerHTML = ''
        departments.forEach(pos => {
            rows.append(row(pos));
        });
    }
}

export function row(table, id) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", table[id]);

    for (const field in table) {
        const idTd = document.createElement("td");
        let date
        typeof table[field] == 'string' ? date = table[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        if (date) {
            idTd.style.minWidth = 140 + 'px'
            idTd.append(date[0])
        }
        else {
            idTd.append(table[field])
        }
        tr.append(idTd);
    }
    return tr;
}