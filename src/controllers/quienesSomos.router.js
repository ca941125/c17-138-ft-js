import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getQuienesSomos = async (req, res) => {
    const client = await db.connect()

    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.render('quienesSomos', {
         login: true,
         /* name: req.session.name, */
         id: req.signedCookies['idUser'],
         /* rol: req.session.rol, */
         usuarioSesion
        })
    } else {
        res.render('quienesSomos', {
            login: false
        })
    }

}