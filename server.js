const http = require('http')
const app = require('./app')
const sequelize = require('./utils/database')
// require('events').EventEmitter.defaultMaxListeners = 25
const AssociationModel = require('./models/associationModel')

const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const port = normalizePort(process.env.PORT)

try {
  sequelize.authenticate()
  console.log('Connecté à la base de données MySQL!')
} catch (error) {
  console.error('Non connecté à la base de données MySQL.', error)
}

app.set('port', port)

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

AssociationModel.sync()

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

sequelize.sync({force : true})
.then(() => {
  server.listen(port)
})
.catch((error) => console.log(error))