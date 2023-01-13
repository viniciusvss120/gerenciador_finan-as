const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./src/router/routes')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use("/",router)

app.listen(3000, () =>{
  console.log("Servidor rodando na porta http://localhost:3000")
})