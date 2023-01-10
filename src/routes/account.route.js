const express = require("express")
const accounts = require("../app/controllers/account.controller")

module.exports = function(app){
    const router = express.Router()
    router.post("/register", accounts.register)
    router.post("/login", accounts.login)
    app.use("/account", router)
};