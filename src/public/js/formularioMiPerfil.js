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