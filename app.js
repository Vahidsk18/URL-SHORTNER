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


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication)

//for ejs 
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

//DBconnection
const MONGO_URL = process.env.MONGO_ATLAS;
connectionDB(MONGO_URL)


// routes
app.use('/', staticRoute) // home, landing pages
app.use('/url', urlRoute) // url shortener
app.use('/user', userRoute) // user routes


const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`);
})