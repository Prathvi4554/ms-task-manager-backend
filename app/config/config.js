const dotenv = require('dotenv')

dotenv.config()
process.env.NODE_ENV = 'development'
if(process.env.NODE_ENV) dotenv.config({path:  `env/${process.env.NODE_ENV}.env`})

function loadConfig() {
  this.port = process.env.PORT
  this.nodeEnv = process.env.NODE_ENV
  this.clientAddress = process.env.CLIENT_ADDRESS
  this.dbHost = process.env.DB_HOST
  this.dbName = process.env.DB_NAME
  this.dbUserName = process.env.DB_USER_NAME
  this.dbPassword = process.env.DB_PASSWORD
  this.connectionString = process.env.CONNECTION_STRING
  this.jwtSecretKey = process.env.JWT_SECRET_KEY
  this.jwtExpiresIn = process.env.JWT_EXPIRES_IN
  
  return this
}

module.exports = loadConfig()