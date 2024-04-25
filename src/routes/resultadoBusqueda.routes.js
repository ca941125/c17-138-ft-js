import {Router} from 'express'
import {getResultadoBusqueda, postResultadoBusqueda} from '../controllers/resultadoBusqueda.controller.js'

const router = Router()

router.get('/resultado-busqueda', getResultadoBusqueda)

router.post('/resultado-busqueda', postResultadoBusqueda)

router.put('/', )

router.delete('/', )

export default router