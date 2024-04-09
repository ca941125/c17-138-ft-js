import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {
    res.send("hola")
    /* const data = await pool.query('SELECT * FROM alojamientos LIMIT 8 OFFSET 0')
    console.log(data[0])
    res.render('index', {data: data[0]}) */
    //res.json(query)
}