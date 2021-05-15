
async function GetUsers() {
    const response = await fetch("/api/usersOfDendropark", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        const users = await response.json();
        let thead = document.querySelector("#thead1");
        const tr = document.createElement("tr");
        for (const key in users[0]) {
            tr.append(head(key));
        }
        thead.append(tr)
        let rows = document.querySelector("#tbody1");
        users.forEach(user => {
            rows.append(row(user));
        });
    }
}

async function EditUser(id) {
    let triggerMessage = 'Данные добавлены в таблицу "Обновленные пользователи"';
    const response = await fetch("/api/getUser/" + id, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let Findid, numBook, tabNum, fio, position, goalOfUsing
    if (response.ok === true) {
        const getuser = await response.json();
        Findid = getuser['ID']
        numBook = getuser['Номер поименной книги'];
        tabNum = getuser['Табельный номер'];
        fio = getuser['ФИО'];
        position = getuser['Должность'];
        goalOfUsing = getuser['Цель использования материалов дендропарка'];
    }


    const editResponse = await fetch("/api/editUsers/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ['ID']: Findid,
            ['Номер поименной книги']: prompt('Введите номер поименной книги', `${numBook}`),
            ['Табельный номер']: prompt('Введите табельный номер', `${tabNum}`),
            ['ФИО']: prompt('Введите ФИО', `${fio}`),
            ['Должность']: prompt('Введите должность', `${position}`),
            ['Цель использования материалов дендропарка']: prompt('Введите Цель использования материалов дендропарка', `${goalOfUsing}`)
        })
    });
    if (editResponse.ok === true) {

        const user = await editResponse.json();
        //console.log(user.infoMessage.message);
        //console.log(triggerMessage);

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
            console.log(user.result);
            if(user.infoMessage.message === triggerMessage) {
                document.querySelector("tr[data-rowid='" + user.result['ID'] + "']").replaceWith(row(user.result));
            }
           alert(user.infoMessage.message);
       }
    }
}



async function CreateUser() {
    let triggerMessage = 'Данные добавлены в таблицу "Добавленные пользователи"';
    const modal = document.querySelector('.decor');
    const inpNumBook = document.querySelector('#inpNumBook'),
        inpTabNum = document.querySelector('#inpTabNum'),
        inpfio = document.querySelector('#inpfio'),
        inprank = document.querySelector('#inprank'),
        inpGoalOfUsing = document.querySelector('#inpGoalOfUsing'),
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

        if (inpNumBook.value === '' || inpTabNum.value === '' || inpfio.value === '' ||
            inpGoalOfUsing.value === '') {
            alert('Не должно быть пустых полей');
        } else {

            e.preventDefault();
            hideModal();
            const response = await fetch("/api/createUser", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ['Номер поименной книги']: inpNumBook.value,
                    ['Табельный номер']: inpTabNum.value,
                    ['ФИО']: inpfio.value,
                    ['Должность']: inprank.value,
                    ['Цель использования материалов дендропарка']: inpGoalOfUsing.value
                })
            });
            if (response.ok === true) {
                const user = await response.json();
                console.log(user);
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
                } else if (user.infoMessage) {
                    if (user.infoMessage.message === triggerMessage) {
                        document.querySelector("#tbody1").append(row(user.result));
                    }
                    alert(user.infoMessage.message);
                }
            }
        }
    })
}

async function DeleteUser(id) {
    let triggerMessage = 'Данные добавлены в таблицу "Удаленные пользователи"'
    const response = await fetch("/api/users/" + id, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok === true) {
        const id = await response.json();
        if (id.err) {
            switch (id.err.number) {
                case 229:
                    alert('У вас недостаточно прав')
                    break;

                case 547:
                    alert('Ошибка целостности')
                    break;
                default:
                    alert(id.err.message)
                    break;
            }
        }
        else if (id.infoMessage) {
            if(id.infoMessage.message === triggerMessage) {
                document.querySelector("tr[data-rowid='" + id.idFind + "']").remove();
            }
            alert(id.infoMessage.message);
        }
    }
}
function head(key) {
    const th = document.createElement("th");
    th.append(key)
    return th;
}

function row(user) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user['ID']);


    for (const field in user) {
        const idTd = document.createElement("td");
        let date
        typeof user[field] == 'string' ? date = user[field].match('[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])') : date = null

        date ? idTd.append(date[0]) : idTd.append(user[field])
        tr.append(idTd);
    }


    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user['ID']);
    editLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        EditUser(user['ID']);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user['ID']);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px; color:gold");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        let confDelItem = confirm("Вы уверены, что хотите удалить запись?");
        if (confDelItem) {
            DeleteUser(user['ID']);
        }
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
GetUsers()