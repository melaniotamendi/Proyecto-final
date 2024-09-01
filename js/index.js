document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('nombreDeUsuario').textContent = loggedInUser;
    }
});
