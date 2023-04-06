'use strict'

var mongoose = require('mongoose');
var app=require('./app');
var port=3100;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Portafolio')
        .then(()=>{
            console.log("conexion a bd establecida");

            //crear servidor
            app.listen(port, ()=>{
                console.log("servidor listo");
            });

        })
        .catch(err=>
            console.log(err));  