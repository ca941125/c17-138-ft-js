import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {
    const client = await db.connect()
    
    const {rows} = await client.sql`SELECT perfiles.usuarioid, nombres, foto_url, apellidos, direccion, ciudad, provincia, costo_alojamiento, tipo_alojamiento, aire_libre, parque_cerca, cercado, moneda FROM alojamientos INNER JOIN perfiles ON alojamientos.usuarioid = perfiles.usuarioid LIMIT 4 OFFSET 0;`
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
    
    console.log(alojamientos)
    if(req.session.loggedin){
        
        res.render('index', {
         login: true,
         name: req.session.name,
         id: req.session.idUser,
         rol: req.session.rol,
         alojamientos,
         usuarioSesion : req.session.usuarioSesion  
        })
    } else {
        res.render('index', {
            login: false,
            alojamientos
        })
    }

}