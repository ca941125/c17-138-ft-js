import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import {CLAVE} from './config.js'

import indexRoutes from './routes/index.routes.js'
import loginRoutes from './routes/login.routes.js'
import registerRoutes from './routes/register.routes.js'


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log(__dirname)
const expiryDate = new Date( Date.now() + 60 * 60 * 4000 )
app.use(morgan('dev'))
app.use(express.static(join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    secret: CLAVE,
    resave: true,
    saveUninitialized: 'true',
    expires: expiryDate,
    path: 'foo/bar',
    domain: 'https://wasi-zeta.vercel.app/'
}))

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(indexRoutes)
app.use(loginRoutes)
app.use(registerRoutes)

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('index')
    })
})

app.use((req, res, next)=> {
    res.send('Página solicitada no encontrada')
    next()
})

export default app