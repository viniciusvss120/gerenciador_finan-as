const Record = require('../models/Record')
const Account = require('../models/Account')
const Category = require('../models/Category')
const moment = require('moment')

class RecordController{

  async recordList(req,res){
    try {
      // Vamos receber a description do Account e do Category, além da data
      const {account, category, date} = req.body

      if(!account && !category && !date){
        const fullRecord = await Record.findRecord()
        res.status(200)
        res.json(fullRecord)
      }else{
  
        let filter =[ 
          {
            accountDescription: account ? account : null,
            category: category ? category : null,
            date: date ? date : null
          }
      
        ]

        const recordFilter = await Record.findRecord(filter)

        res.status(200)
        res.json(recordFilter)
      }
      
    } catch (error) {
      console.log("Deu ruim!!", error)
    }
  }

  async recordListByDate(req,res){
    try {
      const {date} = req.body

      const newDate = moment(date, 'MM-YYYY')
      const startDate = newDate.startOf('date').toString()
      const endDate = newDate.endOf('date')

      const record = await Record.findRecordByDate({newDate})

      res.json(record)
    } catch (error) {
      console.log(error)
    }
  }

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