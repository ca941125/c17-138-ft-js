

function postFetch() {
    const url = '/login';
    /* let fd = new FormData(); */
    /* fd = document.getElementById('formLogin') */
    /* fd.append("name", document.getElementById("name").value);
    fd.append("info", document.getElementById("info").value);
    fd.append("imagenAnime", document.getElementById("imagenAnime").files[0]); */
    let form = {
        email: document.getElementById('email').value,
        pass: document.getElementById('password').value
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
}

document.getElementById('submit').addEventListener('click', () => {
    postFetch()
})