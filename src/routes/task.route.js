const express = require("express")
const tasks = require("../app/controllers/task.controller")

module.exports = function(app){
    const router = express.Router()
    router.get("/task", tasks.findAll)
    router.get("/task/:id", tasks.findOne)
    router.post("/create", tasks.create)
    router.put("/update/:id", tasks.update)
    router.delete("/delete/:id", tasks.deleteOne)
    router.delete("/action/delete/:id", tasks.action)
    router.get("/village", tasks.findTest)
    app.use("/entity", router)
};