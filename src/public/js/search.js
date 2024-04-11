    
async function searchApi(){    
    const url = `https://infra.datos.gob.ar/georef/provincias.json`;
            
            var request = new Request(url, {
                method: 'GET',
                /* body: fd,
                headers: new Headers() */
            });
            await fetch(request)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("ubicacion").innerHTML = ""
                    console.log(data)
                    /* data.map((data) => {
                        document.getElementById("ulSearch").innerHTML += `
                        <li style="overflow: hidden;
                        white-space: nowrap; text-overflow: ellipsis;" onclick="agregarNombre('${data.Name}')">
                            <a class="dropdown-item" href="#">
                                ${data.Name} 
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        `
                    }) */
                })
}