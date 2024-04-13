import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {
    const client = await db.connect()
    
    const {rows} = await client.sql`SELECT * FROM alojamientos INNER JOIN perfiles ON alojamientos.usuarioid = perfiles.usuarioid;`
    console.log(rows)
    if(req.session.loggedin){
        res.render('index', {
         login: true,
         name: req.session.name,
         id: req.session.id,
         rol: req.session.rol
        })
    } else {
        res.render('index', {
            login: false
        })
    }

}