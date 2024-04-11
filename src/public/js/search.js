const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://infra.datos.gob.ar/georef/provincias.json'
function searchApi() {

    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
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
        .finally(() => {
            console.log("fin")
        })
}

searchApi()