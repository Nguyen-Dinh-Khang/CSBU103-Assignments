const express = require('express')
const { UserModel } = require('../models')
const { uuid } = require('uuidv4')
var debug = require("debug")("index.js");


// var bodyParser = require('body-parser')
// const jsonParser = bodyParser.json()

const checkLoggedIn = function(req, res, next) {
  if (req.session.loggedIn) {
    debug(
      "checkLoggedIn(), req.session.loggedIn:",
      req.session.loggedIn,
      "executing next()"
    );
    next();
  } else {
    debug(
      "checkLoggedIn(), req.session.loggedIn:",
      req.session.loggedIn,
      "rendering login"
    );
    res.redirect("login");
  }
}


const router = express.Router()


router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now().toString())
    next()
})

// PATH: URL/users/
// router.get('/', async function(req, res) {
//     const rs = await UserModel.getAllUsers()
//     console.log(rs)
//     res.send(rs)
// })

router.get('/', checkLoggedIn, async function (req, res) {
  // res.sendFile(path.join(__dirname,'index.html'))
  const allUsers = await UserModel.getAllUsers() 
  console.log(allUsers)
  res.render('index', { data: allUsers || [] })

})
// users/:username
// router.get('/:username', async function(req, res) {
//     // const { username } = req.params
//     const username = req.params.username 
//     const rs = await UserModel.findUserByUsername(username)
//     console.log(rs)
//     res.send(rs)
// })
router.post('/', async function(req, res) {
    const { username, name, gender } = req.body 
    const newUser = {
        id: uuid(),
        username: username,
        name: name,
        gender: gender
    }
    try {
        await UserModel.insertUser(newUser)
        res.send({ status: true , data: newUser})
    }
    catch(error) {
        console.log(error)
        res.send({
            status: false,
            msg: 'Unable to insert new user',
            error
        })
    }
    
})

router.get('/create', (req,res) => {
    console.log("Đã truy cập GET /users/create. Đang cố gắng render...")
    res.render('signup')
})

router.post('/create', async function(req, res) {
    const { username, password } = req.body 
    console.log(req.body)

    
    try {
        // Check input
        const existed_name = await UserModel.findUserByUsername(username)
        if (existed_name){
            return res.json({ err: 'User is existed!' })
        } 

        // Create new user
        const newUser = {
        username: username,
        password: password
        }

        await UserModel.insertUser(newUser)
        return res.json({ message: 'Sign up succesfully' })
    }
    catch(error) {
        console.log(error)
        return res.json({ err: 'Server error, please try again!' })
    }
    
})

router.delete('/:userId', async function(req, res) {
    const { userId } = req.params 
    await UserModel.delUser(userId)
    res.send({ status: true })
})

router.put('/:userId', async function (req, res) {
    const { userId } = req.params
    try {
        if(!userId) res.status(404)
        const { username, name, gender } = req.body
        console.log(req.body)
        await UserModel.updateUser({
            username, name, gender
        }, userId)
        res.send({
            status: true,
            data: {
                username, name, gender
            }
        })
    }
    catch(err) {
        console.log(err)
        res.send({
            status: false, 
            msg: 'Unable to update user',
            error: err
        })
    }
})

router.post('/login', async function(req, res) {
//   console.log('----------------------------------------------------Có chạy----------------------------------------------------')  
  const { username, password } = req.body     
    try {
        // console.log(username, password)
        const user = await UserModel.findUserByUsername(username)
        // FAIL-FAST 
        console.log({ user });
        
        // console.log(user.username, username, user.password, password)
        if(!user || user.username !== username || user.password !== password) throw new Error('Unauthorized access')
        req.session.loggedIn = true
        res.redirect('/')
    }
    catch(error) {
      console.error(error)
      res.render('login', { error: error.message })
    }
})

router.get('/login', function(req, res) {
  if(req.session.loggedIn) res.redirect('/')
  res.render('login')
})



module.exports = router

