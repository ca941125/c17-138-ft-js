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
    if(req.signedCookies['loggedin']){
        res.redirect('/')
    } else {
        res.render('inicioDeSesion', {
            login: false
        })
    }

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
            res.render('inicioDeSesion', {msg: 'Usuario y/o contraseña incorrectas', login: false})       
        }else{
            const result1 = await client.sql`SELECT nombres, apellidos, foto_url FROM perfiles WHERE usuarioid = ${rows[0].usuarioid};`
            client.release();
            res.cookie('loggedin', true, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
            /* req.signedCookies.loggedin = true */
            /* req.session.name = rows[0].nombreusuario */
            res.cookie('idUser', rows[0].usuarioid, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
            /* req.signedCookies.idUser = rows[0].usuarioid */
            /* req.session.rol = rows[0].rol */
            res.cookie('nombres', result1.rows[0].nombres, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
            /* req.signedCookies.nombres = result1.rows[0].nombres */
            res.cookie('apellidos', result1.rows[0].apellidos, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
            /* req.signedCookies.apellidos = result1.rows[0].apellidos */
            res.cookie('foto_url', result1.rows[0].foto_url, { maxAge: 900000, httpOnly: true, secure: true, signed: true})
            /* req.signedCookies.foto_url = result1.rows[0].foto_url */
            /* req.session. */const usuarioSesion = {
                nombres: result1.rows[0].nombres,
                apellidos: result1.rows[0].apellidos,
                foto_url: result1.rows[0].foto_url 
            }
            res.render('inicioDeSesion', {
                ruta: '/',
                id: rows[0].usuarioid,
                login: true,
                usuarioSesion
            })
        }

    } catch (error) {
        res.render('inicioDeSesion', {
            msg: 'No se pudo iniciar sesión',
            error,
            login: false
        })
    }
}