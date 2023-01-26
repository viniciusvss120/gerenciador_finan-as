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
      const {startDate, endDate} = req.body

      const record = await Record.findRecord()
      if(record != undefined){
        // const filterArray = record.filter(index => index.user_id === id)

        const data = record.map(index => {
          let newDate = moment(index.date).format('DD/MM/YYYY')
          index.date = newDate
          return index
        }) 

        let filterDate  = data.filter(index => index.date >= startDate && index.date <= endDate)
        res.json(filterDate)
      }

    } catch (error) {
      console.log(error)
    }
  }

  async totalBalance(req, res){
    try {
      const {id, startDate, endDate} = req.body

      const total = await Record.balanceTotal(id)

      
      if(total != undefined){

        const data = total.map(index => {
          let newDate = moment(index.date).format('DD/MM/YYYY')
          index.date = newDate
          return index
        }) 

        if(startDate != undefined && endDate != undefined){
          const newBalance = data.filter(index => index.date >= startDate && index.date <= endDate )
          // console.log(newBalance)

          let saldo = 0

          newBalance.forEach(valor => {  
            saldo += Number(valor.amount)
            return saldo 
          })

          res.status(200)
          res.json(saldo)
        }else{
          let saldo = 0

          data.forEach(valor => {  
            saldo += Number(valor.amount)
            return saldo 
          })
  
          res.status(200)
          res.json(saldo)
        }

      }else{
        res.status(404)
        res.json("Deu ruim")
      }
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

      const newDate = moment(date).format('YYYY-MM-DD')

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
          date: newDate,
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