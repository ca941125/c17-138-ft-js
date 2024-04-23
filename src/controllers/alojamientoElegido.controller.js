import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getAlojamientoElegido = async (req, res) => {
    const id = req.params.id
    const client = await db.connect()
    
    const result = await client.sql`SELECT * FROM perfiles WHERE usuarioid = ${id};`

    //agregar si no existe id redireccionar a pagina error

    const result3 = await client.sql`SELECT correo_electronico FROM usuarios WHERE usuarioid = ${id};`

    const {rows} = await client.sql`SELECT * FROM alojamientos WHERE usuarioid = ${id};`
    
    let alojamiento = rows[0]
    const result2 = await client.sql`SELECT * FROM imagenes_alojamientos WHERE alojamientosid = ${alojamiento.alojamientoid};`
    alojamiento.imagenes_alojamiento = result2.rows

    const result1 = await client.sql`SELECT * FROM mascotas WHERE usuarioid = ${id};`
    let mascotas = result1.rows
    let i = 0
    while( i < mascotas.length){
        const result2 = await client.sql`SELECT * FROM imagenes_mascotas WHERE mascotaid = ${mascotas[i].mascotaid};`
        mascotas[i].imagenes_mascotas = result2.rows
        i++
    }
    client.release();
    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.render('alojamientoElegido', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion,
         alojamiento,
         perfil: result.rows[0],
         mascotas,
         email: result3.rows[0].correo_electronico
        })
    } else {
        res.render('alojamientoElegido', {
            login: false,
            alojamiento,
            perfil: result.rows[0],
            mascotas,
            email: result3.rows[0].correo_electronico
        })
    }

}