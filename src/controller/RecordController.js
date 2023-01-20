const Record = require('../models/Record')
const Account = require('../models/Account')
const Category = require('../models/Category')
const moment = require('moment')

class RecordController{

  async createRecord(req,res){
    // O account e o category são os Id dos mesmos, vamos usalos para buscar no banco oa respectivas descrições
    try {
      // O id pertence ao usuario
      const {id, account,category, amount, type, date, description, tags, note} = req.body
      const dateMoment = moment(date)

      if(!dateMoment.isValid()){
        throw new Error("invalid date!")
      }

      const findAccount = await Account.findAccountById(account)
      const findCategory = await Category.findCategoryById(category)

     
      if(findAccount && findCategory === undefined){
        res.json("Conta ou categoria não encontrada!")
      }else{
        const record = {
          user_id: id,
          accountDescription: findAccount.description,
          category: findCategory.description,
          amount,
          type,
          date,
          description,
          tags,
          note
        }

        await Record.recordCreate(record)

        res.status(200)
        res.json("Record cadastrado com sucesso!!")
        
      }

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = new RecordController()