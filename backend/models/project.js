'use strict'

var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var ProjectSchema=Schema({
    name:String,
    descripcion:String,
    categoria:String,
    lenguajes:String,
    img: String
});

module.exports=mongoose.model('Project',ProjectSchema);