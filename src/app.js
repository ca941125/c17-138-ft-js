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
import quienesSomosRoutes from './routes/quienesSomos.routes.js'
import planesYPreciosRoutes from './routes/planesYPrecios.routes.js'
import alojamientoElegidoRoutes from './routes/alojamientoElegido.routes.js'
import miPerfilRoutes from './routes/miPerfil.routes.js'
import resultadoBusqueda from './routes/resultadoBusqueda.routes.js'


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log(__dirname)
app.use(morgan('dev'))
app.use(express.static(join(__dirname, 'public')))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb', parameterLimit:50000}))

app.use(
	cors({
		origin: ["https://wasi-zeta.vercel.app", "http://localhost:8080"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
        allowedHeaders: ['Content-Type']
	})
)

app.use(cookieParser('gato-perro'))

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(loginRoutes)
app.use(registerRoutes)
app.use(indexRoutes)
app.use(quienesSomosRoutes)
app.use(planesYPreciosRoutes)
app.use(alojamientoElegidoRoutes)
app.use(miPerfilRoutes)
app.use(resultadoBusqueda)


app.get('/logout', (req, res) => {

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