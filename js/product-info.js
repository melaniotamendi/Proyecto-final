const productId = localStorage.getItem('productID'); 

const productInfoURL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;



getJSONData = function(url) {
  let result = {};
  return fetch(url)
    .then(response => response.ok ? response.json() : Promise.reject(Error(response.statusText)))
    .then(response => ({ status: 'ok', data: response }))
    .catch(error => ({ status: 'error', data: error }));
}

document.addEventListener("DOMContentLoaded", function() {
  getJSONData(productInfoURL).then(function(resultObj) {
    if (resultObj.status === "ok") {
      mostrarInformacionProducto(resultObj.data);
    }
  });
});

function mostrarInformacionProducto(product) {
  const container = document.getElementById("product-info");
  // Crear el carrusel de imágenes utilizando Bootstrap
  let imagesHTML = `
  <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" >
`;
 //Imagen principal en grande
 product.images.forEach((image, index) => {
  imagesHTML += `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${image}" class="d-block w-100" alt="Imagen del producto" class="imagenPrincipal">
    </div>
  `;
});
imagesHTML += `
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Anterior</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Siguiente</span>
</button>
</div>

<!-- Miniaturas debajo del carrusel -->
<div class="mt-3">
<div class="row">
`;

//Imagenes en miniatura debajo de la imágen principal  
product.images.forEach((image, index) => {
imagesHTML += `
<div class="col-3 col-sm-2 mb-2">
  <img src="${image}" class="img-thumbnail" alt="Miniatura del producto" style="cursor: pointer;" onclick="changeCarouselImage(${index})">
</div>
`;
});

imagesHTML += `
</div>
</div>
`;

let productHTML = `
<div class="container d-flex">
<div class="card" style="max-width: 4000px;">
  <div class="row">
    <!-- Columna de imágenes -->
    <div class="col-md-6 float-left">
      ${imagesHTML} <!-- Insertar el carrusel de imágenes aquí -->
    </div>

    <!-- Columna de detalles del producto -->
    <div class="col-md-6 float-right">
    <div class="card-body style="max-width: 400px;">
     <h2>${product.name}</h2>
     <p class="lead"><strong>Precio:</strong> ${product.currency} ${product.cost}</p>
     <p><strong>Categoría:</strong> ${product.category}</p>
     <p><strong>Cantidad vendidos:</strong> ${product.soldCount}</p>
     <p>${product.description}</p>
     <button class="btn btn-primary">Comprar</button>
    </div>
 </div>
</div>
</div>
</div>
`;

  // Renderizar la información del producto
  container.innerHTML = productHTML;

// Inicializar el carrusel de Bootstrap
const carousel = new bootstrap.Carousel(document.getElementById('productCarousel'));
window.changeCarouselImage = function(index) {
  carousel.to(index); // Mueve el carrusel a la imagen correspondiente
}
}


// Para manejar el nombre del usuario y el botón de cerrar sesión
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
