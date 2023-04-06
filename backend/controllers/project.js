'use strict'
var Project=require('../models/project');
var fs = require('fs'); //libreria para borrrar un archivo, para la img
var path= require('path');

var controller={
    
    home:function(req,res){
        return res.status(200).send({
           message:'home' 
        });
    },
    test: function(req,res){
        return res.status(200).send({
            message:"test"
        });
    },
    saveProject:function(req,res){
        var project=new Project();
        
        var params=req.body;
        
        project.name=params.name;
        project.descripcion=params.descripcion;
        project.categoria=params.categoria;
        project.lenguajes=params.lenguajes;
        project.img=null;

        project.save((err, projectStored)=>{
            if(err) return res.status(500).send({
                message:'error al guardar'
            });
            if(!projectStored) return res.status(404).send({
                message:'no se a podido guardar el projecto'
            });

            return res.status(200).send({
                project:projectStored
            });
        });

    },

    getProject: function(req, res){
        var projectId= req.params.id;

        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({
                message:'Error al listar'
            });
            if(!project) return res.status(404).send({
                message:'El proyecto no existe'
            });

            return res.status(200).send({
                project
            });

        });

    },

    getProjects:function(req,res){
        //Project.find({}).sort('lenguajes').exec ordenado
        Project.find({}).exec((err,project)=>{

            if(err) return res.status(500).send({
                message:'error al listar datos'
            });
            if(!project) return res.status(404).send({
                message:'no hay projectos que mostrar'
            });
            return res.status(200).send({
                project
            });
        });


    },
    updateProjects:function(req,res){
        var projectId= req.params.id;
        var update=req.body;

        Project.findByIdAndUpdate(projectId, update, (err, projectUpdated)=>{
            if(err) return res.status(500).send({
                message:'Error al actualizar'
            });

            if(!Project) return res.status(404).send({
                message:'No existe el projecto'
            });

            return res.status(200).send({
                Project: projectUpdated
            });
        });

    },
    deleteProjects:function(req,res){
        var projectId=req.params.id;

        Project.findByIdAndRemove(projectId,(err,projectRemoved)=>{

            if(err) return res.status(500).send({
                message:'error al eliminar'
            });

            if(!projectRemoved) return res.status(404).send({
                message:'no existe projecto'
            });

            return res.status(200).send({
                Project: projectRemoved
            });

        });

    },
    uploadImage: function(req,res){
        var idProject= req.params.id;
        var fileName='sin imagen';

        if(req.files){
            var filePath=req.files.img.path;
            var fileSplit = filePath.split('\\');
            var fileName=fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt= extSplit[1];

            if(fileExt == 'png' || fileExt=='jpg' || fileExt=='jpeg'){ 

                Project.findByIdAndUpdate(idProject, {img:fileName},{new: true}, (err,projectUpdated)=>{

                    if(err) return res.status(500).send({
                        message:'La imagen no se ha subido'
                    })

                    if(!projectUpdated) return res.status(404).send({
                        message:'El proyecto no existe'
                    })

                    return res.status(200).send({
                        files: projectUpdated
                    });

                });

            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({
                        message:'La extension no es valida'
                    });
                });
            }

           

        }else{
            return res.status(200).send({
                message:fileName
            });
        }


    },
    getImageFile:function(req,res){
        var file=req.params.img;        
        var path_file= './uploads/'+file; 

        fs.exists(path_file, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message:'No existe la imagen'
                });
            }
        })

    }
};

module.exports=controller;