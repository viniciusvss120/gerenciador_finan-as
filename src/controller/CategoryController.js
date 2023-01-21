const Category = require('../models/Category')

class CategoryController{

  async createCategory(req,res){
    try {
      // O Id corresponde ai usuario
      const {id,description,operation} = req.body 
      
      const categoryExiste = await Category.findCategory(description)

      if(categoryExiste.length > 0){
        res.json('Category ja existe!')
      }else{
        await Category.categoryCreate({user_id: id, description, operation})

        res.status(200)
        res.json('Category cadastrada com sucesso!')
      }
    } catch (error) {
      console.log("falha ao criar category", error)
    }
    
  }
}

module.exports = new CategoryController()