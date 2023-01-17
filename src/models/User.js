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

  async findUser(email){
    try {

      let result = await database.select().from('users').where({email})
      
      if(result.length > 0){
        return result[0]
      }else{
          return undefined
      }
      
    } catch (error) {
      console.log('Deu ruim!', error)
    }
  }

   async userCreate(user){
    try {
      let result = await database.insert(user).table('users')
      return result
    } catch (error) {
      console.log('Deu ruim', error)
      return []
    }
   }

}

module.exports = new Users()