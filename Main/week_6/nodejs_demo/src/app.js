const express = require('express')
const path = require('path')
var cookieParser = require("cookie-parser")
var session = require("express-session")
const app = express()
const UserController = require('./controllers/user.js') 



app.use(express.json())
app.use(express.urlencoded(({ extended: false })))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(
  session({
    secret: "demoapp",
    name: "app",
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 10000 } /* 6000 ms? 6 seconds -> wut? :S */
  })
);

app.use('/', UserController)


app.listen(3000, function () {
    console.log('Example app listening on port http://127.0.0.1:3000')
})