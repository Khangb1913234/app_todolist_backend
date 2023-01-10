const express = require("express")
const path = require("path")
const cors = require('cors')
//const methodOverride = require('method-override')
const app = express()
const PORT = 5000 || process.env.PORT
const setupTaskRoutes = require("./src/routes/task.route")
const setupAccountRoutes = require("./src/routes/account.route")
const db = require("./src/config/db")

db.connect()

app.set("views", path.join(__dirname, "resources/views"))

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
//app.use(express.static(path.join(__dirname, "public")))
//app.use(methodOverride('_method'))

setupTaskRoutes(app)
setupAccountRoutes(app)

app.listen(PORT, function(){
    console.log(`Runing at: http://localhost:${PORT}`)
})
