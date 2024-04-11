import pool from '../db.js'
import { db } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'

export const getLogin = async (req, res) => {
    /* const client = await db.connect() */
    /* res.send("hola") */
    /* const data = await pool.query('SELECT * FROM alojamientos ORDER BY id DESC LIMIT 8 OFFSET 0')
    console.log(data[0])
    res.render('index', {data: data[0]}) */
    /* const users = await client.sql`SELECT * FROM mascotas;`; */
    /* res.json({users: users.rows}) */
    res.render('index')
}

export const postLogin = async (req, res) => {
    const {user, pass} = req.body
    let passwordHaash = await bcryptjs.hash(pass, 8)
    const client = await db.connect()

    try {
        const {rows} = await client.sql`SELECT * FROM usuarios WHERE nombreusuario = ${user};`;
        console.log(rows[0])
        if(rows[0].length == 0 || !(await bcryptjs.compare(pass, rows[0].contraseña))){
            res.render('login', {msg: 'Usuario y/o contraseña incorrectas'})
        }else{
            req.session.loggedin = true
            req.session.name = rows[0].nombreusuario
            req.session.idUser = rows[0].usuarioid
            req.session.rol= rows[0].rol
            res.render('login', {
                ruta: '/index',
                id: rows[0].usuarioid
            })
        }

    } catch (error) {
        res.render('login', {
            msg: 'No se pudo iniciar sesión',
            error
        })
    }
}