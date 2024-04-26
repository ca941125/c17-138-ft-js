import {Router} from 'express'
import multer from 'multer'
import {getRegister, postRegister} from '../controllers/register.controller.js'
import axios from 'axios'
import fs from 'node:fs'

const router = Router()
const upload = multer({ dest: 'src/public/images/upload/'} )

router.get('/register', getRegister)

router.post('/register', upload.any(), postRegister)

router.post('/image', upload.single('image'), async (req, res) =>{

// Credenciales de la aplicación Imgur
const clientId = 'b527d48d26ca21b';

// URL del endpoint para subir imágenes
const uploadUrl = 'https://api.imgur.com/3/image';

// Función para subir una imagen a Imgur
const imageFile = fs.readFileSync(req.file.path, { encoding: 'base64' });


  try {
    // Configurar la solicitud POST con la imagen y las credenciales
    const response = await axios.post(uploadUrl, {
      image: imageFile
    }, {
      headers: {
        'Authorization': `Client-ID ${clientId}`
      }
    });
    
    // Imprimir la URL de la imagen subida
    console.log('Image uploaded successfully:', response.data.data.link);
    res.json({ link: response.data.data.link });
    // Devolver la URL de la imagen subida
    
  } catch (error) {
    // Manejar cualquier error que ocurra durante la carga de la imagen
    console.error('Error uploading image:', error.message);
    res.status(500).json({ error: 'Error al subir la imagen' });
    
  }


})

router.put('/register', )

router.delete('/register',)

export default router