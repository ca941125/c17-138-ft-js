import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getMiPerfil = async (req, res) => {
    const id = req.signedCookies['idUser']
    const client = await db.connect()
    
    const result = await client.sql`SELECT * FROM perfiles WHERE usuarioid = ${id};`

    const result3 = await client.sql`SELECT correo_electronico FROM usuarios WHERE usuarioid = ${id};`

    const result1 = await client.sql`SELECT * FROM mascotas WHERE usuarioid = ${id};`
    let mascotas = result1.rows
    let i = 0
    while( i < mascotas.length){
        const result2 = await client.sql`SELECT * FROM imagenes_mascotas WHERE mascotaid = ${mascotas[i].mascotaid};`
        mascotas[i].imagenes_mascotas = result2.rows
        i++
    }

    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.render('miPerfil', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion,
         perfil: result.rows[0],
         mascotas,
         email: result3.rows[0].correo_electronico
        })
    } else {
        res.redirect('/')        
    }

}
    

