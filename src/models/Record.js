const { from } = require('../config/db')
const database = require('../config/db')

class Record{

  async findRecord(filter){
    try {
    
      if(!filter) {
        return await database.select().from('record')
      }else{

        let filtro = {}

        //Aqui pegamos as chaves o obj e os colocamos em um array
        const arrayKay = Object.keys(filter[0])

        // Aqui Filtramos os que não tinha o valor null
        const filterKay = arrayKay.filter((index) => filter[0][index] != null)

        // Utilizando um obj vazio, adicionamos de forma dinamica as chaves e valor
        filterKay.forEach(key => {
         // console.log(filtro[key] = filter[0][key])
          return filtro[key] = filter[0][key]
        })

        return await database.select().from('record').where(filtro)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async findRecordByDate(date){
    try {
      const result = await database.select().from('record').where(date)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async recordCreate(record){
    try {
      const insertRecord = await database.insert(record).table('record')
      return insertRecord
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new Record()