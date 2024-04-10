import pool from '../db.js'
import { sql } from '@vercel/postgres'

export const getIndex = async (req, res) => {
    /* res.send("hola") */
    /* const data = await pool.query('SELECT * FROM alojamientos ORDER BY id DESC LIMIT 8 OFFSET 0')
    console.log(data[0])
    res.render('index', {data: data[0]}) */
    const {rows} = await sql`SELECT * FROM usuarios;`;
    res.json({rows})
}