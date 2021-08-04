const router = require('express').Router()

const user = require('./route/user')

router.use('/user', user)

module.exports = router