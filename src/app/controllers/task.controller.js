const mongoose = require("mongoose")
const Task = require("../models/task.model")
const Account = require("../models/account.model")
const Village = require("../models/village.model")
const jwt = require("jsonwebtoken")

exports.findAll = function(req, res, next){
    var token = req.header("Authorization")
    token = token.substr(7)
    var decode = jwt.verify(token, "krystal")
    Account.findById(decode.id)
        .then(function(account){
            //console.log(account.username)
            Task.find({id_account: account._id})
                .then(function(entity){
                    res.json(entity)
                })
                .catch(function(err){
                    console.log(err)
                })
        })
        .catch(next)
    // Task.find({})
    //     .then(function(task){
    //         res.json(task)
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })
    
}

exports.findOne = function(req, res, next){
    Task.findOne({_id: req.params.id})
        .then(function(entity){
            res.json(entity)
        })
        .catch(function(err){
            console.log(err)
        })
}

exports.create = function(req, res, next){
    var token = req.header("Authorization")
    token = token.substr(7)
    var decode = jwt.verify(token, "krystal")
    Account.findById(decode.id)
        .then(function(account){
            Task.create({name: req.body.name, id_account: account._id})
                .then(function(entity){
                    res.json(entity)
                })
                .catch(function(err){
                    console.log(err)
                })
        })
        .catch(next)
    
}

exports.update = function(req, res, next){
    var token = req.header("Authorization")
    token = token.substr(7)
    var decode = jwt.verify(token, "krystal")
    Account.findById(decode.id)
        .then(function(account){
            Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
                .then(function(entity){
                    console.log("update task")
                    res.json(entity)
                })
                .catch(function(err){
                    console.log(err)
                })
        })
        .catch(next)
    
}

exports.deleteOne = function(req, res, next){
    var token = req.header("Authorization")
    token = token.substr(7)
    var decode = jwt.verify(token, "krystal")
    Account.findById(decode.id)
        .then(function(account){
            Task.findOneAndDelete({_id: req.params.id})
                .then(function(entity){
                    console.log("delete task")
                    res.json(entity)
                })
                .catch(function(err){
                    console.log(err)
                })
        })
        .catch(next)
    
}

exports.action = function(req, res, next){
    var token = req.header("Authorization")
    token = token.substr(7)
    var decode = jwt.verify(token, "krystal")
    Account.findById(decode.id)
        .then(function(account){
            var ids = req.params.id.split("&")
            Task.deleteMany({_id: {$in: ids}})
                .then(function(){
                    console.log("delete many task")
                    res.json({message: "delete many task"})
                })
                .catch(function(err){
                    console.log(err)
                })
        })
        .catch(next)
    
}

exports.findTest = function(req, res, next){
    Village.find({})
        .then(function(Villages){
            res.json(Villages)
        })
        .catch(function(err){
            console.log(err)
        })
    
}