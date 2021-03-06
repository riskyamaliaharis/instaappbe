const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization

    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'privacy', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(response, 400, error.message)
        } else {
          request.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },

  authorizationforAdmin: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'privacy', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(response, 400, error.message)
        } else {
          
            request.decodeToken = result
            next()
          
        }
      })
    } else {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}