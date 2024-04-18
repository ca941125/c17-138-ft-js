import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {
    const client = await db.connect()
    
    const {rows} = await client.sql`SELECT perfiles.usuarioid, resumen_card, nombres, foto_url, apellidos, direccion, ciudad, provincia, costo_alojamiento, tipo_alojamiento, aire_libre, parque_cerca, cercado, moneda FROM alojamientos INNER JOIN perfiles ON alojamientos.usuarioid = perfiles.usuarioid LIMIT 4 OFFSET 0;`
    //console.log(rows[0].usuarioid)
    /* let alojamientos = rows.map(async (data) => {
        console.log(data.nombres)
        const result = await client.sql`SELECT tipo_mascota FROM mascotas WHERE usuarioid = ${data.usuarioid};`
        console.log(result.rows)
        return data
    }) */
    let alojamientos = rows
    let i = 0
    while( i < alojamientos.length){
        const result = await client.sql`SELECT tipo_mascota FROM mascotas WHERE usuarioid = ${alojamientos[i].usuarioid};`
        alojamientos[i].mascotas = result.rows
        i++
    }
    
    /* console.log(alojamientos) */
    /* console.log(req.signedCookies) */
    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.render('index', {
         login: true,
         /* name: req.session.name, */
         id: req.signedCookies['idUser'],
         /* rol: req.session.rol, */
         alojamientos,
         usuarioSesion,
         index: true
        })
    } else {
        res.render('index', {
            login: false,
            alojamientos,
            index: true
        })
    }

}