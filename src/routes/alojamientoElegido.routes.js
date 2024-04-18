import {Router} from 'express'
import {getAlojamientoElegido} from '../controllers/alojamientoElegido.controller.js'

const router = Router()

router.get('/alojamientos/:id', getAlojamientoElegido)

router.post('/', )

router.put('/', )

router.delete('/', )

export default router