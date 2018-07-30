const server = require('./config/server')
require('./config/database')
require('./config/routes')(server) //Precisa passar o server como parâmetro