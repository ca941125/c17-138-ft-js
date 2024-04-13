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
}