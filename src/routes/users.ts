import express, { Request, Response, NextFunction, response } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
require('dotenv').config()
import path from 'path'
const jwt = require('jsonwebtoken')
import joi from 'joi'
import { Person } from '../typings'
import { readFileSync, writeFileSync} from 'fs'
import _ from 'lodash'
const router = express.Router()

let pathRoute = path.join(__dirname, '../../database.json')
let result = readFileSync(pathRoute, { encoding: 'utf-8' })
let readData = JSON.parse(result)


//post route for customer
router.post('/register/customer', async (req: Request, res: Response, next: NextFunction) => {
  let { error } = validateRegisterUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

  let user = readData.find((p: Person) => p.userEmail === req.body.userEmail)
  if (user) return res.status(400).json('User already registered')
  
  let { id, username, userEmail, userPhone, userAddress, userPassword1, userPassword2, idType } = req.body
 if (userPassword1 !== userPassword2) return res.json('password mistmatch')
  try {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(userPassword1, salt)
  
      user = { id: uuidv4(), username, userEmail, userPhone, userAddress, userPassword1: hashPassword, idType: process.env.DRIVER }
      readData.push(user)
      
      updateDataBase(readData)
      let response = _.pick(user, ['id', 'username', 'userEmail', 'userPhone', 'userAddress', 'idType'])
      res.status(201).json(response)
    
    } catch (e) {
      console.log(e)
    }
})

router.post('/register/driver', async (req: Request, res: Response, next: NextFunction) => {
let { error } = validateRegisterUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

  let user = readData.find((p: Person) => p.userEmail === req.body.userEmail)
  if (user) return res.status(400).json('User already registered')
  
  let { id, username, userEmail, userPhone, userAddress, userPassword1, userPassword2, idType } = req.body
 if (userPassword1 !== userPassword2) return res.json('password mistmatch')
  try {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(userPassword1, salt)
  
      user = { id: uuidv4(), username, userEmail, userPhone, userAddress, userPassword1: hashPassword, idType: process.env.DRIVER }
      readData.push(user)
      
      updateDataBase(readData)
      let response = _.pick(user, ['id', 'username', 'userEmail', 'userPhone', 'userAddress', 'idType'])
      res.status(201).json(response)
    
    } catch (e) {
      console.log(e)
    }
})

router.post('/login', async (req:Request,  res: Response) => {
  const { error } = validateUserLogin(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  let { userEmail, userPassword } = req.body
  
   if ((userEmail === process.env.EMAIL && userPassword === process.env.PASSWORD)) {
    let payload = {userEmail}
    let token = generateAccessToken(payload)
   return res.json({ userEmail, accesstoken: token })
   } else {
  let user = readData.find((u: Person) => u.userEmail === req.body.userEmail)
  if (!user) return res.status(400).json('Invalid email address or password')

  const validPassword = await bcrypt.compare(req.body.userPassword, user.userPassword1)
  if (!validPassword) return res.status(400).json('Invalid email address or password')
  
  let { id } = user
  user['user_type'] = 30
let payload = { id }
let token = generateAccessToken(payload)
let response = _.pick(user, ["id", "username", "userEmail", "userAddress", "userPhone", "user_type"])

console.log(response)
return res.json({ response, accesstoken: token })
  }
})

//user model
function validateRegisterUser(user: Person) {
  const schema = joi.object({
    username: joi.string().min(3).max(50).required(),
    userEmail: joi.string().email().required(),
    userPhone: joi.string().min(5).max(11).required(),
    userAddress: joi.string().min(3).max(200).required(),
    userPassword1: joi.string().min(5).max(250).required(),
    userPassword2: joi.string().min(5).max(250).required(),
  })
  return schema.validate(user)
}

function validateUserLogin(user: Person) {
  const schema = joi.object({
    userEmail: joi.string().min(5).max(40).email().required(),
    userPassword: joi.string().min(5).max(200).required(),
  })
  return schema.validate(user)
}

//update database
function updateDataBase(data: any) {
  writeFileSync(pathRoute, JSON.stringify(data, null, 4), {
    encoding: 'utf-8',
  })
}

//generate Auth token
  function generateAccessToken(userObj: Object) {
    return jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn: '24h' })
  }

  export default router