import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import {CLAVE} from './config.js'
import cors from "cors"

import indexRoutes from './routes/index.routes.js'
import loginRoutes from './routes/login.routes.js'
import registerRoutes from './routes/register.routes.js'


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log(__dirname)
app.use(morgan('dev'))
app.use(express.static(join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
	cors({
		origin: ["https://wasi-zeta.vercel.app/", "http://localhost:8080"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
)

app.use(cookieParser())
/* app.set('trust proxy', 1) */
app.use(session({
        secret: 'perro-gato',
        resave: false,
        saveUninitialized: false,
        name: "session"
        /* cookie: { maxAge: (5 * 60 * 60 * 1000)} // 5 horas */
        /* cookie: {
            secure: true,//use this when the code is in production for https cookie request
            httpOnly:true,
            sameSite: 'lax' //dealing with cross-site requests and the usage of third-party cookies
        } */
       
    })
)



app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(loginRoutes)
app.use(registerRoutes)
app.use(indexRoutes)


app.get('/logout', (req, res) => {
    /* req.session.destroy(() => {
        res.redirect('/')
    }) */
    res.clearCookie("loggedin");
    res.clearCookie("idUser");
    res.clearCookie("nombres");
    res.clearCookie("apellidos");
    res.clearCookie("foto_url");
    res.redirect('/')
})

app.use((req, res, next)=> {
    res.send('Página solicitada no encontrada')
    next()
})

export default app