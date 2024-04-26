import pool from '../db.js'
import { db } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'
import fs from 'node:fs'
import axios from 'axios'

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

    const files = req.files
    const body = req.body
    const clientId = 'b527d48d26ca21b';

// URL del endpoint para subir imágenes
    const uploadUrl = 'https://api.imgur.com/3/image';

    /* console.log(body)
    console.log(files.length) */

    const client = await db.connect()

    
    let passwordHaash = await bcryptjs.hash(body.pass_user, 8)

        try {
          
          const verifiEmail = await client.sql`SELECT usuarioid FROM usuarios WHERE correo_electronico = ${body.email_user};`;
        console.log(verifiEmail.rowCount)
        if(verifiEmail.rowCount === 0){
        
            const query = {
                text: 'INSERT INTO usuarios (correo_electronico, contraseña, rol) VALUES ($1, $2, $3)',
                values: [body.email_user, passwordHaash, 'user'],
              };
              
              // Ejecutar la consulta
              client.query(query)
              .then(res => {
                console.log('Filas afectadas:', res.rowCount);
              })
              .catch(err => {
                console.error('Error al ejecutar la consulta:', err);
              })
              .finally(() => {
                // Cerrar la conexión a la base de datos
              });

        /* const result = await client.sql`INSERT INTO usuarios (nombreusuario, correo_electronico, contraseña, rol) 
        VALUES ('${body.nombres_user}', '${body.email_user}', '${passwordHaash}', 'user');`; */

        const idUsuario = await client.sql`SELECT usuarioid FROM usuarios WHERE correo_electronico = ${body.email_user};`;
        
        /* const newPath1 = `./src/public/images/upload/${files[0].originalname}`
        fs.renameSync(files[0].path, newPath1)
        const truePath1 = `./src/public/images/images_perfil/${idUsuario.rows[0].usuarioid}/${files[0].originalname}` 
        fs.mkdirSync(`./src/public/images/images_perfil/${idUsuario.rows[0].usuarioid}`, {recursive: true}) 
        fs.copyFileSync(newPath1, truePath1)
        fs.unlinkSync(newPath1) */
        const imageFile = fs.readFileSync(files[0].path, { encoding: 'base64' });
        let url_imagen_user
        try {
          // Configurar la solicitud POST con la imagen y las credenciales
          const response = await axios.post(uploadUrl, {
            image: imageFile
          }, {
            headers: {
              'Authorization': `Client-ID ${clientId}`
            }
          });
          
          // Imprimir la URL de la imagen subida
          console.log('Image uploaded successfully:', response.data.data.link);
          url_imagen_user = response.data.data.link 
          // Devolver la URL de la imagen subida
          
        } catch (error) {
          // Manejar cualquier error que ocurra durante la carga de la imagen
          console.error('Error uploading image:', error.message);
          res.status(500).json({ error: 'Error al subir la imagen' });
          
        }
    

        const query1 = {
            text: `INSERT INTO perfiles (usuarioid, foto_url, nombres, apellidos, direccion, ciudad, provincia, barrio, numero_telefono, numero_telefono_secundario, sobre_mi) 
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            values: [
              idUsuario.rows[0].usuarioid,
              url_imagen_user,
              body.nombres_user,
              body.apellidos_user,
              'algo',
              body.ciudad_user,
              body.provincia_user,
              'algo',
              body.telefono_user,
              body.celular_user,
              body.sobre_mi_user,
            ],
          };
          
          // Ejecutar la consulta
          client.query(query1)
            .then(res => {
              console.log('Filas afectadas:', res.rowCount);
            })
            .catch(err => {
              console.error('Error al ejecutar la consulta:', err);
            })
            .finally(() => {
              // Cerrar la conexión a la base de datos
              
            });

        /* const result1 = await client.sql`INSERT INTO perfiles (usuarioid, foto_url, nombres, apellidos, direccion, ciudad, provincia, barrio, numero_telefono, numero_telefono_secundario, sobre_mi) 
        VALUES (${idUsuario.rows[0].usuarioid}, '${files[0].originalname}', '${body.nombres_user}', '${body.apellidos_user}', 'algo', '${body.ciudad_user}', '${body.provincia_user}', 'algo', ${body.telefono_user}, ${body.celular_user}, '${body.sobre_mi_user}');`; */

        if(body.nombre_mascota_0){

            const query2 = {
                text: `INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) 
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                values: [
                  idUsuario.rows[0].usuarioid,
                  body.nombre_mascota_0,
                  body.tipo_mascota_0,
                  body.raza_mascota_0,
                  'algo', // No tengo información sobre el tamaño, así que he dejado 'algo' como marcador de posición
                  body.edad_mascota_0,
                  body.sexo_mascota_0,
                  body.condicion_mascota_0,
                  body.alergia_mascota_0,
                  body.sobre_mascota_0,
                ],
              };
              
              // Ejecutar la consulta
              client.query(query2)
                .then(res => {
                  console.log('Filas afectadas:', res.rowCount);
                })
                .catch(err => {
                  console.error('Error al ejecutar la consulta:', err);
                })
                .finally(() => {
                  // Cerrar la conexión a la base de datos
                  
                });

            /* const mascota_0 = await client.sql`INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) 
            VALUES (${idUsuario.rows[0].usuarioid}, '${body.nombre_mascota_0}', '${body.tipo_mascota_0}', '${body.raza_mascota_0}', 'algo', ${body.edad_mascota_0}, '${body.sexo_mascota_0}', '${body.condicion_mascota_0}', '${body.alergia_mascota_0}', '${body.sobre_mascota_0}');`; */

            const idMascota_0 = await client.sql`SELECT mascotaid FROM mascotas WHERE usuarioid = ${idUsuario.rows[0].usuarioid};`;

            /* const newPath = `./src/public/images/upload/${files[1].originalname}`
            fs.renameSync(files[1].path, newPath)
            const truePath = `./src/public/images/images_mascotas/${idMascota_0.rows[0].mascotaid}/${files[1].originalname}` 
            fs.mkdirSync(`./src/public/images/images_mascotas/${idMascota_0.rows[0].mascotaid}`, {recursive: true}) 
            fs.copyFileSync(newPath, truePath)
            fs.unlinkSync(newPath) */

            const imageFile = fs.readFileSync(files[1].path, { encoding: 'base64' });
            let url_imagen_mascota
            try {
              // Configurar la solicitud POST con la imagen y las credenciales
              const response = await axios.post(uploadUrl, {
                image: imageFile
              }, {
                headers: {
                  'Authorization': `Client-ID ${clientId}`
                }
              });
              
              // Imprimir la URL de la imagen subida
              console.log('Image uploaded successfully:', response.data.data.link);
              url_imagen_mascota = response.data.data.link 
              // Devolver la URL de la imagen subida
              
            } catch (error) {
              // Manejar cualquier error que ocurra durante la carga de la imagen
              console.error('Error uploading image:', error.message);
              res.status(500).json({ error: 'Error al subir la imagen' });
              
            }
           

            const query3 = {
                text: `INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) 
                          VALUES ($1, $2)`,
                values: [
                  idMascota_0.rows[0].mascotaid,
                  url_imagen_mascota,
                ],
              };
              
              // Ejecutar la consulta
              client.query(query3)
                .then(res => {
                  console.log('Filas afectadas:', res.rowCount);
                })
                .catch(err => {
                  console.error('Error al ejecutar la consulta:', err);
                })
                .finally(() => {
                  // Cerrar la conexión a la base de datos
                  
                });
    
            /* const foto_mascota_0 = await client.sql`INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) 
            VALUES (${idMascota_0.rows[0].mascotaid}, '${files[1].originalname}');`; */
            

        }
         
        if(body.nombre_mascota_1){

            const query4 = {
                text: `INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) 
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                values: [
                  idUsuario.rows[0].usuarioid,
                  body.nombre_mascota_1,
                  body.tipo_mascota_1,
                  body.raza_mascota_1,
                  'algo', // No tengo información sobre el tamaño, así que he dejado 'algo' como marcador de posición
                  body.edad_mascota_1,
                  body.sexo_mascota_1,
                  body.condicion_mascota_1,
                  body.alergia_mascota_1,
                  body.sobre_mascota_1,
                ],
              };
              
              // Ejecutar la consulta
              client.query(query4)
                .then(res => {
                  console.log('Filas afectadas:', res.rowCount);
                })
                .catch(err => {
                  console.error('Error al ejecutar la consulta:', err);
                })
                .finally(() => {
                  // Cerrar la conexión a la base de datos
                  
                });

            const idMascota_1 = await client.sql`SELECT mascotaid FROM mascotas WHERE usuarioid = ${idUsuario.rows[0].usuarioid};`;

            const newPath3 = `./src/public/images/upload/${files[2].originalname}`
            fs.renameSync(files[2].path, newPath3)
            const truePath3 = `./src/public/images/images_mascotas/${idMascota_1.rows[1].mascotaid}/${files[2].originalname}` 
            fs.mkdirSync(`./src/public/images/images_mascotas/${idMascota_1.rows[1].mascotaid}`, {recursive: true}) 
            fs.copyFileSync(newPath3, truePath3)
            fs.unlinkSync(newPath3)
            
    
            const query5 = {
                text: `INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) 
                          VALUES ($1, $2)`,
                values: [
                  idMascota_1.rows[1].mascotaid,
                  files[2].originalname,
                ],
              };
              
              // Ejecutar la consulta
              client.query(query5)
                .then(res => {
                  console.log('Filas afectadas:', res.rowCount);
                })
                .catch(err => {
                  console.error('Error al ejecutar la consulta:', err);
                })
                .finally(() => {
                  // Cerrar la conexión a la base de datos
                  
                });      
    
        }   

        
        if(body.nombre_mascota_2){

          const query5 = {
              text: `INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
              values: [
                idUsuario.rows[0].usuarioid,
                body.nombre_mascota_1,
                body.tipo_mascota_1,
                body.raza_mascota_1,
                'algo', // No tengo información sobre el tamaño, así que he dejado 'algo' como marcador de posición
                body.edad_mascota_1,
                body.sexo_mascota_1,
                body.condicion_mascota_1,
                body.alergia_mascota_1,
                body.sobre_mascota_1,
              ],
            };
            
            // Ejecutar la consulta
            client.query(query5)
              .then(res => {
                console.log('Filas afectadas:', res.rowCount);
              })
              .catch(err => {
                console.error('Error al ejecutar la consulta:', err);
              })
              .finally(() => {
                // Cerrar la conexión a la base de datos
                
              });

          const idMascota_2 = await client.sql`SELECT mascotaid FROM mascotas WHERE usuarioid = ${idUsuario.rows[0].usuarioid};`;

          const newPath4 = `./src/public/images/upload/${files[3].originalname}`
          fs.renameSync(files[3].path, newPath4)
          const truePath4 = `./src/public/images/images_mascotas/${idMascota_2.rows[2].mascotaid}/${files[3].originalname}` 
          fs.mkdirSync(`./src/public/images/images_mascotas/${idMascota_2.rows[2].mascotaid}`, {recursive: true}) 
          fs.copyFileSync(newPath4, truePath4)
          fs.unlinkSync(newPath4)
          
  
          const query6 = {
              text: `INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) 
                        VALUES ($1, $2)`,
              values: [
                idMascota_2.rows[2].mascotaid,
                files[3].originalname,
              ],
            };
            
            // Ejecutar la consulta
            client.query(query6)
              .then(res => {
                console.log('Filas afectadas:', res.rowCount);
              })
              .catch(err => {
                console.error('Error al ejecutar la consulta:', err);
              })
              .finally(() => {
                // Cerrar la conexión a la base de datos
                
              });      
  
      }  

      if(body.nombre_mascota_3){

        const query4 = {
            text: `INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) 
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            values: [
              idUsuario.rows[0].usuarioid,
              body.nombre_mascota_1,
              body.tipo_mascota_1,
              body.raza_mascota_1,
              'algo', // No tengo información sobre el tamaño, así que he dejado 'algo' como marcador de posición
              body.edad_mascota_1,
              body.sexo_mascota_1,
              body.condicion_mascota_1,
              body.alergia_mascota_1,
              body.sobre_mascota_1,
            ],
          };
          
          // Ejecutar la consulta
          client.query(query4)
            .then(res => {
              console.log('Filas afectadas:', res.rowCount);
            })
            .catch(err => {
              console.error('Error al ejecutar la consulta:', err);
            })
            .finally(() => {
              // Cerrar la conexión a la base de datos
              
            });

        const idMascota_3 = await client.sql`SELECT mascotaid FROM mascotas WHERE usuarioid = ${idUsuario.rows[0].usuarioid};`;

        const newPath3 = `./src/public/images/upload/${files[4].originalname}`
        fs.renameSync(files[4].path, newPath3)
        const truePath3 = `./src/public/images/images_mascotas/${idMascota_3.rows[3].mascotaid}/${files[4].originalname}` 
        fs.mkdirSync(`./src/public/images/images_mascotas/${idMascota_3.rows[3].mascotaid}`, {recursive: true}) 
        fs.copyFileSync(newPath3, truePath3)
        fs.unlinkSync(newPath3)
        

        const query5 = {
            text: `INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) 
                      VALUES ($1, $2)`,
            values: [
              idMascota_3.rows[3].mascotaid,
              files[4].originalname,
            ],
          };
          
          // Ejecutar la consulta
          client.query(query5)
            .then(res => {
              console.log('Filas afectadas:', res.rowCount);
            })
            .catch(err => {
              console.error('Error al ejecutar la consulta:', err);
            })
            .finally(() => {
              // Cerrar la conexión a la base de datos
             
            });      

    }  

    if(body.nombre_mascota_4){

      const query4 = {
          text: `INSERT INTO mascotas (usuarioid, nombre_mascota, tipo_mascota, raza, tamaño, edad, genero, condicion, alergias, info_mascota) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          values: [
            idUsuario.rows[0].usuarioid,
            body.nombre_mascota_1,
            body.tipo_mascota_1,
            body.raza_mascota_1,
            'algo', // No tengo información sobre el tamaño, así que he dejado 'algo' como marcador de posición
            body.edad_mascota_1,
            body.sexo_mascota_1,
            body.condicion_mascota_1,
            body.alergia_mascota_1,
            body.sobre_mascota_1,
          ],
        };
        
        // Ejecutar la consulta
        client.query(query4)
          .then(res => {
            console.log('Filas afectadas:', res.rowCount);
          })
          .catch(err => {
            console.error('Error al ejecutar la consulta:', err);
          })
          .finally(() => {
            // Cerrar la conexión a la base de datos
            
          });

      const idMascota_1 = await client.sql`SELECT mascotaid FROM mascotas WHERE usuarioid = ${idUsuario.rows[0].usuarioid};`;

      const newPath3 = `./src/public/images/upload/${files[5].originalname}`
      fs.renameSync(files[5].path, newPath3)
      const truePath3 = `./src/public/images/images_mascotas/${idMascota_1.rows[4].mascotaid}/${files[5].originalname}` 
      fs.mkdirSync(`./src/public/images/images_mascotas/${idMascota_1.rows[4].mascotaid}`, {recursive: true}) 
      fs.copyFileSync(newPath3, truePath3)
      fs.unlinkSync(newPath3)
      

      const query5 = {
          text: `INSERT INTO imagenes_mascotas (mascotaid, url_imagen_mascota) 
                    VALUES ($1, $2)`,
          values: [
            idMascota_1.rows[4].mascotaid,
            files[5].originalname,
          ],
        };
        
        // Ejecutar la consulta
        client.query(query5)
          .then(res => {
            console.log('Filas afectadas:', res.rowCount);
          })
          .catch(err => {
            console.error('Error al ejecutar la consulta:', err);
          })
          .finally(() => {
            // Cerrar la conexión a la base de datos
            
          });      

    }  
    client.end();
     res.send({
      msg: "correcto", 
      ruta: "/login"
      }) 
  } else {
    client.end();
      res.send({
        msg: "email", 
        ruta: ""
      }) 
  }

        } catch (error) {
          
          return res.status(500).json({error});

        }
        
        
  
    
    

    

    /* const result3 = await client.sql`INSERT INTO alojamientos (costo_alojamiento, usuarioid, tipo_alojamiento, aire_libre, cercado, parque_cerca, descripcion, condiciones, moneda, link_ubicacion, fecha_disponible) VALUES (38.000, 6, 'Casa', 'Patio', 'Si', 'Si', 'Mi casa con patio ofrece un entorno acogedor y seguro para mi mascota. El patio trasero es un espacio al aire libre donde mi mascota puede jugar, explorar y relajarse cómodamente. Contamos con áreas sombreadas y soleadas donde puede descansar y tomar el sol. Además, disponemos de juguetes y equipamiento adecuado para su entretenimiento, como pelotas, cuerdas para tirar y juegos de inteligencia. El patio está vallado para garantizar su seguridad y prevenir cualquier escape. También tenemos un área designada para sus necesidades fisiológicas, con superficies adecuadas para que pueda hacer sus necesidades de manera cómoda y limpia. En resumen, nuestro patio ofrece un espacio tranquilo y agradable donde mi mascota puede disfrutar del aire libre y mantenerse activa y feliz.', 'No recibo mascotas que pueden experimentar reacciones adversas al estrés, como ansiedad extrema, ataques de pánico o comportamiento autodestructivo.', 'AR', 'https://www.google.com/maps/place/Museo+del+%C3%81rea+Fundacional/@-32.879746,-68.830551,17.01z/data=!4m6!3m5!1s0x967e09275a9e6c89:0x2f50e603cd8afee2!8m2!3d-32.8797909!4d-68.8279529!16s%2Fg%2F120m0nj1?entry=ttu', '2024/04/30');`;
    console.log(result3.rowCount) */

    
    /* const result4 = await client.sql`INSERT INTO imagenes_alojamientos (alojamientosid, url_imagen_alojamiento) VALUES ('4', 'casa_E_usuario_4.jpg');`;
    console.log(result4.rowCount) */

    
    
}