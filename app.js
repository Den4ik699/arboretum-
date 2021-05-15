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
        title: `Отчеты о проведенных экскурсиях`
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

app.get("/listOfStudExcursion", function (request, response) {
    response.render("listOfStudExcursion", {
        title: `Поиск студентов, которые посетили определенную экскурсию`
    })
})

app.get("/listOfStudExcursion", function (request, response) {
    response.render("listOfStudExcursion", {
        title: `Поиск студентов, которые посетили определенную экскурсию`
    })
})

app.get("/decomissPlants", function (request, response) {
    response.render("decomissPlants", {
        title: `Поиск растений списанных за день и их количество`
    })
})

app.get("/countOfOfficials", function (request, response) {
    response.render("countOfOfficials", {
        title: `Количество должностей в дендропарке`
    })
})

app.get("/deletedUsers", function (request, response) {
    response.render("deletedUsers", {
        title: `Удаленные пользователи`
    })
})

app.get("/deletedOfficials", function (request, response) {
    response.render("deletedOfficials", {
        title: `Удаленные должностные лица`
    })
})

app.get("/insertedOfficials", function (request, response) {
    response.render("insertedOfficials", {
        title: `Добавленные должностные лица`
    })
})

app.get("/insertedUsers", function (request, response) {
    response.render("insertedUsers", {
        title: `Добавленные пользователи`
    })
})

app.get("/updatedUsers", function (request, response) {
    response.render("updatedUsers", {
        title: `Обновленные пользователи`
    })
})

app.get("/registrationCard", function (request, response) {
    response.render("registrationCard", {
        title: `Учетная карточка`
    })
})

app.get("/chemicalSubstancesPlants", function (request, response) {
    response.render("ChemicalSubstancesPlants", {
        title: `Хим Вещества Растения`
    })
})


app.get('/api/usersOfDendropark', function (req, res) {
    let request = new Request("SELECT * FROM [Users of dendropark]", function (err, count, rows) {
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

app.get('/api/deletedUsers', function (req, res) {
    let request = new Request("SELECT * FROM [DeletedUser]", function (err, count, rows) {
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
        console.log('запрос к таблице deletedUsers завершён')
    });
    connection.execSql(request);
})

app.get('/api/deletedOfficials', function (req, res) {
    let request = new Request("SELECT * FROM [DeletedOfficials]", function (err, count, rows) {
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
        console.log('запрос к таблице [DeletedOfficials] завершён')
    });
    connection.execSql(request);
})

app.get('/api/insertedOfficials', function (req, res) {
    let request = new Request("SELECT * FROM [InsertedOfficials]", function (err, count, rows) {
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
        console.log('запрос к таблице [InsertedOfficials] завершён')
    });
    connection.execSql(request);
})

app.get('/api/insertedUsers', function (req, res) {
    let request = new Request("SELECT * FROM [InsertedUsers]", function (err, count, rows) {
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
        console.log('запрос к таблице [InsertedUsers] завершён')
    });
    connection.execSql(request);
})

app.get('/api/updatedUsers', function (req, res) {
    let request = new Request("SELECT * FROM [UpdatedUsers]", function (err, count, rows) {
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
        console.log('запрос к таблице [UpdatedUsers] завершён')
    });
    connection.execSql(request);
})

//<=========================PLANTS==============================>
app.get('/api/plants', function (req, res) {
    let request = new Request("SELECT * FROM [Plants]", function (err, count, rows) {
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

app.post("/api/createPlant", jsonParser, function (req, res) {

    let uniqNum, namePlant, systLocation, life, bioDescr, ecoDescr, dateOfLand, infWrOff, location, using, numOfreg;
    let infoMessage;
    uniqNum = req.body['Уникальный номер'];
    namePlant = req.body['Название растения'];
    systLocation = req.body['Систематическое положение'];
    life = req.body['Жизненная форма'];
    bioDescr = req.body['Биологическое описание'];
    ecoDescr = req.body['Экологическое описание'];
    dateOfLand = req.body['Дата посадки'];
    infWrOff = req.body['Информация о списании'];
    location = req.body['Местоположение в дендропарке'];
    using = req.body['Применение'];
    numOfreg = req.body['Номер региона'];

    //console.log(uniqNum, namePlant, systLocation, life, bioDescr,ecoDescr,dateOfLand,infWrOff,location,using,numOfreg);
    let request = new Request("addPlants", function (err, count, rows) {
        if (err) {
            res.send(JSON.stringify({infoMessage}))
                //return console.error(err);
        }
        else {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            console.log(result);
            res.send(JSON.stringify(result))
        }
    });

    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    request.addParameter('namePlant', TYPES.NVarChar, namePlant);
    request.addParameter('systLocation', TYPES.NVarChar, systLocation);
    request.addParameter('life', TYPES.NVarChar, life);
    request.addParameter('bioDescr', TYPES.NVarChar, bioDescr);
    request.addParameter('ecoDescr', TYPES.NVarChar, ecoDescr);
    request.addParameter('dateOfLand', TYPES.Date, dateOfLand);
    request.addParameter('infWrOff', TYPES.NVarChar, infWrOff);
    request.addParameter('location', TYPES.NVarChar, location);
    request.addParameter('using', TYPES.NVarChar, using);
    request.addParameter('numOfreg', TYPES.Int, numOfreg);

    connection.callProcedure(request);

    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.put("/api/editPlants", jsonParser, function (req, res) {
    let uniqNum, namePlant, systLocation, life, bioDescr, ecoDescr, dateOfLand, infWrOff, location, using, numOfreg;

    uniqNum = req.body['Уникальный номер'];
    namePlant = req.body['Название растения'];
    systLocation = req.body['Систематическое положение'];
    life = req.body['Жизненная форма'];
    bioDescr = req.body['Биологическое описание'];
    ecoDescr = req.body['Экологическое описание'];
    dateOfLand = req.body['Дата посадки'];
    infWrOff = req.body['Информация о списании'];
    location = req.body['Местоположение в дендропарке'];
    using = req.body['Применение'];
    numOfreg = req.body['Номер региона'];

    console.log(uniqNum, namePlant, systLocation, life, bioDescr, ecoDescr, dateOfLand, infWrOff, location, using, numOfreg);
    let request = new Request("updatePlants", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    request.addParameter('namePlant', TYPES.NVarChar, namePlant);
    request.addParameter('systLocation', TYPES.NVarChar, systLocation);
    request.addParameter('life', TYPES.NVarChar, life);
    request.addParameter('bioDescr', TYPES.NVarChar, bioDescr);
    request.addParameter('ecoDescr', TYPES.NVarChar, ecoDescr);
    request.addParameter('dateOfLand', TYPES.Date, dateOfLand);
    request.addParameter('infWrOff', TYPES.NVarChar, infWrOff);
    request.addParameter('location', TYPES.NVarChar, location);
    request.addParameter('using', TYPES.NVarChar, using);
    request.addParameter('numOfreg', TYPES.Int, numOfreg);
    connection.callProcedure(request);
});

app.get("/api/getPlant/:uniqNum", function (req, res) {
    const uniqNum = req.params.uniqNum;
    let request = new Request("SELECT * FROM [Plants] WHERE Plants.[Уникальный номер] = @uniqNum", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    connection.execSql(request);
});

app.delete("/api/getPlant/:uniqNum", function (req, res) {
    const uniqNum = req.params.uniqNum;
    console.log(uniqNum);
    let request = new Request("DELETE [Plants] WHERE [Plants].[Уникальный номер] = @uniqNum", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(uniqNum))
    });
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    connection.execSql(request);
});


//<=====================REGISTRATION CARD====================>

app.get('/api/registrationCard', function (req, res) {
    let request = new Request("SELECT * FROM [Registration card]", function (err, count, rows) {
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
        console.log('запрос к таблице Registration card завершён')
    });
    connection.execSql(request);
})

app.post("/api/createRegistrationCard", jsonParser, function (req, res) {

    let uniqNum, namePlant, systLocation, life, dateOfLand, infWrOff, location;
    uniqNum = req.body['Уникальный номер'];
    namePlant = req.body['Название растения'];
    systLocation = req.body['Систематическое положение'];
    life = req.body['Жизненная форма'];
    dateOfLand = req.body['Дата посадки'];
    infWrOff = req.body['Информация о списании'];
    location = req.body['Местоположение в дендропарке'];


    console.log(uniqNum, namePlant, systLocation, life,dateOfLand,infWrOff,location);
    let request = new Request("addRegistrationCard", function (err, count, rows) {
        if (err) {
            return console.error(err);
        }
        else {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            res.send(JSON.stringify(result))
        }
    });

    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    request.addParameter('namePlant', TYPES.NVarChar, namePlant);
    request.addParameter('systLocation', TYPES.NVarChar, systLocation);
    request.addParameter('life', TYPES.NVarChar, life);
    request.addParameter('dateOfLand', TYPES.Date, dateOfLand);
    request.addParameter('infWrOff', TYPES.NVarChar, infWrOff);
    request.addParameter('location', TYPES.NVarChar, location);

    connection.callProcedure(request);

});

app.put("/api/editRegistrationCard", jsonParser, function (req, res) {
    let uniqNum, namePlant, systLocation, life, dateOfLand, infWrOff, location;
    uniqNum = req.body['Уникальный номер'];
    namePlant = req.body['Название растения'];
    systLocation = req.body['Систематическое положение'];
    life = req.body['Жизненная форма'];
    dateOfLand = req.body['Дата посадки'];
    infWrOff = req.body['Информация о списании'];
    location = req.body['Местоположение в дендропарке'];

    //console.log(uniqNum, namePlant, systLocation, life, bioDescr, ecoDescr, dateOfLand, infWrOff, location, using, numOfreg);
    let request = new Request("updateRegistrationCard", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    request.addParameter('namePlant', TYPES.NVarChar, namePlant);
    request.addParameter('systLocation', TYPES.NVarChar, systLocation);
    request.addParameter('life', TYPES.NVarChar, life);
    request.addParameter('dateOfLand', TYPES.Date, dateOfLand);
    request.addParameter('infWrOff', TYPES.NVarChar, infWrOff);
    request.addParameter('location', TYPES.NVarChar, location);

    connection.callProcedure(request);
});

app.get("/api/getRegistrationCard/:uniqNum", function (req, res) {
    const uniqNum = req.params.uniqNum;
    let request = new Request("SELECT * FROM [Registration card] where [Registration card].[Уникальный номер] = @uniqNum", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    connection.execSql(request);
});

app.delete("/api/getRegistrationCard/:uniqNum", function (req, res) {
    const uniqNum = req.params.uniqNum;
    console.log(uniqNum);
    let request = new Request("DELETE [Registration card] WHERE [Registration card].[Уникальный номер] = @uniqNum", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(uniqNum))
    });
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    connection.execSql(request);
});

//<======================ChemicalSubstancesPlants=================>

app.get('/api/chemicalSubstancesPlants', function (req, res) {
  let request = new Request("SELECT * FROM [Chemical substances Plants]", function (err, count, rows) {
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
        console.log('запрос к таблице [Chemical substances Plants] завершён')
    });
    connection.execSql(request);
})


//<===============PlantsUsersOfDendropark==================>
app.get('/api/PlantsUsersOfDendropark', function (req, res) {
    let request = new Request("SELECT * FROM [Plants Users of dendropark]", function (err, count, rows) {
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
        console.log('запрос к таблице [Plants Users of dendropark] завершён')
    });
    connection.execSql(request);
})

app.get("/PlantsUsersOfDendropark", function (request, response) {
    response.render("PlantsUsersOfDendropark", {
        title: `Растения Пользователи Дендропарка`
    })
})

//<===================The region of dendropark Study excursions===================>
app.get('/api/TheRegionOfDendroparkStudyExcursions', function (req, res) {
    let request = new Request("SELECT * FROM [The region of dendropark Study excursions]", function (err, count, rows) {
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
        console.log('запрос к таблице [The region of dendropark Study excursions] завершён')
    });
    connection.execSql(request);
})

app.get("/TheRegionOfDendroparkStudyExcursions", function (request, response) {
    response.render("TheRegionOfDendroparkStudyExcursions", {
        title: `Регион Дендропарка Учебные Экскурсии`
    })
})

//<=========================UsersOfDendroparkStudyExcursions=======================>
app.get('/api/UsersOfDendroparkStudyExcursions', function (req, res) {
    let request = new Request("SELECT * FROM [Users of dendropark Study excursions]", function (err, count, rows) {
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
        console.log('запрос к таблице [The region of dendropark Study excursions] завершён')
    });
    connection.execSql(request);
})

app.get("/UsersOfDendroparkStudyExcursions", function (request, response) {
    response.render("UsersOfDendroparkStudyExcursions", {
        title: `Пользователи Дендропарка Учебные Экскурсии`
    })
})

//<================CHEMICAL SUBSTANCE========================>
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

app.post("/api/createSubstance", jsonParser, function (req, res) {

    let num, nameSubst, recommend, inf;
    num = req.body['Номенклатурный номер'];
    nameSubst = req.body['Название вещества'];
    recommend = req.body['Рекомендации по применению'];
    inf = req.body['Информация об использовании'];

    console.log(num, nameSubst, recommend, inf);
    let request = new Request("AddNewSubstance", function (err, count, rows) {
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

    request.addParameter('numenNum', TYPES.Int, num);
    request.addParameter('nameSubst', TYPES.NVarChar, nameSubst);
    request.addParameter('recommend', TYPES.NVarChar, recommend);
    request.addParameter('infabusing', TYPES.NVarChar, inf);

    connection.callProcedure(request);
});

app.get("/api/getSubstance/:num", function (req, res) {
    const num = req.params.num;
    let request = new Request("SELECT * FROM [Chemical substances] WHERE [Chemical substances].[Номенклатурный номер] = @num", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('num', TYPES.Int, num);
    connection.execSql(request);
});

app.put("/api/editSubstance", jsonParser, function (req, res) {
    let num, nameSubst, recommend, inf;
    num = req.body['Номенклатурный номер'];
    nameSubst = req.body['Название вещества'];
    recommend = req.body['Рекомендации по применению'];
    inf = req.body['Информация об использовании'];
    console.log(num, nameSubst, recommend, inf);

    let request = new Request("updateSubstance", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('numenNum', TYPES.Int, num);
    request.addParameter('nameSubst', TYPES.NVarChar, nameSubst);
    request.addParameter('recommend', TYPES.NVarChar, recommend);
    request.addParameter('infabusing', TYPES.NVarChar, inf);
    connection.callProcedure(request);
});

app.delete("/api/getSubstance/:num", function (req, res) {
    const num = req.params.num;
    console.log(num);
    let request = new Request("DELETE [Chemical substances] WHERE [Chemical substances].[Номенклатурный номер] = @num", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(num))
    });
    request.addParameter('num', TYPES.Int, num);
    connection.execSql(request);
});


//<=====================STUDY EXCURSION=======================>
app.get('/api/studyExcursions', function (req, res) {
    let request = new Request("SELECT * FROM [Study excursions]", function (err, count, rows) {
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

app.post("/api/createExcursion", jsonParser, function (req, res) {

    let nameEx, descript, tabNum, duration;
    nameEx = req.body['Наименование экскурсии'];
    descript = req.body['Краткое содержание экскурсии'];
    tabNum = req.body['Табельный номер'];
    duration = req.body['Продолжительность экскурсии'];

    console.log(nameEx, descript, tabNum, duration);
    let request = new Request("AddNewExcursion", function (err, count, rows) {
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

    request.addParameter('nameEx', TYPES.NVarChar, nameEx);
    request.addParameter('descript', TYPES.NVarChar, descript);
    request.addParameter('tabNum', TYPES.Int, tabNum);
    request.addParameter('duration', TYPES.NVarChar, duration);

    connection.callProcedure(request);
});

app.get("/api/getExcursion/:id", function (req, res) {
    const id = req.params.id;
    let request = new Request("SELECT * FROM [Study excursions] where [Study excursions].[Порядковый номер экскурсии] = @id", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('id', TYPES.Int, id);
    connection.execSql(request);
});

app.put("/api/editExcursion", jsonParser, function (req, res) {
    let idFind, nameEx, descript, tabNum, duration;
    idFind = req.body['Порядковый номер экскурсии']
    nameEx = req.body['Наименование экскурсии'];
    descript = req.body['Краткое содержание экскурсии'];
    tabNum = req.body['Табельный номер'];
    duration = req.body['Продолжительность экскурсии'];

    console.log(nameEx, descript, tabNum, duration);


    let request = new Request("UpdateExcursion", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('id', TYPES.NVarChar, idFind);
    request.addParameter('nameEx', TYPES.NVarChar, nameEx);
    request.addParameter('descript', TYPES.NVarChar, descript);
    request.addParameter('tabNum', TYPES.Int, tabNum);
    request.addParameter('duration', TYPES.NVarChar, duration);
    connection.callProcedure(request);
});

app.delete("/api/getExcursion/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    let request = new Request("DELETE [Study excursions] WHERE [Study excursions].[Порядковый номер экскурсии] = @id", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(id))
    });
    request.addParameter('id', TYPES.Int, id);
    connection.execSql(request);
});

//==<===================EXCURSION REPORTS==============>
app.get('/api/excursionReports', function (req, res) {
    let request = new Request("SELECT * FROM [Excursion reports]", function (err, count, rows) {
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

app.post("/api/createExcursionReports", jsonParser, function (req, res) {
    let infoMessage;
    let numEx, info, nameEx, datespend, tabnum;
    numEx = req.body['Порядковый номер экскурсии'];
    info = req.body['Информация о посетителях'];
    nameEx = req.body['Название экскурсии'];
    datespend = req.body['Дата проведения'];
    tabnum = req.body['Табельный номер'];


    console.log(numEx, info, nameEx, datespend, tabnum);

    try {
        let request = new Request("AddNewExcursonReport", function (err, count, rows) {
            if (err) {
                //return console.error(err);
                res.send(JSON.stringify({infoMessage}))
            }
            /*            else if (infoMessage) {
                            res.send(JSON.stringify({ infoMessage }))
                        }*/
            else {
                let result = rows.map(elem => {
                    return elem.reduce((total, elem) => {
                        total[elem.metadata.colName] = elem.value
                        return total
                    }, {})
                })[0]
                console.log(result);
                res.send(JSON.stringify(result))
            }
        });

        request.addParameter('numEx', TYPES.Int, numEx);
        request.addParameter('info', TYPES.NVarChar, info);
        request.addParameter('nameEx', TYPES.NVarChar, nameEx);
        request.addParameter('datespend', TYPES.Date, datespend);
        request.addParameter('tabnum', TYPES.Int, tabnum);


        connection.callProcedure(request);
    } catch (e) {
        res.send(JSON.stringify({infoMessage}));
    }

    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.get("/api/getExcursionReports/:id", function (req, res) {
    const id = req.params.id;
    let request = new Request("SELECT * FROM [Excursion reports] where [Excursion reports].[Порядковый номер экскурсии] = @numEx", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('numEx', TYPES.Int, id);
    connection.execSql(request);
});

app.put("/api/editExcursionReports", jsonParser, function (req, res) {
    let numEx, info, nameEx, datespend, tabnum;
    numEx = req.body['Порядковый номер экскурсии'];
    info = req.body['Информация о посетителях'];
    nameEx = req.body['Название экскурсии'];
    datespend = req.body['Дата проведения'];
    tabnum = req.body['Табельный номер'];


    console.log(numEx, info, nameEx, datespend, tabnum);

    let infoMessage;
    let request = new Request("UpdateExcursionReport", function (err, count, rows) {
        if (err) {
            //return console.log(err);
            res.send(JSON.stringify({infoMessage}))
        } else {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            res.send(JSON.stringify(result));
        }
    });
    console.log(numEx);
    request.addParameter('numEx', TYPES.Int, numEx);
    request.addParameter('info', TYPES.NVarChar, info);
    request.addParameter('nameEx', TYPES.NVarChar, nameEx);
    request.addParameter('datespend', TYPES.Date, datespend);
    request.addParameter('tabnum', TYPES.Int, tabnum);
    connection.callProcedure(request);

    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.delete("/api/getExcursionReport/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    let request = new Request("DELETE [Excursion reports] WHERE [Excursion reports].[Порядковый номер экскурсии] = @numEx", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(id))
    });
    request.addParameter('numEx', TYPES.Int, id);
    connection.execSql(request);
});


//<================= PLANT REPLACEMENT====================>
app.get('/api/plantReplacement', function (req, res) {
    let request = new Request("SELECT * FROM [Plant replacement]", function (err, count, rows) {
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


app.post("/api/createPlantReplacement", jsonParser, function (req, res) {
    let infoMessage;
    let numEx, uniqNum, namePlant, causeOfRepl, dateReplace, tabnum;
    numEx = req.body['Порядковый номер учетной карточки'];
    uniqNum = req.body['Уникальный номер'];
    namePlant = req.body['Название заменяемого растения'];
    causeOfRepl = req.body['Причина замены'];
    dateReplace = req.body['Дата замены'];
    tabnum = req.body['Табельный номер'];


    console.log(numEx, uniqNum, namePlant, causeOfRepl, dateReplace, tabnum);
    let request = new Request("addPlantReplacement", function (err, count, rows) {
        if (err){
            res.send(JSON.stringify({infoMessage}));
        }
        else {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            console.log(result);
            res.send(JSON.stringify(result));
        }
    });

    request.addParameter('numEx', TYPES.Int, numEx);
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    request.addParameter('namePlant', TYPES.NVarChar, namePlant);
    request.addParameter('causeOfRepl', TYPES.NVarChar, causeOfRepl);
    request.addParameter('dateReplace', TYPES.Date, dateReplace);
    request.addParameter('tabnum', TYPES.Int, tabnum);

    connection.callProcedure(request);

    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.get("/api/getPlantReplacement/:id", function (req, res) {
    const id = req.params.id;
    let request = new Request("SELECT * FROM [Plant replacement] where [Plant replacement].[Уникальный номер] = @uniqNum", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('uniqNum', TYPES.Int, id);
    connection.execSql(request);
});

app.put("/api/editPlantReplacement", jsonParser, function (req, res) {
    let numEx, uniqNum, namePlant, causeOfRepl, dateReplace, tabnum;
    numEx = req.body['Порядковый номер учетной карточки'];
    uniqNum = req.body['Уникальный номер'];
    namePlant = req.body['Название заменяемого растения'];
    causeOfRepl = req.body['Причина замены'];
    dateReplace = req.body['Дата замены'];
    tabnum = req.body['Табельный номер'];

    console.log(numEx, uniqNum, namePlant, causeOfRepl, dateReplace, tabnum);

    let request = new Request("UpdatePlantReplacement", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    console.log(numEx);
    request.addParameter('numEx', TYPES.Int, numEx);
    request.addParameter('uniqNum', TYPES.Int, uniqNum);
    request.addParameter('namePlant', TYPES.NVarChar, namePlant);
    request.addParameter('causeOfRepl', TYPES.NVarChar, causeOfRepl);
    request.addParameter('dateReplace', TYPES.Date, dateReplace);
    request.addParameter('tabnum', TYPES.Int, tabnum);
    connection.callProcedure(request);
});

app.delete("/api/getPlantReplacement/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    let request = new Request("DELETE [Plant replacement] WHERE [Plant replacement].[Уникальный номер] = @uniqNum", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(id))
    });
    request.addParameter('uniqNum', TYPES.Int, id);
    connection.execSql(request);
});

//<===================WRITE OFF CERTIFICATES========================>
app.get('/api/writeOffCertificates', function (req, res) {
    let request = new Request("SELECT * FROM [Write-off certificates]", function (err, count, rows) {
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

app.post("/api/createCertificate", jsonParser, function (req, res) {

    let num, name, count, causeOfOff, dateOff, tabnum, infoMessage;
    num = req.body['Номер акта'];
    name = req.body['Наименование списанного объекта'];
    count = req.body['Количество'];
    causeOfOff = req.body['Причины списания'];
    dateOff = req.body['Дата списания'];
    tabnum = req.body['Табельный номер'];


    console.log(num, name, count, causeOfOff, dateOff, tabnum);
    try {
        let request = new Request("addCertificate", function (err, count, rows) {

            if (err) {
                res.send(JSON.stringify({infoMessage}))
            }
            else {
                let result = rows.map(elem => {
                    return elem.reduce((total, elem) => {
                        total[elem.metadata.colName] = elem.value
                        return total
                    }, {})
                })[0]
                res.send(JSON.stringify(result))
            }
        });

        request.addParameter('num', TYPES.Int, num);
        request.addParameter('name', TYPES.NVarChar, name);
        request.addParameter('count', TYPES.Int, count);
        request.addParameter('causeOfOff', TYPES.NVarChar, causeOfOff);
        request.addParameter('dateOff', TYPES.Date, dateOff);
        request.addParameter('tabnum', TYPES.Int, tabnum);
        connection.callProcedure(request);
    }

    catch (e){
        res.send(JSON.stringify({infoMessage}));
    }

    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.get("/api/getCertificate/:id", function (req, res) {
    const id = req.params.id;
    let request = new Request("SELECT * FROM [Write-off certificates] WHERE [Write-off certificates].[Номер акта] = @num", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('num', TYPES.Int, id);
    connection.execSql(request);
});

app.put("/api/editCertificate", jsonParser, function (req, res) {
    let num, name, count, causeOfOff, dateOff, tabnum;
    num = req.body['Номер акта'];
    name = req.body['Наименование списанного объекта'];
    count = req.body['Количество'];
    causeOfOff = req.body['Причины списания'];
    dateOff = req.body['Дата списания'];
    tabnum = req.body['Табельный номер'];


    console.log(num, name, count, causeOfOff, dateOff, tabnum);

    let request = new Request("UpdateCertificate", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });

    request.addParameter('num', TYPES.Int, num);
    request.addParameter('name', TYPES.NVarChar, name);
    request.addParameter('count', TYPES.Int, count);
    request.addParameter('causeOfOff', TYPES.NVarChar, causeOfOff);
    request.addParameter('dateOff', TYPES.Date, dateOff);
    request.addParameter('tabnum', TYPES.Int, tabnum);
    connection.callProcedure(request);
});

app.delete("/api/getCertificate/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    let request = new Request("DELETE [Write-off certificates] WHERE [Write-off certificates].[Номер акта] = @num", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(id))
    });
    request.addParameter('num', TYPES.Int, id);
    connection.execSql(request);
});


//<==================================== USERS_OF_DENDROPARK ========================================>
app.delete("/api/users/:id", function (req, res) {
    let infoMessage;
    const idFind = req.params.id;
    let request = new Request("DELETE [Users of dendropark] WHERE [Users of dendropark].[ID] = @id", function (err, count, rows) {
        if (err) {
            return console.log(err);
        } else if (infoMessage) {
            res.send(JSON.stringify({infoMessage, idFind}))
        } else {
            res.send(JSON.stringify(idFind))
        }
    });

    request.addParameter('id', TYPES.Int, idFind);
    connection.execSql(request);
    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.get("/api/getUser/:id", function (req, res) {
    const idFind = req.params.id;
    let request = new Request("SELECT * FROM [Users of dendropark] WHERE [Users of dendropark].[ID]= @id", function (err, count, rows) {
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
    let idFind, infoMessage;
    let numBook, tabNum, fio, rank, goalOfUsing;
    idFind = req.body['ID']
    numBook = req.body['Номер поименной книги'];
    tabNum = req.body['Табельный номер'];
    fio = req.body['ФИО'];
    rank = req.body['Должность'];
    goalOfUsing = req.body['Цель использования материалов дендропарка'];
    console.log(numBook, tabNum, fio, rank, goalOfUsing);
    let request = new Request("UpdateUsersOfDendropark", function (err, count, rows) {
        if (err) {
            return console.log(err);
        }
        if (infoMessage) {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            console.log(result);
            res.send(JSON.stringify({infoMessage, result}));
        }
    });
    request.addParameter('id', TYPES.Int, idFind);
    request.addParameter('numBook', TYPES.Int, numBook);
    request.addParameter('tabNum', TYPES.Int, tabNum);
    request.addParameter('fio', TYPES.NVarChar, fio);
    request.addParameter('position', TYPES.NVarChar, rank);
    request.addParameter('goalOfUsing', TYPES.NVarChar, goalOfUsing);
    connection.callProcedure(request);

    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.post("/api/createUser", jsonParser, function (req, res) {
    let infoMessage;
    let numBook, tabNum, fio, rank, goalOfUsing;
    numBook = req.body['Номер поименной книги'];
    tabNum = req.body['Табельный номер'];
    fio = req.body['ФИО'];
    rank = req.body['Должность'];
    goalOfUsing = req.body['Цель использования материалов дендропарка'];

    let request = new Request("addUsers", function (err, count, rows) {
        if (err) {
            return console.error(err);
        }
        if (infoMessage) {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            console.log(result);
            res.send(JSON.stringify({infoMessage, result}));
        }
    });
    request.addParameter('numBook', TYPES.Int, numBook);
    request.addParameter('tabNum', TYPES.Int, tabNum);
    request.addParameter('fio', TYPES.NVarChar, fio);
    request.addParameter('position', TYPES.NVarChar, rank);
    request.addParameter('goalOfUsing', TYPES.NVarChar, goalOfUsing);
    connection.callProcedure(request);

    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

//<==================================== OFFICIALS ========================================>
app.post("/api/createOfficial", jsonParser, function (req, res) {
    let infoMessage;
    let tabNum, fio, rank, respons;
    tabNum = req.body['Табельный номер'];
    fio = req.body['ФИО'];
    rank = req.body['Административная должность'];
    respons = req.body['Должностные обязанности'];
    console.log(tabNum, fio, rank, respons);
    let request = new Request("addOfficials", function (err, count, rows) {
        if (err) {
            return console.error(err);
            //res.send(JSON.stringify(err))
        }
        if (infoMessage) {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            console.log(result);
            res.send(JSON.stringify({result, infoMessage}))
        }
    });
    request.addParameter('tubnum', TYPES.Int, tabNum);
    request.addParameter('fio', TYPES.NVarChar, fio);
    request.addParameter('position', TYPES.NVarChar, rank);
    request.addParameter('workRespons', TYPES.NVarChar, respons);
    connection.callProcedure(request);
    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.delete("/api/officials/:tubnum", function (req, res) {
    let infoMessage
    const idFind = req.params.tubnum;
    let request = new Request("DELETE [Officials] WHERE [Officials].[Табельный номер] = @tubnum", function (err, count, rows) {
        if (err) {
            return console.log(err);
        } else if (infoMessage) {
            res.send(JSON.stringify({idFind, infoMessage}))
        } else {
            res.send(JSON.stringify(idFind))
        }
    });

    request.addParameter('tubnum', TYPES.Int, idFind);
    connection.execSql(request);
    console.log(infoMessage);
    connection.on('infoMessage', function (inf) {
        infoMessage = inf
    })
});

app.get("/api/getOfficial/:tubnum", function (req, res) {
    const tubnum = req.params.tubnum;
    let request = new Request("SELECT * FROM Officials WHERE Officials.[Табельный номер]= @tubnum", function (err, count, rows) {
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
    let request = new Request("updateOfficial", function (err, count, rows) {
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

//<=================THE REGION OF DENDROPARK==============>

app.get('/api/regionOfDendropark', function (req, res) {
    let request = new Request("SELECT * FROM [The region of dendropark]", function (err, count, rows) {
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
        console.log('запрос к таблице [The region of dendropark] завершён')
    });
    connection.execSql(request);
})

app.get("/regionOfDendropark", function (request, response) {
    response.render("regionOfDendropark", {
        title: `Регионы дендропарка`
    })
})


app.post("/api/createRegion", jsonParser, function (req, res) {
    let infoMessage;
    let num, name, location, info;
    num = req.body['Номер региона'];
    name = req.body['Название региона'];
    location = req.body['Положение на схеме'];
    info = req.body['Краткая информация'];
    console.log(num, name, location, info);
    let request = new Request("addRegion", function (err, count, rows) {
        if (err) {
            return console.error(err);
            //res.send(JSON.stringify(err))
        }
        else {
            let result = rows.map(elem => {
                return elem.reduce((total, elem) => {
                    total[elem.metadata.colName] = elem.value
                    return total
                }, {})
            })[0]
            console.log(result);
            res.send(JSON.stringify({result, infoMessage}))
        }
    });
    request.addParameter('num', TYPES.Int, num);
    request.addParameter('name', TYPES.NVarChar, name);
    request.addParameter('location', TYPES.NVarChar, location);
    request.addParameter('info', TYPES.NVarChar, info);
    connection.callProcedure(request);
});

app.put("/api/editRegion", jsonParser, function (req, res) {
    let num, name, location, info;
    num = req.body['Номер региона'];
    name = req.body['Название региона'];
    location = req.body['Положение на схеме'];
    info = req.body['Краткая информация'];
    console.log(num, name, location, info);
    let request = new Request("updateRegion", function (err, count, rows) {
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
    request.addParameter('num', TYPES.Int, num);
    request.addParameter('name', TYPES.NVarChar, name);
    request.addParameter('location', TYPES.NVarChar, location);
    request.addParameter('info', TYPES.NVarChar, info);
    connection.callProcedure(request);
})

app.get("/api/getRegion/:num", function (req, res) {
    const num = req.params.num;
    let request = new Request("SELECT * FROM [The region of dendropark] WHERE [The region of dendropark].[Номер региона] = @num", function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })[0]
        res.send(JSON.stringify(result))
    });
    request.addParameter('num', TYPES.Int, num);
    connection.execSql(request);
});

app.delete("/api/getRegion/:num", function (req, res) {
    const num = req.params.num;
    let request = new Request("DELETE [The region of dendropark] WHERE [The region of dendropark].[Номер региона] = @num", function (err, count, rows) {
        if (err) return console.log(err);
        res.send(JSON.stringify(num))
    });
    request.addParameter('num', TYPES.Int, num);
    connection.execSql(request);
});

//<=======================КУРСОРЫ======================================>
app.get("/cursorCountOfPlants", function (request, response) {
    response.render("cursorCountOfPlants", {
        title: `Количество записей в таблице Растения`
    })
})

app.get("/api/cursorCountOfPlants", jsonParser, function (req, res) {
    getCursApi(req, res, 'cursCountOfPlants')
});

app.get("/cursCountOfCards", function (request, response) {
    response.render("cursCountOfCards", {
        title: `Количество записей в таблице Учетная карточка`
    })
})

app.get("/api/cursCountOfCards", jsonParser, function (req, res) {
    getCursApi(req, res, 'cursCountOfCards')
});

app.get("/cursCountOfChemicalSubs", function (request, response) {
    response.render("cursCountOfChemicalSubs", {
        title: `Количество записей в таблице Химические вещества`
    })
})

app.get("/api/cursCountOfChemicalSubs", jsonParser, function (req, res) {
    getCursApi(req, res, 'cursCountOfChemicalSubs')
});

function getCursApi(req, res, cursor) {
    let request = new Request(cursor, function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        console.log(result)
        res.send(JSON.stringify(result));
    });
    request.on('requestCompleted', function () {
        console.log(`запрос к курсору ${cursor} завершён`)
    });
    connection.execSql(request);
}

app.get("/cursCountOfWriteOffPlants", function (request, response) {
    response.render("cursCountOfWriteOffPlants", {
        title: `Общее количество списанных растений`
    })
})

app.get("/api/cursCountOfWriteOffPlants", jsonParser, function (req, res) {
    getCursApi(req, res, 'cursCountOfWriteOffPlants')
});


app.get("/cursCountOfDeletedUsers", function (request, response) {
    response.render("cursCountOfDeletedUsers", {
        title: `Общее количество удаленных растений`
    })
})

app.get("/api/cursCountOfDeletedUsers", jsonParser, function (req, res) {
    getCursApi(req, res, 'cursCountOfDeletedUsers')
});

//<=======================Хранимые процедуры======================================>
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

app.post("/api/decomissPlants", jsonParser, function (req, res) {
    const params = [
        ['date', TYPES.Date]
    ]
    postPutApi(req, res, 'DecommissPlants', params, true)
});

app.post("/api/listOfStudExcursion", jsonParser, function (req, res) {
    const params = [
        ['numex', TYPES.Int]
    ]
    postPutApi(req, res, 'listOfexOfstud', params, true)
});

app.post("/api/countOfOfficials", jsonParser, function (req, res) {
    const params = [
        ['rank', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'CountOfOfficials', params, true)
});

function postPutApi(req, res, procedure, params, asArr) {
    let result;
    let request = new Request(procedure, function (err, count, rows) {
        if (err) {
            return console.error(err);
        }
        result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        if (!asArr) {
            result = result[0]
        }
        res.send(JSON.stringify(result))
    });
    for (const param of params) {
        request.addParameter(param[0], param[1], req.body[param[0]]);
    }
    connection.callProcedure(request);
    connection.on('infoMessage', function (info) {
        if (!info) {

        } else {
            console.log('info =========================================');
            console.log(info);
        }
    })
}

app.get("/nameOfExProc", function (request, response) {
    response.render("nameOfExProc", {
        title: `Поиск экскурсий по названию`
    })
})

app.post("/api/nameOfExProc", jsonParser, function (req, res) {
    const params = [
        ['nameOfEx', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'nameOfExProc', params, true)
});

app.get("/infSubstanceProc", function (request, response) {
    response.render("infSubstanceProc", {
        title: `Растения, обрабатываемые определенным хим веществом`
    })
})

app.post("/api/infSubstanceProc", jsonParser, function (req, res) {
    const params = [
        ['nameOfSubstance', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'infSubstanceProc', params, true)
});

app.get("/infholdExProc", function (request, response) {
    response.render("infholdExProc", {
        title: `Экскурсии проведенные преподавателем`
    })
})

app.post("/api/infholdExProc", jsonParser, function (req, res) {
    const params = [
        ['fio', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'infholdExProc', params, true)
});


app.get("/positionOnDiagProc", function (request, response) {
    response.render("positionOnDiagProc", {
        title: `Экскурсии`
    })
})

app.post("/api/positionOnDiagProc", jsonParser, function (req, res) {
    const params = [
        ['location', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'positionOnDiagProc', params, true)
});

app.get("/goalOfUsingProc", function (request, response) {
    response.render("goalOfUsingProc", {
        title: `Количетсво пользователей`
    })
})

app.post("/api/goalOfUsingProc", jsonParser, function (req, res) {
    const params = [
        ['goalOfUsing', TYPES.NVarChar]
    ]
    postPutApi(req, res, 'goalOfUsingProc', params, true)
});

// <======================Авторизация=======================>
app.post("/api/authorization", jsonParser, function (req, res) {
    //console.log('asdasdaasdasd')
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


//==========================Представления========================>

function getApi(req, res, representation) {
    let request = new Request(`SELECT * FROM ${representation}`, function (err, count, rows) {
        if (err) return console.log(err);
        let result = rows.map(elem => {
            return elem.reduce((total, elem) => {
                total[elem.metadata.colName] = elem.value
                return total
            }, {})
        })
        console.log(result)
        res.send(JSON.stringify(result));
    });
    request.on('requestCompleted', function () {
        console.log(`запрос к представлению ${representation} завершён`)
    });
    connection.execSql(request);
}

app.get("/api/showTeacher", jsonParser, function (req, res) {
    getApi(req, res, 'showTeacher')
});

app.get("/showTeacher", function (request, response) {
    response.render("teachersRepresent", {
        title: `Количество преподавателей`
    })
})

app.get("/goalOb", function (request, response) {
    response.render("goalOb", {
        title: `Цели использования материалов дендропарка`
    })
})

app.get("/api/goalOb", jsonParser, function (req, res) {
    getApi(req, res, 'infoTarget')
});

app.get("/excursionInEurope", function (request, response) {
    response.render("excursionInEurope", {
        title: `Экскурсии проведенные в регионе "Европа"`
    })
})

app.get("/api/excursionInEurope", jsonParser, function (req, res) {
    getApi(req, res, 'infoAboutRegion')
});

app.get("/infoAboutNameOfExcursion", function (request, response) {
    response.render("infoAboutNameOfExcursion", {
        title: `Экскурсии, название которых “О дендропарке”`
    })
})

app.get("/api/infoAboutNameOfExcursion", jsonParser, function (req, res) {
    getApi(req, res, 'infoAboutNameOfExcursion')
});

app.get("/infoDateLanding", function (request, response) {
    response.render("infoDateLanding", {
        title: `Информация о растении, который было посажено с 2009 до текущего года`
    })
})

app.get("/api/infoDateLanding", jsonParser, function (req, res) {
    getApi(req, res, 'infoDateLanding')
});

app.get("/infAboutSubstance", function (request, response) {
    response.render("infAboutSubstance", {
        title: `Растения, которые обрабатываются химическим веществом “Хорус”`
    })
})

app.get("/api/infAboutSubstance", jsonParser, function (req, res) {
    getApi(req, res, 'infAboutSubstance')
});

app.get("/personWhoSpentExcurs", function (request, response) {
    response.render("personWhoSpentExcurs", {
        title: `Экскурсии, которые провела преподаватель Мажугова Т.В`
    })
})

app.get("/api/personWhoSpentExcurs", jsonParser, function (req, res) {
    getApi(req, res, 'personWhoSpentExcurs')
});

app.get("/infAboutReg", function (request, response) {
    response.render("infAboutReg", {
        title: `Регионы`
    })
})

app.get("/api/infAboutReg", jsonParser, function (req, res) {
    getApi(req, res, 'infAboutReg')
});

app.get("/infoAboutStudents", function (request, response) {
    response.render("infoAboutStudents", {
        title: `Все учащиеся колледжа`
    })
})

app.get("/api/infoAboutStudents", jsonParser, function (req, res) {
    getApi(req, res, 'infoAboutStudents')
});

app.get("/infoAboutReplace", function (request, response) {
    response.render("infoAboutReplace", {
        title: `Замененные растения`
    })
})

app.get("/api/infoAboutReplace", jsonParser, function (req, res) {
    getApi(req, res, 'infoAboutReplace')
});

app.get("/locationofplant", function (request, response) {
    response.render("locationofplant", {
        title: `Полная информация о растениях, которые находятся в регионе “Сибирь и Дальний Восток`
    })
})

app.get("/api/locationofplant", jsonParser, function (req, res) {
    getApi(req, res, 'locationofplant')
});

app.get("/classOfPlants", function (request, response) {
    response.render("classOfPlants", {
        title: `Растения, которые относятся к отделу Голосеменные`
    })
})

app.get("/api/classOfPlants", jsonParser, function (req, res) {
    getApi(req, res, 'classOfPlants')
});

app.get("/fioOfteacher", function (request, response) {
    response.render("fioOfteacher", {
        title: `Работники колледжа, ФИО которыъ начинается на “Ч”`
    })
})

app.get("/api/fioOfteacher", jsonParser, function (req, res) {
    getApi(req, res, 'fioOfteacher')
});

app.get("/positionOnDiagram", function (request, response) {
    response.render("positionOnDiagram", {
        title: `Экскурсии, регион которых на схеме находится на Западе`
    })
})

app.get("/api/positionOnDiagram", jsonParser, function (req, res) {
    getApi(req, res, 'positionOnDiagram')
});

app.get("/fullInfoAboutSubstances", function (request, response) {
    response.render("fullInfoAboutSubstances", {
        title: `Полная информация о химических веществах`
    })
})

app.get("/api/fullInfoAboutSubstances", jsonParser, function (req, res) {
    getApi(req, res, 'fullInfoAboutSubstances')
});

//=====================================>>>>>>>