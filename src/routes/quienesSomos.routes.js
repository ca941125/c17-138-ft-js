import {Router} from 'express'
import {getQuienesSomos} from '../controllers/quienesSomos.router.js'

const router = Router()

router.get('/quienes-somos', getQuienesSomos)

router.post('/', )

router.put('/', )

router.delete('/', )

export default router