import {Router} from 'express'
import {getMiPerfil, getMisChats} from '../controllers/miPerfil.controller.js'
import { putEditarMiPerfil, getEditarMiPerfil, postEditarMiPerfil } from '../controllers/editarMiPerfil.controller.js'

const router = Router()

router.get('/mi-perfil', getMiPerfil)

router.get('/mis-chats', getMisChats)

router.post('/', )

router.put('/', )

router.delete('/', )

router.get('/mi-perfil/editar', getEditarMiPerfil)

router.post('/mi-perfil/editar', postEditarMiPerfil)

router.put('/mi-perfil/editar', putEditarMiPerfil)

export default router