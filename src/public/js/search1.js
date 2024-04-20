
const url = '../json/provincias.json'
function searchApi() {
    document.getElementById("ubicacion").innerHTML = "<option value=''></option>"
    fetch(url)
        .then(data => data.json())
        .then(data1 => {

            //console.log(data1.provincias)
            data1.provincias.map((data) => {
                document.getElementById("ubicacion1").innerHTML += `
                    <option value="${data.nombre}">
                        ${data.nombre} 
                    </option>
                  `
            })
        })
}

searchApi()