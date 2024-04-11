import {Router} from 'express'
import {getLogin} from '../controllers/login.controller.js'

const router = Router()

router.get('/', getLogin)

router.post('/', postLogin)

router.put('/', )

router.delete('/, ')

export default router