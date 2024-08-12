require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Authentication  = require('./middleware/Authentication.js')


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true }))
app.use(cors({ origin: "http://localhost:3000", credentials:true}))

// app.use(Authentication)


app.use('/users', require('./controllers/users.js'))
app.use('/assetInfo', require('./controllers/assetInfo.js'))


app.get('/', (req, res)=>{
    res.send('Time to make monies 2024')
})
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on Port: ${process.env.PORT}` )
})