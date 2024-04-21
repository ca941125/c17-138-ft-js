let i = 0
let j = 0
function postFetch() {
    const url = '/resultado-busqueda';
    /* let fd = new FormData(); */
    /* fd = document.getElementById('formLogin') */
    /* fd.append("name", document.getElementById("name").value);
    fd.append("info", document.getElementById("info").value);
    fd.append("imagenAnime", document.getElementById("imagenAnime").files[0]); */
    let form = {
        indice: i
    }
    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    fetch(request)
    .then(response => response.json())
    .then(alojamientos => {
        /* console.log(alojamientos) */
        alojamientos.map((alojamientos) => {

            document.getElementById('cards').innerHTML += `


                <div class="paraTiCard bg-blanco-1 br-8">
                    <div class="imgCard br-8">
                        <img src="images/images_perfil/${alojamientos.usuarioid}/${alojamientos.foto_url}" alt="">
                    </div>
                    <div class="cuerpoCard">
                        <div class="esp">
                            <div class="nombreCard">
                                <div>
                                    <p class="f-hsb">${alojamientos.nombres} <br>${alojamientos.apellidos}</p>
                                    <p class="f-bm">${alojamientos.ciudad}, ${alojamientos.provincia}</p>
                                </div>
                                <div class="clasif">
                                    <img src="images/icons/estrella.svg" alt="">
                                    <span class="f-bm">5.0</span>
                                </div>
                            </div>
                            <div id="iconosCard${alojamientos.usuarioid}${j}" class="iconosCard">
                                                                                                                                                              
                            </div>
                            <p class="f-bm c-texto-gris" >
                                ${alojamientos.resumen_card}
                            </p>
                        </div>
                        <div class="precioCard">
                            <div class="izq">
                                <span class="f-tlb">$${alojamientos.costo_alojamiento}</span>
                                <p class="f-ll">${alojamientos.moneda}/noche</p>
                            </div>
                            <div class="der">
                                <button class="btt-1"><a href="/alojamientos/${alojamientos.usuarioid}">Ver más</a></button>
                            </div>
                        </div>
                    </div>
                </div>
        `
        if(alojamientos.mascotas[0].tipo_mascota === 'Perro') {
            document.getElementById(`iconosCard${alojamientos.usuarioid}${j}`).innerHTML += `
            <div class="iconText">
                <img src="images/icons/perro-verde.svg" alt="">
                <p class="f-bm c-primario">${alojamientos.mascotas.length} ${alojamientos.mascotas[0].tipo_mascota}</p>
            </div>`
        } else {
            document.getElementById(`iconosCard${alojamientos.usuarioid}${j}`).innerHTML += `
            <div class="iconText">
                <img src="images/icons/gato-verde.svg" alt="">
                <p class="f-bm c-primario">${alojamientos.mascotas.length} ${alojamientos.mascotas[0].tipo_mascota}</p>
            </div>`
        }                            
             
    
        if(alojamientos.tipo_alojamiento === 'Casa') {
            document.getElementById(`iconosCard${alojamientos.usuarioid}${j}`).innerHTML += `
            <div class="iconText">
                <img src="images/icons/casa-verde.svg" alt="">
                <p class="f-bm c-primario">${alojamientos.tipo_alojamiento}</p>
            </div>`
        } else {
            document.getElementById(`iconosCard${alojamientos.usuarioid}${j}`).innerHTML += `
            <div class="iconText">
                <img src="images/icons/edificio-verde.svg" alt="">
                <p class="f-bm c-primario">${alojamientos.tipo_alojamiento}</p>
            </div>`
        }   
        
    
        if(alojamientos.aire_libre === 'Jardin' || alojamientos.aire_libre === 'Patio') {
            document.getElementById(`iconosCard${alojamientos.usuarioid}${j}`).innerHTML += `
            <div class="iconText">
                <img src="images/icons/jardin-verde.svg" alt="">
                <p class="f-bm c-primario">${alojamientos.aire_libre}</p>
            </div>`
        } else if(alojamientos.parque_cerca === 'Si'){
            document.getElementById(`iconosCard${alojamientos.usuarioid}${j}`).innerHTML += `
            <div class="iconText">
                <img src="images/icons/plaza-cerca-verde.svg" alt="">  
                <p class="f-bm c-primario">Parque <br>cerca</p>  
            </div>`                             
        }
        
        
    if(alojamientos.cercado === 'Si') {
        document.getElementById(`iconosCard${alojamientos.usuarioid}${j}`).innerHTML += `
        <div class="iconText">
            <img src="images/icons/cerco-verde.svg" alt="">
            <p class="f-bm c-primario">Cercado</p>
        </div>`    
    }
    j++
        })      
    })
    
    /* i++ */
}

document.getElementById('cargarMas').addEventListener('click', () => {
    postFetch()
})