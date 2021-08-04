const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const routesNavigation = require('./src/routesNavigation')

const app = express()
app.use(morgan('dev'))
app.use('/api/uploadfile', express.static('uploads'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.options('*', cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})



app.use('/api', routesNavigation)

app.get('*', (request, response) => {
  response.status(404).send('Path not found !')
})

app.listen(process.env.port, () => {
  console.log('Express app is listening on port 3002')
})