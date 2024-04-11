import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getLogin = async (req, res) => {
    const client = await db.connect()
    /* res.send("hola") */
    /* const data = await pool.query('SELECT * FROM alojamientos ORDER BY id DESC LIMIT 8 OFFSET 0')
    console.log(data[0])
    res.render('index', {data: data[0]}) */
    /* const users = await client.sql`SELECT * FROM mascotas;`; */
    /* res.json({users: users.rows}) */
    res.render('index')
}

export const postLogin = async (req, res) => {
    const { user, name, rol, pass } = req.body
    let passwordHaash = await bcryptjs.hash(pass, 8)

    try {
        const [rows] = await pool.query(`INSERT INTO users (user, name, rol, pass) VALUES (?, ?, ?, ?)`, [user, name, rol, passwordHaash])
        res.render('register', {
            id: rows.insertId,
            user
        })
    } catch (error) {
        res.send(error)
    }
}