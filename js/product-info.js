
const productId = localStorage.getItem('productID'); 

const productInfoURL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
const productCommentsURL = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`; // URL para los comentarios


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
<div class="card" style="max-width: 10000px;">
  <div class="row">
    <!-- Columna de imágenes -->
    <div class="col-md-6 float-left">
      ${imagesHTML} <!-- Insertar el carrusel de imágenes aquí -->
    </div>

    <!-- Columna de detalles del producto -->
    <div class="col-md-6 float-right">
    <div class="card-body style="max-width: 900px;">
     <h2> <strong>${product.name}</strong></h2>
     <br>
     <h5><strong> ${product.currency} ${product.cost} </strong></h5>
     <br>
     <p style="margin-bottom: 0;"><strong>Categoría:</strong> ${product.category}</p>
     <p><strong>Cantidad vendidos:</strong> ${product.soldCount}</p>
     <p id="descripcion">${product.description}</p>
     <button id="comprar" class="btn btn-primary">Comprar</button>
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

function mostrarComentarios(comments) {
    const commentsContainer = document.getElementById("product-comments");
    let commentsHTML = "<h3 id=opiniones>  Opiniones del producto  </h3>";
  
    comments.forEach(comment => {
      commentsHTML += `
        <div class="comment">
          <div class="rating">
            ${'⭐'.repeat(comment.score)}
          </div>
          <div class="d-flex justify-content-between">
            <strong>${comment.user}</strong>
            <span>${comment.dateTime}</span>
          </div>
          <p>${comment.description}</p>
          <br>
          <hr>
        </div>
      `;
    });
  
    commentsContainer.innerHTML = commentsHTML;
  }
  document.addEventListener("DOMContentLoaded", function() {
    // Obtener información del producto
    getJSONData(productInfoURL).then(function(resultObj) {
      if (resultObj.status === "ok") {
        mostrarInformacionProducto(resultObj.data);
      }
    });
  
    // Obtener comentarios del producto
    getJSONData(productCommentsURL).then(function(resultObj) {
      if (resultObj.status === "ok") {
        mostrarComentarios(resultObj.data);
      }
    });
  });



document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".rating .fa");
    
    stars.forEach(star => {
      star.addEventListener("click", function() {
        stars.forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        let prevSibling = this.previousElementSibling;
        while (prevSibling) {
          prevSibling.classList.add("active");
          prevSibling = prevSibling.previousElementSibling;
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('themeButton');
    const body = document.body;
  
    // Función Modo Claro y Modo Oscuro
    function toggleTheme() {
      const isDark = body.classList.contains('dark-theme');
      if (isDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeButton.textContent = 'Modo Oscuro';
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeButton.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'dark');
      }
    }
  
    // Cargar preferencias a localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      themeButton.textContent = 'Modo Claro'; // Cambiar el texto del botón si está en modo oscuro
    } else {
      body.classList.add('light-theme');
      themeButton.textContent = 'Modo Oscuro'; // Cambiar el texto del botón si está en modo claro
    }
  
    // Cambiar el modo al hacer click
    themeButton.addEventListener('click', toggleTheme);
  });