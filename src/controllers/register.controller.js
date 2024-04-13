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
    res.render('login')
}

export const postRegister = async (req, res) => {
    /* const {user, pass} = req.body */
    const client = await db.connect()

    const pass = '12345678'
    let passwordHaash = await bcryptjs.hash(pass, 8)

    /* const {rows} = await client.sql`INSERT INTO usuarios (nombreusuario, correo_electronico, contraseña, rol) VALUES ('María', 'maria.gomez@example.com', ${passwordHaash}, 'user');`; */

    /* const result = await client.sql`INSERT INTO perfiles (usuarioid, usuario_perfil, foto_url, nombres, apellidos, direccion, ciudad, provincia, barrio, numero_telefono, numero_telefono_secundario, sobre_mi) VALUES ('3', 'María', 'manuel-meza.jpg', 'María', 'Gómez', 'algo', 'La Falda', 'Córdoba', 'Terrazas de La Falda', '54354826578', '543548426578', 'Amante de la naturaleza y los animales. Mi pasión por el medio ambiente me impulsa a buscar formas de proteger y preservar nuestro entorno natural. En casa, comparto mi vida con Ramón, un perro rescatado que se ha convertido en mi fiel compañero de aventuras. Juntos disfrutamos explorando senderos naturales y descubriendo la belleza del mundo que nos rodea. Además de mi amor por los animales, disfruto de la jardinería y el cultivo de plantas que llenan mi hogar de vida y color.');`;

    const result1 = await client.sql`INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) VALUES (3, 'Ramón', 'Perro', 'Mestiza', 'Mediano', 4, 'Macho', 'Cataratas en ojo izquierdo', 'Productos de limpieza', 'Ramón es un perro mestizo de tamaño mediano con un pelaje marrón y blanco que le da un aspecto único. Tiene una personalidad juguetona y curiosa que lo lleva a explorar su entorno con entusiasmo. Rocky adora ir de excursión con su familia y explorar nuevos senderos en la naturaleza. Su energía inagotable y su amor por la aventura lo convierten en el compañero perfecto para cualquier actividad al aire libre.');`; */

    /* const result2 = await client.sql`INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) VALUES ('1', 'jesse-schoff.jpg');`;
    console.log(result2.rowCount) */

    /* const result3 = await client.sql`INSERT INTO alojamientos (costo_alojamiento, usuarioid, tipo_alojamiento, aire_libre, cercado, parque_cerca, descripcion, condiciones, moneda, link_ubicacion, fecha_disponible) VALUES (35000, 3, 'Casa', 'Jardin', 'Si', 'No', 'Mi casa con jardín ofrece una variedad de comodidades para el disfrute de mi mascota. El jardín proporciona un espacio seguro y al aire libre donde puede correr, explorar y jugar libremente. Hay áreas sombreadas y soleadas donde puede descansar y tomar siestas tranquilas bajo la sombra de los árboles. Además, disponemos de juguetes y equipamiento adecuado para su entretenimiento, como pelotas, juguetes interactivos y obstáculos para jugar. El jardín está vallado para garantizar su seguridad y evitar que se escape. También contamos con un área designada para sus necesidades fisiológicas, como un espacio con césped o tierra para que pueda hacer sus necesidades cómodamente. En resumen, nuestro jardín ofrece un ambiente estimulante y seguro donde mi mascota puede disfrutar de la naturaleza y mantenerse activa y feliz.', 'No recibimos mascotas muestren signos de agresividad hacia las personas o otros animales', 'AR', 'https://www.google.com/maps/place/Terrazas+de+La+Falda+2/@-31.0861151,-64.5145304,17z/data=!4m10!1m2!2m1!1sBarrio+Terrazas+de+la+Falda!3m6!1s0x942d835fef711cd5:0xd8c4afd5d1b75f3d!8m2!3d-31.0863883!4d-64.5060468!15sChtCYXJyaW8gVGVycmF6YXMgZGUgbGEgRmFsZGGSARNob3VzaW5nX2RldmVsb3BtZW504AEA!16s%2Fg%2F11q255f020?entry=ttu', '2024/04/25');`;
    console.log(result3.rowCount) */

    
    /* const result4 = await client.sql`INSERT INTO imagenes_alojamientos (alojamientosid, url_imagen_alojamiento) VALUES ('1', 'd2.jpg');`;
    console.log(result4.rowCount)
    res.send('ok') */
    
}