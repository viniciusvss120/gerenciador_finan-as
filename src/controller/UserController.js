const Users = require('../models/User')
const { use } = require('../router/routes')

class UserControler{
  async findUser(req, res){
    try {
      await Users.findAll()
      res.send("Conenctado")
    } catch (error) {
      res.send("Deu ruim", error)
    }

  }
}


module.exports = new UserControler()