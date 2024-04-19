import {Router} from 'express'
import {getMiPerfil} from '../controllers/miPerfil.controller.js'

const router = Router()

router.get('/mi-perfil', getMiPerfil)

router.post('/', )

router.put('/', )

router.delete('/', )

export default router