import {Router} from 'express'
import {getIndex} from '../controllers/main.controller.js'

const router = Router()

router.get('/', getIndex)

router.post('/', )

router.put('/', )

router.delete('/, ')

export default router