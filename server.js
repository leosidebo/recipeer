// if (process.env.NODE_ENV != 'production') {
//     require('dotenv').config()
// }

require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000

const indexRouter = require('./routes/index')
const chefRouter = require('./routes/chefs')
const roleRouter = require('./routes/roles')
const shiftRouter = require('./routes/shifts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())

app.use('/', indexRouter)
app.use('/chefs', chefRouter)
app.use('/roles', roleRouter)
app.use('/shifts', shiftRouter)

connect().then(() => {
    const db = mongoose.connection
    db.on('error', error => console.log(error))
    db.once('open', () => console.log('Connected to Mongoose')) 
    app.listen(PORT, () => {
      console.log('Listening on port: ' + PORT);
    });
  });

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then((res, err) => {
            if(err) return reject(err)
            resolve()
        })
    })
}

function disconnect() {
    return mongoose.disconnect()
}

app.listen(4000)

module.exports = { connect, disconnect }
