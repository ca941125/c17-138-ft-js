import {Router} from 'express'
import {getIndex} from '../controllers/index.controller.js'

const router = Router()

router.get('/', getIndex)

router.post('/', )

router.put('/', )

router.delete('/, ')

export default router