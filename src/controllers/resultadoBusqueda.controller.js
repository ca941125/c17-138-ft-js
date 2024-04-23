import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getResultadoBusqueda = async (req, res) => {

    const body = req.body

    const client = await db.connect()
    
    const {rows} = await client.sql`SELECT perfiles.usuarioid, resumen_card, nombres, foto_url, apellidos, direccion, ciudad, provincia, costo_alojamiento, tipo_alojamiento, aire_libre, parque_cerca, cercado, moneda FROM alojamientos INNER JOIN perfiles ON alojamientos.usuarioid = perfiles.usuarioid LIMIT 8 OFFSET 0;`
    //console.log(rows[0].usuarioid)

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

        res.render('resultadoBusqueda', {
         login: true,
         /* name: req.session.name, */
         id: req.signedCookies['idUser'],
         /* rol: req.session.rol, */
         alojamientos,
         usuarioSesion
        })
    } else {
        res.render('resultadoBusqueda', {
            login: false,
            alojamientos
        })
    }

}

export const postResultadoBusqueda = async (req, res) => {

    const client = await db.connect()
    const {indice} = req.body
    console.log(indice)

    const {rows} = await client.sql`SELECT perfiles.usuarioid, resumen_card, nombres, foto_url, apellidos, direccion, ciudad, provincia, costo_alojamiento, tipo_alojamiento, aire_libre, parque_cerca, cercado, moneda FROM alojamientos INNER JOIN perfiles ON alojamientos.usuarioid = perfiles.usuarioid LIMIT 8 OFFSET ${indice};`
    //console.log(rows[0].usuarioid)

    let alojamientos = rows
    let i = 0
    while( i < alojamientos.length){
        const result = await client.sql`SELECT tipo_mascota FROM mascotas WHERE usuarioid = ${alojamientos[i].usuarioid};`
        alojamientos[i].mascotas = result.rows
        i++
    }
    client.release();
    res.send(alojamientos)

}