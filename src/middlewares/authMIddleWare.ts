import express, { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')

require('dotenv').config()



export function auth(req: Request, res: Response, next: NextFunction) {
  let result = req.header('Authorization')
  if (!result) throw new Error('you need to login')
  // let token = req.cookies['x-auth-token'] || req.header('x-auth-token')
  const token = result.split(' ')[1]
  if (!token) res.status(401).json('Access denied. No token provided')
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    next()
  } catch (e) {
    res.status(400).send('Invalid token')
  }
}
