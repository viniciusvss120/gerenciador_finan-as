const database = require('../config/db')

class Account{

  async findAll(){
    try {
      const result = await database.select().from('account')
      return result
    } catch (error) {
      console.log('Deu ruim!', error)
    }
  }

  async findAccount(description, id){
    try {
      if(description != undefined){
        const result = await database.select().from('account').where({ description })
        return result
      }else{
        const result = await database.select().from('account').where({ user_id: id  })
        return result
      }
  
    } catch (error) {
      console.log('Deu ruim!', error)
    }
  }

  async findAccountById(id){
    try {
      const accountId = await database.select().from('account').where({id})
      console.log(accountId)
      return accountId[0]
    } catch (error) {
      console.log(error)
    }
  }

  async accountCreate(account){
    try {
      const accountUser = await database.insert(account).table('account')
      return accountUser
    } catch (error) {
      console.log('Conta não cadastrada', error)
    }

  }
}

module.exports = new Account()