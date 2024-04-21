import pool from '../db.js'
import { db } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'

export const getRegister = async (req, res) => {
    /* const client = await db.connect() */
    /* res.send("hola") */
    /* const data = await pool.query('SELECT * FROM alojamientos ORDER BY id DESC LIMIT 8 OFFSET 0')
    console.log(data[0])
    res.render('index', {data: data[0]}) */
    /* const users = await client.sql`SELECT * FROM mascotas;`; */
    /* res.json({users: users.rows}) */

    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            foto_url: req.signedCookies['foto_url'] 
        }

        res.render('index', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion,
        })
    } else {
        res.render('formularioMiPerfil', {
            login: false,
        })
    }

}

export const postRegister = async (req, res) => {
    const user = req.body
    const client = await db.connect()

    
    let passwordHaash = await bcryptjs.hash(user.pass, 8)

    const verifiEmail = await client.sql`SELECT usuarioid FROM usuarios WHERE correo_electronico = ${user.email}`
    if(!verifiEmail.rows[0].usuarioid){
        
        const {rows} = await client.sql`INSERT INTO usuarios (nombreusuario, correo_electronico, contraseña, rol) VALUES ('${user.nombres}', '${user.email}', ${passwordHaash}, 'user');`;

        const idUsuario = await client.sql`SELECT usuarioid FROM usuarios WHERE correo_electronico = ${user.email}`

        const result = await client.sql`INSERT INTO perfiles (usuarioid, foto_url, nombres, apellidos, direccion, ciudad, provincia, barrio, numero_telefono, numero_telefono_secundario, sobre_mi) VALUES (${idUsuario.rows[0].usuarioid}, 'perfil_usuario_4.jpg', '${user.nombres}', '${user.apellidos}', 'algo', '${user.ciudad}', '${user.provincia}', 'algo', '${user.telefono}', '${user.celular}', '${user.sobre_mi}');`;

        const result1 = await client.sql`INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) VALUES (${idUsuario.rows[0].usuarioid}, 'Luna', 'Gato', 'Mestiza', 'Pequeño', 5, 'Hembra', 'Sordera', 'No tiene', 'Luna tiene un pelaje atigrado y brillante que contrasta con sus ojos amarillos penetrantes. Es elegante y tranquila, pero también tiene momentos de pura energía donde corre por toda la casa persiguiendo juguetes. Aunque disfruta de su tiempo a solas, Luna es una compañera cariñosa que adora las caricias y los mimos. Pasar las tardes tomando siestas al sol es una de sus actividades favoritas, y siempre está lista para compartir su amor con su familia.');`;

        


    }
    

    

    

    /* const result2 = await client.sql`INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) VALUES ('4', 'perfil_mascota_4.jpg');`;
    console.log(result2.rowCount) */

    /* const result3 = await client.sql`INSERT INTO alojamientos (costo_alojamiento, usuarioid, tipo_alojamiento, aire_libre, cercado, parque_cerca, descripcion, condiciones, moneda, link_ubicacion, fecha_disponible) VALUES (38.000, 6, 'Casa', 'Patio', 'Si', 'Si', 'Mi casa con patio ofrece un entorno acogedor y seguro para mi mascota. El patio trasero es un espacio al aire libre donde mi mascota puede jugar, explorar y relajarse cómodamente. Contamos con áreas sombreadas y soleadas donde puede descansar y tomar el sol. Además, disponemos de juguetes y equipamiento adecuado para su entretenimiento, como pelotas, cuerdas para tirar y juegos de inteligencia. El patio está vallado para garantizar su seguridad y prevenir cualquier escape. También tenemos un área designada para sus necesidades fisiológicas, con superficies adecuadas para que pueda hacer sus necesidades de manera cómoda y limpia. En resumen, nuestro patio ofrece un espacio tranquilo y agradable donde mi mascota puede disfrutar del aire libre y mantenerse activa y feliz.', 'No recibo mascotas que pueden experimentar reacciones adversas al estrés, como ansiedad extrema, ataques de pánico o comportamiento autodestructivo.', 'AR', 'https://www.google.com/maps/place/Museo+del+%C3%81rea+Fundacional/@-32.879746,-68.830551,17.01z/data=!4m6!3m5!1s0x967e09275a9e6c89:0x2f50e603cd8afee2!8m2!3d-32.8797909!4d-68.8279529!16s%2Fg%2F120m0nj1?entry=ttu', '2024/04/30');`;
    console.log(result3.rowCount) */

    
    /* const result4 = await client.sql`INSERT INTO imagenes_alojamientos (alojamientosid, url_imagen_alojamiento) VALUES ('4', 'casa_E_usuario_4.jpg');`;
    console.log(result4.rowCount) */

    res.send('ok')
    
}