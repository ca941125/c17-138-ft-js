import pool from '../db.js'
import { db } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'

export const getEditarMiPerfil = async (req, res) => {
    const id = req.signedCookies['idUser']
    /* const client = await db.connect()
    
    const result = await client.sql`SELECT * FROM perfiles WHERE usuarioid = ${id};`

    const result3 = await client.sql`SELECT correo_electronico FROM usuarios WHERE usuarioid = ${id};`

    const result1 = await client.sql`SELECT * FROM mascotas WHERE usuarioid = ${id};`
    let mascotas = result1.rows
    let i = 0
    while( i < mascotas.length){
        const result2 = await client.sql`SELECT * FROM imagenes_mascotas WHERE mascotaid = ${mascotas[i].mascotaid};`
        mascotas[i].imagenes_mascotas = result2.rows
        i++
    }
    client.release(); */
    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.render('editarMiPerfil', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion,
         /* perfil: result.rows[0],
         mascotas,
         user_email: result3.rows[0].correo_electronico */
        })
    } else {
        res.redirect('/')        
    }

}

export const postEditarMiPerfil = async (req, res) => {
    const id = req.signedCookies['idUser']

    const client = await db.connect()
    
    const result = await client.sql`SELECT * FROM perfiles WHERE usuarioid = ${id};`

    const result3 = await client.sql`SELECT correo_electronico FROM usuarios WHERE usuarioid = ${id};`

    const result1 = await client.sql`SELECT * FROM mascotas WHERE usuarioid = ${id};`
    let mascotas = result1.rows
    let i = 0
    while( i < mascotas.length){
        const result2 = await client.sql`SELECT * FROM imagenes_mascotas WHERE mascotaid = ${mascotas[i].mascotaid};`
        mascotas[i].imagenes_mascotas = result2.rows
        i++
    }
    client.release();

    res.send({
        perfil: result.rows[0],
        mascotas,
        user_email: result3.rows[0].correo_electronico
    })
    
    

}

export const putEditarMiPerfil = async (req, res) => {

    console.log(req.body)
    console.log(req.files)
    
    /* if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.redirect('/mi-perfil')       
    } else {
        res.redirect('/')        
    } */

}