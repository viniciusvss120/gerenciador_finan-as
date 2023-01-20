const database = require('../config/db')

class Record{

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