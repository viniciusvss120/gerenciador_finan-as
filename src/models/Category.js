const database = require('../config/db')

class Category{

  async findCategory(description){
    try {
      const result = await database.select().from('category').where({description})
      return result
    
    } catch (error) {
      console.log(error)
    }
  }

  async findCategoryById(id){
    try {
      const result = await database.select().from('category').where({id})
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }
  
  async categoryCreate(data){
    try {
      const result = await database.insert(data).table('category')
      return result
    } catch (error) {
      console.log('Deu ruim!', error)
    }
    
  }
}

module.exports = new Category()