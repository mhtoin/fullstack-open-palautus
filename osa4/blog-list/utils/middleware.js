const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.info('Catching error', error.name)
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError' || error.name === 'MongoServerError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  console.log('extracting token')
  let authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    console.log(authorization)
    authorization = authorization.replace('Bearer ', '')
    request.token = authorization
    console.log('placed token in request', request.token)
  }

  next()
}

const userExtractor = (request, response, next) => {
  // code that extracts the token
  console.log('extracting user', request.token)
  try {
    const decodedToken = jwt.verify(request.token, config.JWT_SECRET)
    if (decodedToken.id) {
      request.user = decodedToken.id
    }
  } catch (e) {
    console.log('an error has occurred', e.name)
    next(e)
  }



  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}