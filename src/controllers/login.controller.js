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
    res.render('inicioDeSesion')
}

export const postLogin = async (req, res) => {
    const {email, password} = req.body
    console.log(email)
    let passwordHaash = await bcryptjs.hash(password, 8)
    const client = await db.connect()

    try {
        const {rows} = await client.sql`SELECT * FROM usuarios WHERE correo_electronico = ${email};`;
        console.log(rows[0])
        if(typeof rows[0] ==='undefined' || !(await bcryptjs.compare(password, rows[0].contraseña))){
            res.render('inicioDeSesion', {msg: 'Usuario y/o contraseña incorrectas'})       
        }else{
            req.session.loggedin = true
            req.session.name = rows[0].nombreusuario
            req.session.idUser = rows[0].usuarioid
            req.session.rol= rows[0].rol
            res.render('inicioDeSesion', {
                ruta: '/',
                id: rows[0].usuarioid
            })
        }

    } catch (error) {
        res.render('inicioDeSesion', {
            msg: 'No se pudo iniciar sesión',
            error
        })
    }
}