import {Router} from 'express'
import {getPlanesYPrecios} from '../controllers/planesYPrecios.controller.js'

const router = Router()

router.get('/planes-y-precios', getPlanesYPrecios)

router.post('/', )

router.put('/', )

router.delete('/', )

export default router