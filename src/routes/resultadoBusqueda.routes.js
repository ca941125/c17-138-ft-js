import {Router} from 'express'
import {getResultadoBusqueda} from '../controllers/resultadoBusqueda.controller.js'

const router = Router()

router.get('/resultado-busqueda', getResultadoBusqueda)

router.post('/', )

router.put('/', )

router.delete('/', )

export default router