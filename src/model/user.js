const connection = require('../config/mysql')
module.exports = {
    userRegister: (setData) => {
        return new Promise((resolve, reject) => {
          connection.query('INSERT INTO user SET ?', setData, (error, result) => {
            if (!error) {
              const newResult = {
                id: result.insertId,
                ...setData
              }
              delete newResult.password
              resolve(newResult)
            } else {
              reject(new Error(error))
            }
          })
        })
      },
      checkEmail: (email) => {
        return new Promise((resolve, reject) => {
          connection.query(
            'SELECT id, username, email, password, view_name FROM user WHERE email = ?',
            email,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        })
      },
      checkMyData: (username) => {
        return new Promise((resolve, reject) => {
          connection.query(
            'SELECT id, username, email, password, view_name FROM user WHERE username = ?',
            username,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        })
      },
}