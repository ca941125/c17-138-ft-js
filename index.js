import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan'
import {PORT} from './config.js'
import bcryptjs from 'bcryptjs'
import session from 'express-session'
import app from './src/index.js'


app.listen(PORT)
console.log('Server on port', PORT)