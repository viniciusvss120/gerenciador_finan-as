const Users = require('../models/User')
// const { use } = require('../router/routes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwt_secret = process.env.JWT_SECRET

class UserControler{

  async login(req,res){
    try {
      const {email, password} = req.body

      let user = await Users.findUser(email)

      if(user) {
        let result = await bcrypt.compare(password, user.password)
        if(result){
          const token = jwt.sign({id: user.id, email: user.email, password: user.password}, jwt_secret, {expiresIn: '2h'})

          res.status(200)
          res.json(token)
        }
      }

    } catch (error) {
      res.status(404)
      res.json("Deu ruim", error)
    }
    
  }

  async findUser(req, res){
    try {
      await Users.findAll()
      res.send("Conenctado")
    } catch (error) {
      res.send("Deu ruim", error)
    }
  }

  async createUser(req,res){
    try {
      const {email, password, name} = req.body

      const senha = await bcrypt.hash(password, 10)

      const user = {
        name,
        email,
        password: senha
      }

      await Users.userCreate(user)

      res.status(200)
      res.json('Usuario cadastrado!')
    } catch (error) {
      console.log(error)
    }
  }

}


module.exports = new UserControler()