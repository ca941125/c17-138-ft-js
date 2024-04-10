import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {
    const client = await db.connect()
    /* res.send("hola") */
    /* const data = await pool.query('SELECT * FROM alojamientos ORDER BY id DESC LIMIT 8 OFFSET 0')
    console.log(data[0])
    res.render('index', {data: data[0]}) */
    const users = await client.sql`SELECT * FROM mascotas;`;
    /* res.json({users: users.rows}) */
    res.sendFile('index')
}