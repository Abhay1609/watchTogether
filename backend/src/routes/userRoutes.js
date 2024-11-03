const { Router } = require("express")
const createUser = require("../controllers/userController")
const loginUser = require("../controllers/userController")



const userRouter=Router()

// userRouter.route('/register').post(createUser)
userRouter.post('/register',(req,res)=>createUser(req,res))
userRouter.post('/login',(req,res)=>loginUser(req,res))

module.exports = userRouter