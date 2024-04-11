import {Router} from 'express'
import {getLogin, postLogin} from '../controllers/login.controller.js'

const router = Router()

router.get('/login', getLogin)

router.post('/login', postLogin)

router.put('/login', )

router.delete('/login', )

export default router