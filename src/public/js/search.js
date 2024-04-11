
const url = 'https://infra.datos.gob.ar/georef/provincias.json'
function searchApi() {

    fetch(url, { mode: 'no-cors'})
        .then(data => data.json())
        .then(data1 => {

            console.log(data1)
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

searchApi()