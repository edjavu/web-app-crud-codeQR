
const express = require('express');
const app = express();

const QR = require("qrcode");

const Machine = require('../models/machine')

// Pagina principal donde se añaden las maquinas
app.get('', function(req, res){
    
    res.render('index');

});

// Pagina para ver el listado de maquinas registradas
app.get('/machines', function(req, res){

    Machine.find((err, docs) => {
        if(!err){
            res.render('machine', {
                list: docs
            });
        }else{
            console.log("Error:" + err);
        }
    });

});

// Pagina para ver las caracteristicas de una maquina especifica
app.get('/machine/:id', function(req, res){

    let onlyMachine = req.params.id;

    Machine.findById(onlyMachine, function(err, docs){

        if(!err){
            res.render('onlyMachine', { 
                machine: docs
            })
        }else{
            console.log("Error" + err)
        }

    });

});

// Actualiza caracteristicas de la maquina 
app.post('/setup-machine/:id', function(req, res){

    let id = req.params.id; //Devuelve el id

    let descripcion = req.body.descripcion; //Devuelve el campo del descripcion del input


    Machine.findByIdAndUpdate(id, { descripcion: descripcion}, (err, doc) => {

        if(!err){
            res.send("Actualizado en la BD")
        }else{
            console.log("Error" + err)
        }

    })

});


// Funcion para crear codigo QR
function createQR(filename, id_machine){
    const url = "http://192.168.1.3:3000/machine/" + id_machine;
    return QR.toFile("codesQr/" + filename + ".png", url, {width:500});
}


// Crea y añade una maquina con codigo QR 
app.post('/add-machine', function(req, res){
    
    let { nombre, descripcion } = req.body;

    let nuevaMaquina = new Machine({nombre, descripcion});
    nuevaMaquina.save()
                .then(item => {
                    createQR(nombre, item.id);
                    res.send("Guardado en la database");
                })
                .catch(err => {
                    res.status(400).send("Error", err);
                })

});



module.exports = app;