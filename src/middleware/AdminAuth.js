const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

class AdminAuth{
  decoded(req,res,next){
    const authToken = req.headers['authorization']

    if(authToken != undefined) {
      const bearer = authToken.split(' ')
      let token = bearer[1]

      jwt.verify(token,secret,(err, data) => {
        if(err){
          res.json('Token invalido!')
        }else{
          res.status(200)
          next()
        }
      })
    }else{
      res.status(401)
      res.json({err: "falha Token Invalido!!"})
    }
  }
}

module.exports = new AdminAuth()

