// Obtener el ID de la categoría almacenado en localStorage
const catID = localStorage.getItem("catID"); 
// URL de la API con el ID de la categoría
const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

getJSONData = function(url) {
    let result = {};
    return fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject(Error(response.statusText)))
      .then(response => ({ status: 'ok', data: response }))
      .catch(error => ({ status: 'error', data: error }));
  }

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(url).then(function(respObj) {
        if (respObj.status == "ok") {
            console.log(respObj.data.products);
            mostrarAutos(respObj.data.products);
        }
    });
});

//Para que funcione el usuario y el cerrar sesión en la barra de navegación
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('nombreDeUsuario').textContent = loggedInUser;
    }
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser'); // Cierra sesión
        window.location.href = 'login.html'; // Redirige al usuario a la página de inicio de sesión
    });
});

function mostrarAutos(arreglo) {
    const mostrar = document.querySelector("#mostrar .row"); 
    let cardsHTML = ''; 

    arreglo.forEach(element => {
        cardsHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card" style="width: 100%;">
                    <img src="${element.image || 'img/default-product.jpg'}" class="card-img-top" alt="${element.name}">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="card-text">Cantidad vendidos: ${element.soldCount}</p>
                        <p class="card-text price"><strong>${element.currency} ${element.cost}</strong></p>
                         <a href="javascript:void(0)" onclick="guardarProductoYRedirigir(${element.id})" class="btn btn-primary">Ver Producto</a>
                    </div>
                </div>
            </div>
        `;
    });

    mostrar.innerHTML = cardsHTML; 
}

function guardarProductoYRedirigir(productID) {
    localStorage.setItem("productID", productID); 
    window.location.href = "product-info.html"; 
}

