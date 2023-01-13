const express = require('express')
const router = express.Router()
const UserControler = require('../controller/UserController')
// const AdminAuth = require('../middleware/AdminAuth')

router.get("/", (req,res) => {
  res.send("iniciando o projeto")
})

router.get("/test", UserControler.findUser)


module.exports = router