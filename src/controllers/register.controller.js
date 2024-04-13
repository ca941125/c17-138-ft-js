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

    /* const {rows} = await client.sql`INSERT INTO usuarios (nombreusuario, correo_electronico, contraseña, rol) VALUES ('Juan', 'juan.perez@example.com', ${passwordHaash}, 'user');`; */

    /* const result = await client.sql`INSERT INTO perfiles (usuarioid, usuario_perfil, foto_url, nombres, apellidos, direccion, ciudad, provincia, barrio, numero_telefono, numero_telefono_secundario, sobre_mi) VALUES ('5', 'Juan', 'erica-magugliani.jpg', 'Juan', 'Pérez', 'algo', 'Córdoba', 'Córdoba', 'Centro', '543513456789', '543513456789', 'Apasionado del arte y la creatividad. Disfruto explorando nuevas técnicas de pintura y expresando mi imaginación a través de lienzos y colores vibrantes. Mi fiel compañera, Lola, me acompaña en mis aventuras artísticas y en largos paseos por el parque. En mi tiempo libre, también me gusta leer novelas clásicas y perderme en mundos de fantasía que estimulan mi imaginación y mi creatividad.');`; */

    /* const result1 = await client.sql`INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) VALUES (5, 'Lola', 'Perro', 'Pug', 'Pequeño', 3, 'Hembra', 'Bronquitis ocasional', 'Ácaros del polvo', 'Lola tiene pelaje beige y una cara arrugada adorable. Es una mascota dulce y cariñosa que ama recibir atención y cariño de su familia. Lola disfruta de largas siestas al sol y de paseos cortos por el vecindario. Aunque puede ser un poco terca a veces, su naturaleza amorosa y juguetona la convierten en la compañera perfecta para cualquier persona que busque un poco de diversión y alegría en su vida.');`; */

    /* const result2 = await client.sql`INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) VALUES ('3', 'charlesdeluvio.jpg');`;
    console.log(result2.rowCount) */

    /* const result3 = await client.sql`INSERT INTO alojamientos (costo_alojamiento, usuarioid, tipo_alojamiento, aire_libre, cercado, parque_cerca, descripcion, condiciones, moneda, link_ubicacion, fecha_disponible) VALUES (47.000, 5, 'Departamento', 'No', 'No', 'Si', 'En este moderno apartamento, tu mascota encontrará un espacio cómodo y acogedor para disfrutar de su tiempo en casa. Con amplios ventanales que permiten la entrada de luz natural, tu mascota podrá disfrutar del sol mientras descansa cómodamente en su área designada. El apartamento está equipado con muebles suaves y acogedores donde tu mascota puede relajarse y disfrutar de largas siestas. Además, hay suficiente espacio para jugar y moverse, con juguetes y actividades interactivas para mantenerla entretenida durante todo el día. La cocina está equipada con todos los utensilios necesarios para preparar deliciosas comidas caseras para tu mascota, y hay un área de alimentación designada para su conveniencia. Con acceso a áreas verdes cercanas para pasear y explorar, tu mascota tendrá muchas oportunidades para ejercitarse y disfrutar del aire libre. En resumen, este apartamento ofrece un ambiente cómodo y seguro donde tu mascota se sentirá como en casa.', 'No aceptamos mascotas si tienen un historial de comportamiento destructivo, como morder muebles o causar daños en la propiedad', 'AR', 'https://www.google.com/maps/place/Center,+C%C3%B3rdoba,+C%C3%B3rdoba+Province,+Argentina/@-31.4177333,-64.1909182,15z/data=!3m1!4b1!4m6!3m5!1s0x9432a29d1d3f9d45:0xcbcd910412819792!8m2!3d-31.4148491!4d-64.1792179!16s%2Fg%2F122qy5nq?entry=ttu', '2024/04/20');`;
    console.log(result3.rowCount) */

    
    /* const result4 = await client.sql`INSERT INTO imagenes_alojamientos (alojamientosid, url_imagen_alojamiento) VALUES ('3', 'timothy-buck.jpg');`;
    console.log(result4.rowCount) */

    res.send('ok')
    
}