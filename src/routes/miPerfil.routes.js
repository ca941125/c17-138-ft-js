import {Router} from 'express'
import multer from 'multer'
import {getMiPerfil, getMisChats} from '../controllers/miPerfil.controller.js'
import { putEditarMiPerfil, getEditarMiPerfil, postEditarMiPerfil } from '../controllers/editarMiPerfil.controller.js'
const upload = multer({ dest: 'src/public/images/upload/'} )

const router = Router()

router.get('/mi-perfil', getMiPerfil)

router.get('/mis-chats', getMisChats)   

router.post('/', )

router.put('/', )

router.delete('/', )

router.get('/mi-perfil/editar', getEditarMiPerfil)

router.post('/mi-perfil/editar', postEditarMiPerfil)

router.put('/mi-perfil/editar',upload.any(), putEditarMiPerfil)

export default router