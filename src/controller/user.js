const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const {
  userRegister,
  checkEmail
} = require('../model/user')
const fs = require('fs')

module.exports = {

    userRegister: async (request, response) => {
        try {
          let { username, email, password } = request.body
    
          if (username === '' || email === '' || password === '') {
            return helper.response(response, 400, 'Data Cannot Empty')
          } else {
            const checkUser = await checkEmail(email)
            const keys = Math.round(Math.random() * 99978)
    
            if (checkUser.length > 0) {
              return helper.response(response, 400, 'Email has been registered')
            } else {
              const salt = bcrypt.genSaltSync(10)
              const encryptPassword = bcrypt.hashSync(password, salt)
              const setData = {
                username,
                email,
                user_key: keys,
                date: new Date(),
                password: encryptPassword,
              }
              const result = await userRegister(setData)
            
              return helper.response(
                response,
                200,
                'Success Register, Please Check Your Email',
                result
              )
            }
          }
        } catch (error) {
          return helper.response(response, 400, 'Bad Request', error)
        }
      },

      loginUser: async (request, response) => {
        try {
          const { email, password } = request.body
          if (email === '') {
            if (password === '') {
              return helper.response(
                response,
                404,
                'Email and Password Cannot Empty'
              )
            } else {
              return helper.response(response, 400, 'Email Cannot Empty')
            }
          } else if (password === '') {
            return helper.response(response, 400, 'Password Cannot Empty')
          } else {
            const checkDataUser = await checkEmail(email)
    
            if (checkDataUser.length > 0) {
              const checkPassword = bcrypt.compareSync(
                password,
                checkDataUser[0].password
              )
    
              if (checkPassword) {
                const { id, username, email } = checkDataUser[0]
                const payload = { id, username, email }
                const token = jwt.sign(payload, 'privacy', { expiresIn: '3h' })
                const result = { ...payload, token }
                
                return helper.response(
                  response,
                  200,
                  'Success Login ',
                  result
                )
              } else {
                return helper.response(response, 400, 'Wrong Password')
              }
            } else {
              return helper.response(
                response,
                404,
                'Email/Account is not registered'
              )
            }
          }
        } catch (error) {
          return helper.response(response, 400, 'Bad Request', error)
        }
      },
}