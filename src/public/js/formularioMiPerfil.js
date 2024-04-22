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

document.getElementById('guardarMascota').addEventListener('click', () => {
    const foto_mascota = document.getElementById('foto-mascota').files[0]
    console.log(foto_mascota)
    let mascota = {
        foto_mascota: document.getElementById('foto-mascota').files[0],
        nombre_mascota: document.getElementById('nombreMascota').value,
        raza_mascota: document.getElementById('raza').value,
        sexo_mascota: document.getElementById('sexo').value,
        condicion_mascota: document.getElementById('salud').value,
        alergia_mascota: document.getElementById('alergia').value,
        sobre_mascota: document.getElementById('sobreMiMascota').value
    }

    let mascotas = []
    mascotas.push(mascota)
    console.log(mascotas)
})




