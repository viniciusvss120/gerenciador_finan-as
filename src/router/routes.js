const express = require('express')
const router = express.Router()
const AccountController = require('../controller/AccountController')
const UserControler = require('../controller/UserController')
const AdminAuth = require('../middleware/AdminAuth')


router.get("/", (req,res) => {
  res.send("iniciando o projeto")
})

router.post("/login", UserControler.login)

router.get("/test", UserControler.findUser)
router.post("/createUser",AdminAuth.decoded, UserControler.createUser)

router.get("/accounts", AccountController.findAccount)
router.post("/accountCreate", AccountController.createAcconut)


module.exports = router