require('dotenv').config()
import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
require('dotenv').config()
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import os from 'os'
import cors from 'cors'
import bcrypt from 'bcrypt'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'

import userRouter from './routes/users'
import adminOrder from './routes/adminroute/order'
import customer from './routes/customerroute/customer'
import { nextTick } from 'process'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

//middlewares
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


//routes
app.use('/users', userRouter)
app.use('/admin', adminOrder)
app.use('/customer', customer)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
