const database = require('../config/db')

class Users {

  async findAll(){
    try {
      let result = await database.select().table('users')
      return result
    } catch (error) {
        console.log("Deu ruim!!", error)
        return []
    }
  }

}

module.exports = new Users()