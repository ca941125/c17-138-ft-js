
const url = 'json/provincias.json'
function searchApi() {
    document.getElementById("ubicacion1").innerHTML = "<option value=''></option>"
    fetch(url)
        .then(data => data.json())
        .then(data => {

            //console.log(data1.provincias)
            let oData = data.provincias.sort((a,b)=> (a.nombre > b.nombre ? 1 : -1))
            //console.log(data1.provincias)
            oData.map((data) => {
                document.getElementById("ubicacion1").innerHTML += `
                    <option value="${data.nombre}">
                        ${data.nombre} 
                    </option>
                  `
            })
        })
}

searchApi()