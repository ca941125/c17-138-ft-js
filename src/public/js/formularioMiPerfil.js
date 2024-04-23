


const url = 'json/provincias.json'
function searchApi() {
    document.getElementById("opcionProvincia").innerHTML = "<option value=''></option>"
    fetch(url)
        .then(data => data.json())
        .then(data => {

            let oData = data.provincias.sort((a,b)=> (a.nombre > b.nombre ? 1 : -1))
            //console.log(data1.provincias)
            oData.map((data) => {
                document.getElementById("opcionProvincia").innerHTML += `
                    <option value="${data.nombre}">
                        ${data.nombre} 
                    </option>
                  `
            })
        })
}

searchApi()

const url1 = 'json/departamentos.json'
document.getElementById('opcionProvincia').addEventListener('change', () => {
    const provincia = document.getElementById("opcionProvincia").value
    document.getElementById("opcionCiudad").innerHTML = "<option value=''></option>"
    fetch(url1)
        .then(data => data.json())
        .then(data => {
            /* console.log(data.departamentos) */

            let oData = data.departamentos.sort((a,b)=> (a.nombre > b.nombre ? 1 : -1))
            

            oData.map( (ciudad) => {
                if(ciudad.provincia.nombre === provincia) {
                    document.getElementById("opcionCiudad").innerHTML += `
                    <option value="${ciudad.nombre}">
                        ${ciudad.nombre} 
                    </option>
                  `
                }

            })

        })
})

document.getElementById('formularioMiMascota').addEventListener('submit', function(event) {
    event.preventDefault()
})

let foto
let k = 0
document.getElementById('foto-mascota').addEventListener('change', () => {
    foto = document.getElementById('foto-mascota').files[0]
    objectURL = (window.URL || window.webkitURL).createObjectURL(foto)
    document.getElementById('svg').setAttribute('style', 'display: none')
    document.getElementById('img').setAttribute('src', `${objectURL}`)
})

let foto1

document.getElementById('avatar-input').addEventListener('change', () => {
    foto1 = document.getElementById('avatar-input').files[0]
    objectURL1 = (window.URL || window.webkitURL).createObjectURL(foto1)
    document.getElementById('svg1').setAttribute('style', 'display: none')
    document.getElementById('img1').setAttribute('src', `${objectURL1}`)
})

let user

document.getElementById('submit').addEventListener('click', () => {
    if(validarContraseña()){
        
        let nombres = document.getElementById('nombre').value
        let apellidos = document.getElementById('apellido').value
        let email = document.getElementById('email').value
        let pass = document.getElementById('password').value
        let provincia = document.getElementById('opcionProvincia').value
        let ciudad = document.getElementById('opcionCiudad').value
        let telefono = document.getElementById('telefono').value
        let celular = document.getElementById('celular').value
        let sobre_mi = document.getElementById('sobreMi').value

        if(foto1.name !== '' && nombres !== '' && apellidos !== '' && email !== '' && pass !== '' && provincia !== '' && ciudad !== '' && telefono !== '' && celular !== '' && sobre_mi !== ''){
            
            user = {
                nombres_user: nombres,
                apellidos_user: apellidos,
                email_user: email,
                pass_user: pass,
                provincia_user: provincia,
                ciudad_user: ciudad,
                telefono_user: telefono,
                celular_user: celular,
                sobre_mi_user: sobre_mi, 
                foto_user: foto1,
                foto: objectURL1
            }
        }

    }

    if(mascotas.length > 0){
        postFetch()
    }
})

function postFetch() {
    const url = '/register';
    /* let body = {
        user,
        mascotas,
    } */

    var newfile  = {
        'lastModified'     : user.foto_user.lastModified,
        'lastModifiedDate' : user.foto_user.lastModifiedDate,
        'name'             : user.foto_user.name,
        'size'             : user.foto_user.size,
        'type'             : user.foto_user.type,
        'path'             : user.foto
     };  
 
    let fd = new FormData();
        fd.append("nombres_user", user.nombres_user);
        fd.append("apellidos_user", user.apellidos_user);
        fd.append("email_user", user.email_user);
        fd.append("pass_user", user.pass_user);
        fd.append("provincia_user", user.provincia_user);
        fd.append("ciudad_user", user.ciudad_user);
        fd.append("telefono_user", user.telefono_user);
        fd.append("celular_user", user.celular_user);
        fd.append("sobre_mi_user", user.sobre_mi_user);
        fd.append("foto_user", user.foto_user);
        fd.append("mascotas_user", mascotas.length);
        /* const formData = new URLSearchParams(fd) */
        let m = 0
        mascotas.map( (mascota) => {
            fd.append(`nombre_mascota_${m}`, mascota.nombre_mascota)
            fd.append(`raza_mascota_${m}`, mascota.raza_mascota)
            fd.append(`sexo_mascota_${m}`, mascota.sexo_mascota)
            fd.append(`edad_mascota_${m}`, mascota.edad_mascota)
            fd.append(`condicion_mascota_${m}`, mascota.condicion_mascota)
            fd.append(`alergia_mascota_${m}`, mascota.alergia_mascota)
            fd.append(`sobre_mascota_${m}`, mascota.sobre_mascota)
            fd.append(`foto_mascota_${m}`, mascota.foto_mascota)
            fd.append(`tipo_mascota_${m}`, mascota.tipo_mascota)
            m++
        })

    var request = new Request(url, {
        method: 'POST',
        body: fd,
        headers: {
            /* "Content-Type": "multipart/form-data", */
            /* "Content-Type": "application/x-www-form-urlencoded", */
        }, 
    });
    fetch(request)
    .then(response => response.json())
    .then( data => {
        console.log(data)
    })
}


function validarContraseña(){
    return true
}

let mascotas = []
let m = 0
document.getElementById('guardarMascota').addEventListener('click', () => {

    /* let foto = document.getElementById('foto-mascota').files[0] */
    let nombre = document.getElementById('nombreMascota').value
    let raza = document.getElementById('raza').value
    let sexo = document.getElementById('sexo').value
    let edad = document.getElementById('edad').value
    let salud = document.getElementById('salud').value
    let alergia = document.getElementById('alergia').value
    let sobre = document.getElementById('sobreMiMascota').value

    if(foto.name !== '' && nombre !== '' && raza !== '' && edad !== '' && salud !== '' && alergia !== '' && sobre !== ''){
    
    let mascota = {
        foto_mascota: foto,
        nombre_mascota: nombre,
        raza_mascota: raza,
        sexo_mascota: sexo,
        edad_mascota: edad,
        condicion_mascota: salud,
        alergia_mascota: alergia,
        sobre_mascota: sobre,
        id_mascota: m,
        foto_url: objectURL,
        tipo_mascota: 'Perro'
    }
    const url = window.URL || window.webkitURL;
    objectURL = url.createObjectURL(foto)
    /* images/usuarios/usuario-1/perfil_mascota_1.jpg */
    mascotas.push(mascota)
    actualizarCardsMascotas()
    /* console.log(mascotas) */
    
    m++

    document.getElementById('formularioMiMascota').setAttribute('style', 'display: none')
    document.getElementById('svg').removeAttribute('style')
    document.getElementById('img').removeAttribute('src')
    }


})

function agregarMascota(){
    document.getElementById('formularioMiMascota').removeAttribute('style')
    document.getElementById('svg').removeAttribute('style')
    document.getElementById('img').removeAttribute('src')
    document.getElementById('guardarMascota').removeAttribute('style')
    document.getElementById('editarDatos').removeAttribute('onclick')
        document.getElementById('editarDatos').setAttribute('style', 'display: none')
        document.getElementById('foto-mascota').value = ''
        document.getElementById('nombreMascota').value = ''
        document.getElementById('raza').value = ''
        document.getElementById('sexo').value = ''
        document.getElementById('edad').value = ''
        document.getElementById('salud').value = ''
        document.getElementById('alergia').value = ''
        document.getElementById('sobreMiMascota').value = ''
}

function editarCard(id){
    for(let i = 0; i < mascotas.length; i++){
        if(mascotas[i].id_mascota === id){
            document.getElementById('formularioMiMascota').removeAttribute('style')
            document.getElementById('svg').setAttribute('style', 'display: none')
            document.getElementById('guardarMascota').setAttribute('style', 'display: none')
            document.getElementById('editarDatos').removeAttribute('style')
            document.getElementById('editarDatos').setAttribute('onclick', `updateCard(${mascotas[i].id_mascota})`)
            document.getElementById('img').setAttribute('src', `${mascotas[i].foto_url}`)
            /* document.getElementById('foto-mascota').value = mascotas[i].foto_mascota */
            document.getElementById('nombreMascota').value = mascotas[i].nombre_mascota
            document.getElementById('raza').value = mascotas[i].raza_mascota
            document.getElementById('sexo').value = mascotas[i].sexo_mascota
            document.getElementById('edad').value = mascotas[i].edad_mascota
            document.getElementById('salud').value = mascotas[i].condicion_mascota
            document.getElementById('alergia').value = mascotas[i].alergia_mascota
            document.getElementById('sobreMiMascota').value = mascotas[i].sobre_mascota
        }
    }

    
}

function updateCard(id){
    let k = 0
    for(let j = 0; j < mascotas.length; j++){
        if(foto === mascotas[j].foto_mascota){
            k++
        }  
    }
    for(let i = 0; i < mascotas.length; i++){
        if(mascotas[i].id_mascota === id){
            document.getElementById('formularioMiMascota').setAttribute('style', 'display: none')
            document.getElementById('svg').removeAttribute('style')
            document.getElementById('img').removeAttribute('src')
            document.getElementById('editarDatos').removeAttribute('onclick')
            document.getElementById('editarDatos').setAttribute('style', 'display: none')
            document.getElementById('guardarMascota').removeAttribute('style')
            /* if(foto !== document.getElementById('foto-mascota').files[0]){
                
            } */
             if(k === 0){
                mascotas[i].foto_mascota = document.getElementById('foto-mascota').files[0]
                mascotas[i].foto_url = objectURL
            }          
            mascotas[i].nombre_mascota = document.getElementById('nombreMascota').value 
            mascotas[i].raza_mascota = document.getElementById('raza').value
            mascotas[i].sexo_mascota = document.getElementById('sexo').value
            mascotas[i].edad_mascota = document.getElementById('edad').value
            mascotas[i].condicion_mascota = document.getElementById('salud').value
            mascotas[i].alergia_mascota = document.getElementById('alergia').value
            mascotas[i].sobre_mascota = document.getElementById('sobreMiMascota').value
            
            
        }
        
    }
    actualizarCardsMascotas()
}

function actualizarCardsMascotas(){
    document.getElementById('cardMascotas').innerHTML = ''
    mascotas.map((mascota) =>{       
        document.getElementById('cardMascotas').innerHTML += `
        <article class="mascota__card bg-blanco-1 br-8" id="card${mascota.id_mascota}">
                <img class="mascota__avatar" src="${mascota.foto_url}"  alt="imagen del perl de la mascota">
                <div class="mascota__detalle">
                    <h3 class="f-hsb c-texto">${mascota.nombre_mascota}</h3>
                    <section class="mascota__dato">
                        <h3 class="f-bmb c-texto-gris">Raza:</h3>
                        <p  class="f-bm c-texto-gris " id="mastotaDatoRaza">${mascota.raza_mascota}</p>
                    </section>
                    <section class="mascota__dato">
                        <h3 class="f-bmb c-texto-gris">Edad:</h3>
                        <p  class="f-bm c-texto-gris " id="mastotaDatoEdad">${mascota.edad_mascota} años</p>
                    </section>
                    <section class="mascota__dato">
                        <h3  class="f-bmb c-texto-gris">Sexo:</h3>
                        <p  class="f-bm c-texto-gris " id="mastotaDatoSexo">${mascota.sexo_mascota}</p>
                    </section>
                </div>
                <button class="btt-3" onclick="editarCard(${mascota.id_mascota})">Editar</button>
            </article>
        `
    })
    document.getElementById('cardMascotas').innerHTML += `
            <article class="mascota__card bg-blanco-1 br-8" >
                <button id="agregarMascota" onclick="agregarMascota()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                        <path d="M32.5 0C14.827 0 0.5 14.327 0.5 32C0.5 49.674 14.827 64 32.5 64C50.174 64 64.5 49.674 64.5 32C64.5 14.327 50.174 0 32.5 0ZM32.5 60.063C17.061 60.063 4.5 47.439 4.5 31.9999C4.5 16.5609 17.061 3.99988 32.5 3.99988C47.939 3.99988 60.5 16.5609 60.5 31.9999C60.5 47.4388 47.939 60.063 32.5 60.063ZM46.5 30H34.5V18C34.5 16.896 33.604 16 32.5 16C31.396 16 30.5 16.896 30.5 18V30H18.5C17.396 30 16.5 30.896 16.5 32C16.5 33.104 17.396 34 18.5 34H30.5V46C30.5 47.104 31.396 48 32.5 48C33.604 48 34.5 47.104 34.5 46V34H46.5C47.604 34 48.5 33.104 48.5 32C48.5 30.896 47.604 30 46.5 30Z" fill="#1D2621"/>
                        </svg>
                </button>
            </article>
    `
}
