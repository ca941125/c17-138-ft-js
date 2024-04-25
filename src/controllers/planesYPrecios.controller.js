import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getPlanesYPrecios = async (req, res) => {

    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.render('planesYPrecios', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion
        })
    } else {
        res.render('planesYPrecios', {
            login: false
        })
    }

}