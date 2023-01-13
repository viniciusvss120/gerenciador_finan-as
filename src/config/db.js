var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '93062435vss',
    database : 'financas'
  }
})

module.exports = knex