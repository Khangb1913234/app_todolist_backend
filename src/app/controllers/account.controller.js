const mongoose = require("mongoose")
const Account = require("../models/account.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = function(req, res, next){ 
    const account = new Account(
        {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
        }
    )
    const name = req.body.username
    Account.findOne({username: name})
        .then(function(acc){
            if(acc){
                res.json({msg: "Fail"})
            }
            else{
                account.save()
                    .then(function(){
                        res.json({msg: "Success"})
                    })
                    .catch(next)  
            }
                                   
        })
        .catch(function(err){
            console.log(err)
        })
    
}
exports.login = function(req, res, next){
    Account.findOne({username: req.body.username})
        .then(function(account){
            if(account){
                const check = bcrypt.compareSync(req.body.password, account.password)
                if(check){
                    var token = jwt.sign({id: account._id}, "krystal", {expiresIn: 3600})
                    res.json({account: account, token: token})
                }
                else
                    res.json({msg: "Fail Password"})
            }
            else    
                res.json({msg: "Fail Username"})
        })
        .catch(function(err){
            console.log(err)
        })
}
