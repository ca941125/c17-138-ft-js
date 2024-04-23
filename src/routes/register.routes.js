import {Router} from 'express'
import multer from 'multer'
import {getRegister, postRegister} from '../controllers/register.controller.js'

const router = Router()
const upload = multer({})

router.get('/register', getRegister)

router.post('/register', upload.any(), postRegister)

router.put('/register', )

router.delete('/register',)

export default router