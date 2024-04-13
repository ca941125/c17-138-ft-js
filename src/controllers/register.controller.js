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

    /* const {rows} = await client.sql`INSERT INTO usuarios (nombreusuario, correo_electronico, contraseña, rol) VALUES ('Martina', 'martina.lopez@example.com', ${passwordHaash}, 'user');`; */

    /* const result = await client.sql`INSERT INTO perfiles (usuarioid, usuario_perfil, foto_url, nombres, apellidos, direccion, ciudad, provincia, barrio, numero_telefono, numero_telefono_secundario, sobre_mi) VALUES ('4', 'Martina', 'manuel-meza.jpg', 'Martina', 'Lopez', 'algo', 'Buenos Aires', 'Buenos Aires', 'Caballito', '541123456789', '541123456789', 'Amante de la naturaleza y los animales que encuentra paz en los pequeños detalles de la vida. Disfruto de largas caminatas por el parque con mi fiel compañero, Simón, un perro cariñoso y lleno de energía. En casa, me sumerjo en la cocina, donde experimento con recetas nuevas y deleito a mis seres queridos con deliciosos platos caseros. Además de mi amor por la cocina, encuentro alegría en la lectura y la jardinería, donde cultivo un pequeño oasis de serenidad en mi hogar.');`; */

    /* const result1 = await client.sql`INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) VALUES (4, 'Simón', 'Perro', 'Labrador Retriever', 'Grande', 2, 'Macho', 'Estreñimiento', 'Pollo', 'Simón tiene un pelaje dorado que brilla bajo el sol. Sus ojos expresivos reflejan su naturaleza juguetona y cariñosa. Siempre está listo para una aventura en el parque y nunca se cansa de jugar con su pelota favorita. Es un compañero leal que siempre está feliz de recibir mimos y caricias de su familia. Su energía contagiosa ilumina cualquier día y su amor incondicional trae alegría a todos a su alrededor.');`; */

    /* const result2 = await client.sql`INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) VALUES ('2', 'darby-henjum.jpg');`;
    console.log(result2.rowCount) */

    /* const result3 = await client.sql`INSERT INTO alojamientos (costo_alojamiento, usuarioid, tipo_alojamiento, aire_libre, cercado, parque_cerca, descripcion, condiciones, moneda, link_ubicacion, fecha_disponible) VALUES (20.000, 4, 'Departamento', 'Balcón', 'No', 'Si', 'Mi acogedor apartamento con balcón, ofrece un lugar perfecto para que tu mascota tome el aire fresco y disfrute del sol, con suficiente espacio para moverse y explorar con seguridad. Además, el apartamento está equipado con juguetes y actividades interactivas para mantener a tu mascota entretenida y estimulada. La cocina está completamente equipada con todos los utensilios necesarios para preparar deliciosas comidas para tu mascota, y hay un área designada para la alimentación. Con acceso a áreas verdes cercanas para pasear y explorar, tu mascota tendrá muchas oportunidades para ejercitarse y socializar. En resumen, este apartamento con balcón ofrece un ambiente acogedor y relajante donde tu mascota se sentirá como en casa.', 'Si la mascota tiene problemas de salud graves que requieren atención médica especializada o cuidados constantes.', 'AR', 'https://www.google.com/maps/place/Caballito,+Buenos+Aires,+Argentina/@-34.6166547,-58.4642141,15z/data=!3m1!4b1!4m6!3m5!1s0x95bcca3911f8ab2d:0x27b394c2f3d87d2d!8m2!3d-34.6159245!4d-58.4406027!16zL20vMDl5cWo3?entry=ttu', '2024/04/26');`;
    console.log(result3.rowCount) */

    
    /* const result4 = await client.sql`INSERT INTO imagenes_alojamientos (alojamientosid, url_imagen_alojamiento) VALUES ('2', 'ec.jpg');`;
    console.log(result4.rowCount) */

    res.send('ok')
    
}