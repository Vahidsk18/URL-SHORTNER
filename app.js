require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { connectionDB } = require('./connection')

const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')
const staticRoute = require('./routes/staticRouter')
const { checkForAuthentication } = require('./middleware/auth')

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(checkForAuthentication)

// ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.set('views', path.join(__dirname, 'views'))


// DB
connectionDB(process.env.MONGO_ATLAS)

// routes
app.use('/', staticRoute)
app.use('/url', urlRoute)
app.use('/user', userRoute)

let PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`running,${PORT}`);
})