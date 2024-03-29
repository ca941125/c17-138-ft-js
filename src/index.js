import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan'
import {PORT} from'./config.js'
import indexRoutes from './routes/index.routes.js'
import adminRoutes from './routes/admin.routes.js'
import searchRoutes from './routes/search.routes.js'


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log(__dirname)

app.use(morgan('dev'))
app.use(express.static(join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(indexRoutes)
app.use(adminRoutes)
app.use(searchRoutes)



app.use((req, res, next)=> {
    res.send('Página solicitada no encontrada')
    next()
})

app.listen(PORT)
console.log('Server on port', PORT)