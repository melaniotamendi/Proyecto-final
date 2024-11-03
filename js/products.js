const catID = localStorage.getItem("catID"); 
const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

getJSONData = function(url) {
    let result = {};
    return fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject(Error(response.statusText)))
      .then(response => ({ status: 'ok', data: response }))
      .catch(error => ({ status: 'error', data: error }));
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search-input');
    let products = [];

    // Obtener datos de productos al cargar la página
    getJSONData(url).then(function(respObj) {
        if (respObj.status == "ok") {
            products = respObj.data.products; 
            mostrarAutos(products); 
        }
    });

   // Buscador
   searchInput.addEventListener('input', function() {
       const searchTerm = searchInput.value.toLowerCase();
       const filteredProducts = products.filter(product =>
           product.name.toLowerCase().includes(searchTerm) ||
           product.description.toLowerCase().includes(searchTerm)
       );
       mostrarAutos(filteredProducts); // Muestra solo los productos filtrados
   });

   // Botones de ordenar y filtros
   document.getElementById('menorPrecio').addEventListener('click', function() {
       const ordenMenorPrecio = [...products].sort((a, b) => a.cost - b.cost);
       mostrarAutos(ordenMenorPrecio);
   });

   document.getElementById('mayorPrecio').addEventListener('click', function() {
       const ordenMayorPrecio = [...products].sort((a, b) => b.cost - a.cost);
       mostrarAutos(ordenMayorPrecio);
   });

   document.getElementById('masVendidos').addEventListener('click', function() {
       const ordenMasVendidos = [...products].sort((a, b) => b.soldCount - a.soldCount);
       mostrarAutos(ordenMasVendidos);
   });

//Filtra por rango de pracio 
   document.getElementById('filtrarPrecio').addEventListener('click', function() {
    const minPriceInput = document.getElementById('minPrice');  
    const maxPriceInput = document.getElementById('maxPrice');  

    const minPrice = parseFloat(minPriceInput.value) || 0; 
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity; 

    const filteredByPrice = products.filter(product => 
        product.cost >= minPrice && product.cost <= maxPrice
    );
    mostrarAutos(filteredByPrice); 
});


// Limpiar los filtros y mostrar todos los productos otra vez
document.getElementById('limpiarFiltros').addEventListener('click', function() {
    const minPriceInput = document.getElementById('minPrice');  
    const maxPriceInput = document.getElementById('maxPrice');  

    minPriceInput.value = '';  
    maxPriceInput.value = '';
    mostrarAutos(products); 
});

   // Para que funcione el usuario y el cerrar sesión en la barra de navegación
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

function actualizarBadgeCarrito() {
    const nombreDeUsuario = localStorage.getItem("loggedInUser");
    if (!nombreDeUsuario) {
        return; // No actualiza si no hay un usuario conectado
    }
  
    const carritoKey = `carrito_${nombreDeUsuario}`;
    let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
  
    // Suma la cantidad total de productos, asegurándote de que sea numérica
    let cantidadTotal = carrito.reduce((total, producto) => total + parseInt(producto.cantidad || 0, 10), 0);
  
    // Actualiza el contenido del badge
    document.getElementById('badge-carrito').textContent = cantidadTotal;
    document.getElementById('badge-carrito-menu').textContent = cantidadTotal;
  }
  
  // Llama a la función al cargar la página
  document.addEventListener('DOMContentLoaded', actualizarBadgeCarrito);
  
  