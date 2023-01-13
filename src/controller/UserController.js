const Users = require('../models/User')
const { use } = require('../router/routes')

class UserControler{
  async findUser(req, res){
    try {
      await Users.findAll()
      res.send("Conenctado")
    } catch (error) {
      res.send("Deu ruim")
    }

  }
}


module.exports = new UserControler()