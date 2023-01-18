const Account = require('../models/Account')

class AccountController{

  async findAccount(req, res){
    try {
      const {id, description} = req.body
    
      let account= await Account.findAccount(description, id)

      if(account.length > 0){
        res.status(200)
        res.json(account)
      }else{
        console.log('Conta não encontrada')
      }
    } catch (error) {
      console.log(error)
    }
   
  }

  async createAcconut(req,res){
    const {id,description} = req.body

    // let userId = await Users.findUser()

    let accountExiste = await Account.findAccount(description)

    if(accountExiste.length > 0){

      res.json("Conta já existe!")
    }else{
      await Account.accountCreate({description, user_id: id})
      res.status(200)
      res.json("Conta cadastrada com sucesso!")
    }

  }

}

module.exports = new AccountController()