
require('./config/config');
require('./models/machine');

const hbs = require('hbs');

const moongose = require('mongoose');

const express = require('express');
const app = express ();



app.use(express.urlencoded({ extended: false }));

app.use(express.json());  

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.use(require('./routes/machine'))

moongose.connect('mongodb://localhost:27017/textil', {useNewUrlParser: true}, (err) => {

    if(err){
        console.log(err);
    }else{
        console.log("MongoDB connected");
    }
});


app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto 3000");
});