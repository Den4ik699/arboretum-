async function GetWriteOffCertificate() {
    const response = await fetch("/api/writeOffCertificates", {
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

async function createCertificate() {
    const modal = document.querySelector('.decor');
    const inpNum = document.querySelector('#inpNum'),
        inpName = document.querySelector('#inpName'),
        inpCount = document.querySelector('#inpCount'),
        inpCauseOff = document.querySelector('#inpCauseOff'),
        inpDateOff = document.querySelector('#inpDateOff'),
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
        const response = await fetch("/api/createCertificate", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ['Номер акта']: inpNum.value,
                ['Наименование списанного объекта']: inpName.value,
                ['Количество']: inpCount.value,
                ['Причины списания']: inpCauseOff.value,
                ['Дата списания']: inpDateOff.value,
                ['Табельный номер']: inpTabNum.value
            })
        });
        if (response.ok === true) {
            const user = await response.json();
            console.log(user);
            console.log(user.infoMessage);
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

async function editCertificate(id) {
    const response = await fetch("/api/getCertificate/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let num, name,count, causeOfOff, dateOff, tabnum;
    if (response.ok === true) {
        const getCertificate = await response.json();
        num = getCertificate['Номер акта'];
        name = getCertificate['Наименование списанного объекта'];
        count = getCertificate['Количество'];
        causeOfOff = getCertificate['Причины списания'];
        dateOff = getCertificate['Дата списания'];
        tabnum = getCertificate['Табельный номер'];

    }

    const editResponse = await fetch("/api/editCertificate/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['Номер акта']: num,
            ['Наименование списанного объекта']: prompt('Введите Наименование списанного объекта', `${name}`),
            ['Количество']: prompt('Введите Количество', `${count}`),
            ['Причины списания']: prompt('Введите Причину списания', `${causeOfOff}`),
            ['Дата списания']: prompt('Введите Дату списания', `${dateOff}`),
            ['Табельный номер']: prompt('Введите Табельный номер', `${tabnum}`)
        })
    });
    if (editResponse.ok === true) {
        const writeOff = await editResponse.json();
        document.querySelector("tr[data-rowid='" + writeOff['Номер акта'] + "']").replaceWith(row(writeOff));
    }
}

async function deleteCertificate(id) {
    const response = await fetch("/api/getCertificate/" + id, {
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

function row(certificate) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", certificate['Номер акта']);


    for (const field in certificate) {
        const idTd = document.createElement("td");
        let date
        typeof certificate[field] == 'string' ? date = certificate[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(certificate[field])
        tr.append(idTd);
    }


    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", certificate['Номер акта']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        editCertificate(certificate['Номер акта']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", certificate['Номер акта']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color: gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            deleteCertificate(certificate['Номер акта']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetWriteOffCertificate()