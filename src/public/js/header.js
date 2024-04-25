document.getElementById("menu-desplegable").addEventListener("click", function() {
    let dropdownMenu = document.getElementById("dropdown-menu");
    if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
    } else {
        dropdownMenu.style.display = "block";
    }
});

document.getElementById("profile-image").addEventListener("click", function() {
    let dropdownPerfil = document.getElementById("dropdown-perfil");
    if (dropdownPerfil.style.display === "block") {
        dropdownPerfil.style.display = "none";
    } else {
        dropdownPerfil.style.display = "block";
    }
});

