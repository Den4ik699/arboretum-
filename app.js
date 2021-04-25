const express = require('express')
const hbs = require('hbs')
const expressHbs = require("express-handlebars");
const app = express()
const jsonParser = express.json()
var Connection = require('tedious').Connection;

var connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

app.listen(3000, function (err) {
    if (err) return console.log(err)
    else console.log('Сервер запущен')
})


app.set("view engine", "hbs")
app.set("views", "public/views")

app.use(express.static(__dirname + '/public'))

app.engine("hbs", expressHbs({
    layoutsDir: "public/views/layout",
    defaultLayout: "layout",
    extname: "hbs"
}))

app.get("/", function (request, response) {
    response.render("home")
})

app.get("/UsersOfDendropark", function (request, response) {
    response.render("UsersOfDendropark", {
        title: `Пользователи дендропарка`
    })
})

app.get("/Officials", function (request, response) {
    response.render("Officials", {
        title: `Должностные лица`
    })
})

app.get("/Plants", function (request, response) {
    response.render("plants", {
        title: `Растения`
    })
})

app.get("/chemicalSubstance", function (request, response) {
    response.render("chemicalSubstance", {
        title: `Химические вещества`
    })
})

app.get("/studyExcursions", function (request, response) {
    response.render("studyExcursions", {
        title: `Учебные экскурсии`
    })
})


app.get("/excursionReports", function (request, response) {
    response.render("excursionReports", {
        title: `Учебные экскурсии`
    })
})

app.get("/plantReplacement", function (request, response) {
    response.render("plantReplacement", {
        title: `Замененные растения`
    })
})

app.get("/writeOffCertificates", function (request, response) {
    response.render("writeOffCertificates", {
        title: `Акты на списание`
    })
})

app.get("/countOfPlants", function (request, response) {
    response.render("countOfPlants", {
        title: `Поиск растения по жизненной форме`
    })
})

app.get("/countOfTeachers", function (request, response) {
    response.render("countOfTeachers", {
        title: `Поиск сотрудников по должности`
    })
})

app.get('/api/usersOfDendropark', function (req, res) {
    request = new Request("SELECT * FROM [Users of dendropark]", function (err, count, rows) {
        console.log(rows);
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице [Users of dendropak] завершён')
    });
    connection.execSql(request);
})

app.get('/api/Officials', function (req, res) {
    request = new Request("SELECT * FROM [Officials]", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице [Officials] завершён')
    });
    connection.execSql(request);
})

app.get('/api/plants', function (req, res) {
    request = new Request("SELECT * FROM [Plants]", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице Plants завершён')
    });
    connection.execSql(request);
})

app.get('/api/chemicalSubstance', function (req, res) {
    request = new Request("SELECT * FROM [Chemical substances]", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице [Chemical substances] завершён')
    });
    connection.execSql(request);
})

app.get('/api/studyExcursions', function (req, res) {
    request = new Request("SELECT * FROM [Study excursions]", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице [Study excursions] завершён')
    });
    connection.execSql(request);
})

app.get('/api/excursionReports', function (req, res) {
    request = new Request("SELECT * FROM [Excursion reports]", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице [Excursion reports] завершён')
    });
    connection.execSql(request);
})

app.get('/api/plantReplacement', function (req, res) {
    request = new Request("SELECT * FROM [Plant replacement]", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице [Plant replacement] завершён')
    });
    connection.execSql(request);
})


app.get('/api/writeOffCertificates', function (req, res) {
    request = new Request("SELECT * FROM [Write-off certificates]", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        res.send(JSON.stringify(result))
    });
    request.on('requestCompleted', function () {
        console.log('запрос к таблице [Write-off certificates] завершён')
    });
    connection.execSql(request);
})

//<==================================== USERS_OF_DENDROPARK ========================================>
app.delete("/api/users/:id", function (req, res) {
    const idFind = req.params.id;
    request = new Request("DELETE [Users of dendropark] WHERE [Users of dendropark].[ID] = @id", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(idFind))
    });
    request.addParameter('id', TYPES.Int, idFind);
    connection.execSql(request);
});

app.get("/api/getUser/:id", function (req, res) {
    const idFind = req.params.id;
    request = new Request("SELECT * FROM [Users of dendropark] WHERE [Users of dendropark].[ID]= @id", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('id', TYPES.Int, idFind);
    connection.execSql(request);
});

app.put("/api/editUsers", jsonParser, function (req, res) {
    let idFind
    let numBook, tabNum, fio, rank, goalOfUsing;
    idFind = req.body['ID']
    numBook = req.body['Номер поименной книги'];
    tabNum = req.body['Табельный номер'];
    fio = req.body['ФИО'];
    rank = req.body['Должность'];
    goalOfUsing = req.body['Цель использования материалов дендропарка'];
    console.log(numBook, tabNum, fio, rank, goalOfUsing);
    request = new Request("UpdateUsersOfDendropark", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('id', TYPES.Int, idFind);
    request.addParameter('numBook', TYPES.Int, numBook);
    request.addParameter('tabNum', TYPES.Int, tabNum);
    request.addParameter('fio', TYPES.NVarChar, fio);
    request.addParameter('position', TYPES.NVarChar, rank);
    request.addParameter('goalOfUsing', TYPES.NVarChar, goalOfUsing);
    connection.callProcedure(request);
});

app.post("/api/createUser", jsonParser, function (req, res) {
    let numBook, tabNum, fio, rank, goalOfUsing;
    numBook = req.body['Номер поименной книги'];
    tabNum = req.body['Табельный номер'];
    fio = req.body['ФИО'];
    rank = req.body['Должность'];
    goalOfUsing = req.body['Цель использования материалов дендропарка'];
    /* console.log(numBook, tabNum, fio, rank, goalOfUsing); */
    request = new Request("addUsers", function (err, count, rows) {
        if (err) {
            return console.error(err);
        }
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        console.log(result);
        res.send(JSON.stringify(result))
    });
    request.addParameter('numBook', TYPES.Int, numBook);
    request.addParameter('tabNum', TYPES.Int, tabNum);
    request.addParameter('fio', TYPES.NVarChar, fio);
    request.addParameter('position', TYPES.NVarChar, rank);
    request.addParameter('goalOfUsing', TYPES.NVarChar, goalOfUsing);
    connection.callProcedure(request);
});

//<==================================== OFFICIALS ========================================>
app.post("/api/createOfficial", jsonParser, function (req, res) {
    let tabNum, fio, rank, respons;
    tabNum = req.body['Табельный номер'];
    fio = req.body['ФИО'];
    rank = req.body['Административная должность'];
    respons = req.body['Должностные обязанности'];
    console.log(tabNum, fio, rank, respons);
    request = new Request("addOfficials", function (err, count, rows) {
        if (err) {
            return console.error(err);
        }
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        console.log(result);
        res.send(JSON.stringify(result))
    });
    request.addParameter('tubnum', TYPES.Int, tabNum);
    request.addParameter('fio', TYPES.NVarChar, fio);
    request.addParameter('position', TYPES.NVarChar, rank);
    request.addParameter('workRespons', TYPES.NVarChar, respons);
    connection.callProcedure(request);
});

app.delete("/api/officials/:tubnum", function (req, res) {
    const idFind = req.params.tubnum;
    request = new Request("DELETE [Officials] WHERE [Officials].[Табельный номер] = @tubnum", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(idFind))
    });
    request.addParameter('tubnum', TYPES.Int, idFind);
    connection.execSql(request);
});

app.get("/api/getOfficial/:tubnum", function (req, res) {
    const tubnum = req.params.tubnum;
    request = new Request("SELECT * FROM Officials WHERE Officials.[Табельный номер]= @tubnum", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('tubnum', TYPES.Int, tubnum);
    connection.execSql(request);
});

app.put("/api/editOfficial", jsonParser, function (req, res) {
    let idFind
    let tabNum, fio, rank, respons;
    /* idFind = req.body['ID'] */
    tabNum = req.body['Табельный номер'];
    fio = req.body['ФИО'];
    rank = req.body['Административная должность'];
    respons = req.body['Должностные обязанности'];
    console.log(tabNum, fio, rank, respons);
    request = new Request("updateOfficial", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        console.log(result);
        res.send(JSON.stringify(result));
    })
    request.addParameter('tubnum', TYPES.Int, tabNum);
    request.addParameter('fio', TYPES.NVarChar, fio);
    request.addParameter('position', TYPES.NVarChar, rank);
    request.addParameter('workRespons', TYPES.NVarChar, respons);
    connection.callProcedure(request);
})




app.post("/api/countOfPlants", jsonParser, function (req, res) {
    const params = [
        ['life', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'CountPlants', params, true)
});

app.post("/api/countOfTeachers", jsonParser, function (req, res) {
    const params = [
        ['rank', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'CountOfTeachers', params, true)
});

function postPutApi(req, res, procedure, params, asArr) {
    let result;
    request = new Request(procedure, function (err, count, rows) {
        if (err) {
            return console.error(err);
        }
        result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        if(!asArr) {
            result = result[0]
        }
        res.send(JSON.stringify(result))
    });
    for (const param of params) {
        request.addParameter(param[0], param[1], req.body[param[0]]);
    }
    connection.callProcedure(request);
    connection.on('infoMessage', function(info) {
        if(!info){

        } else {
            console.log('info =========================================');
            console.log(info);
        }
    })
}



app.post("/api/authorization", jsonParser, function (req, res) {
    console.log('asdasdaasdasd')
    console.log(req.body)
    let config = {
        server: 'localhost',
        authentication: {
            type: 'default',
            options: {
                userName: req.body.username,
                password: req.body.password
            }
        },
        options: {
            port: 1433,
            database: 'Dendropark',
            trustServerCertificate: true,
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true
        }
    };
    connection = new Connection(config);
    connection.connect();
    connection.on('connect', function (err) {
        if (err) return console.log(err.message)
        else {
            console.log("База даных подключена");
            res.send(JSON.stringify({flag: true}))
        }
    });
    // connection.close();
    // connection.on('error', () => {})
});