const express = require('express')
const router = express.Router()
const UserControler = require('../controller/UserController')
const AccountController = require('../controller/AccountController')
const CategoryController = require('../controller/CategoryController')
const RecordController = require('../controller/RecordController')
const AdminAuth = require('../middleware/AdminAuth')


router.get("/", (req,res) => {
  res.send("iniciando o projeto")
})

router.post("/login", UserControler.login)

router.get("/test", UserControler.findUser)
router.post("/createuser",AdminAuth.decoded, UserControler.createUser)

router.get("/accounts", AccountController.findAccount)
router.post("/accountcreate", AccountController.createAcconut)

router.post("/categorycreate", CategoryController.createCategory)

router.post("/recordcreate", RecordController.createRecord)


module.exports = router