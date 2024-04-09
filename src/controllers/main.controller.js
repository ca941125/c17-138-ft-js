import pool from '../db.js'

export const getIndex = async (req, res) => {
    const data = await pool.query('SELECT * FROM alojamientos LIMIT 8 OFFSET 0')
    console.log(data[0])
    res.render('main', {data: data[0]})
    //res.json(query)
}