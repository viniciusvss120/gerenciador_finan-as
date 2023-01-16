const Users = require('../models/User')
const { use } = require('../router/routes')

class UserControler{

  async login(req,res){}

  async findUser(req, res){
    try {
      await Users.findAll()
      res.send("Conenctado")
    } catch (error) {
      res.send("Deu ruim", error)
    }
  }

  async createUser(req,res){}
}


module.exports = new UserControler()