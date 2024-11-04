
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

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(productInfoURL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      const product = resultObj.data;
      mostrarInformacionProducto(product);

      // Mostrar los productos relacionados usando los IDs en relatedProducts
      mostrarProductosRelacionados(product.relatedProducts);
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
<div id= "carta" class="container d-flex">
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

document.addEventListener("DOMContentLoaded", function() {
  const productId = localStorage.getItem("productID"); 
  const catID = localStorage.getItem("catID"); 

  if (productId && catID) {
    // Cargar los detalles del producto actual
    getJSONData(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
      .then(function(resultObj) {
        if (resultObj.status === "ok") {
          const product = resultObj.data;
          document.getElementById('product-info').innerHTML = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Precio: ${product.price}</p>
          `;
        }
      });

  }
});

//Prodcutos de interes
function mostrarProductosRelacionados(products) {
  const relatedProductsContainer = document.getElementById('related-products');
  let productsHTML = '';

  // Crear las tarjetas para cada producto relacionado
  products.forEach((product) => {
    productsHTML += `
      <div class="card" style="width: 18rem; margin-right: 10px;">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="cursor: pointer;"
          onclick="redirectToProduct(${product.id})"> <!-- Redirige al hacer clic -->
        <div class="card-body">
          <h6 class="card-title">${product.name}</h6>
        </div>
      </div>
    `;
  });

  // Insertar las tarjetas dentro del contenedor del carrusel
  relatedProductsContainer.innerHTML = productsHTML;
}

// Función para redirigir al hacer clic en el producto
function redirectToProduct(productId) {
  localStorage.setItem("productID", productId); // Guarda el ID del producto en localStorage
  window.location.href = "product-info.html";   // Redirige a la página del producto
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

let totalScore = 0;  // Total de las calificaciones
let commentCount = 0;
function mostrarComentarios(comments) {
    const commentsContainer = document.getElementById("product-comments");
    let commentsHTML = "<h3 id=opiniones style='color: #000000;'>  Opiniones del producto  </h3>";
   
    comments.forEach(comment => {
      totalScore += comment.score;  // Sumar la calificación
      commentCount++;  // Incr
      commentsHTML += `
      <br>
        <div class="comment">
          <div class="rating">
            ${'⭐'.repeat(comment.score)}
          </div>
          
          <div class="d-flex justify-content-between">
            <h5 style='color: #000000;'>${comment.user}</h5>
            <span>${comment.dateTime}</span>
          </div>
          <p>${comment.description}</p>
        </div>
      `;
    });
  
    commentsContainer.innerHTML = commentsHTML;
    mostrarPromedioCalificaciones();

  }

  /*esta funcion es para mostrar el promedio de calificaciones*/
  function mostrarPromedioCalificaciones() {
    const promedioContainer = document.getElementById("promedio-calificaciones");
//El if pone la condicion de que se calcula el promedio solo si hay comentarios 
   if (commentCount > 0) {
    const promedio = (totalScore / commentCount).toFixed(1);  // Calcular el promedio y redondear a un decimal
    promedioContainer.innerHTML = `  <h1 style='color: #F38020;' > ${promedio}  ${'⭐'.repeat(promedio)} </h1>
    <br>
    <br>
    <br>`;
  } 
     //Si no hay comentarios se va a ejecutar este else, que deberia mostrar este mensaje
   else { promedioContainer.innerHTML = `<p style='color: #888888;'>No hay calificaciones disponibles.</p> 
    <br>
    <br>
    `;
   }
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

document.getElementById('submitBtn').addEventListener('click', function() {
  // Obtener la calificación seleccionada
  const rating = document.querySelector('input[name="rate"]:checked');
  const comment = document.getElementById('comment').value;

  if (rating || comment.trim() !== '') {
    alert(`Has calificado este producto`);
  } else {
    alert('Por favor, selecciona una calificación o escribe un comentario.');
  }
});

// Agregar nuevo comentario
document.getElementById('submitBtn').addEventListener('click', function() {
  const loggedInUser = localStorage.getItem('loggedInUser'); // Obtener el nombre del usuario desde localStorage
  const rating = document.querySelector('input[name="rate"]:checked'); // Obtener la calificación seleccionada
  const comment = document.getElementById('comment').value; // Obtener el comentario

  if (rating || comment.trim() !== '') {
      const newComment = {
          user: loggedInUser,
          score: parseInt(rating.value),
          dateTime: new Date().toLocaleString(),
          description: comment
      };
      totalScore += newComment.score;
      commentCount++; /*esto es para que sume al promeido las nuevas calificaciones*/
  
      // Agregar el nuevo comentario al contenedor
      const commentsContainer = document.getElementById("product-comments");
      const stars = '⭐'.repeat(newComment.score); // Generar estrellas según la calificación
      commentsContainer.innerHTML += ` <br>
          <div class="comment">
              <div class="rating">${stars}</div>
              <div class="d-flex justify-content-between">
                  <h5 style='color: #000000;'>${newComment.user}</h5>
                  <span>${newComment.dateTime}</span>
              </div>
              <p>${newComment.description}</p>
              <br>
              
          </div>`;

          document.getElementById('comment').value = '';
          document.querySelector('input[name="rate"]:checked').checked = false;
          mostrarPromedioCalificaciones(); /*esta funcion es para que cuando haya una nueva calificacion, se actualice el promedio*/
        } 
          else {
          alert('Por favor, selecciona una calificación o escribe un comentario.');
          }
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

 // Se asegura que todos los datos esten
 window.addEventListener("load", function () {
  // Lo relaciona con el user
  const nombreDeUsuario = localStorage.getItem("loggedInUser");

  getJSONData(productInfoURL).then(function (resultObj) {
      if (resultObj.status === "ok") {
          const product = resultObj.data;
          mostrarInformacionProducto(product);

          // Se le da funcionalidad al boton comprar
          const comprarBtn = document.getElementById("comprar");
          if (comprarBtn) {
              comprarBtn.addEventListener("click", function () {
                  agregarAlCarrito(product, nombreDeUsuario);
              });
          } else {
              console.log("Botón de comprar no encontrado");
          }
      } else {
          console.log("Error al obtener la información del producto:", resultObj.data);
      }
  });
});

// Función para agregar el producto al carrito
//Agregar al carrito
  function agregarAlCarrito(product, nombreDeUsuario) {
    const carritoKey = `carrito_${nombreDeUsuario}`;
  
    // Recupera el carrito actual del usuario o crea un arreglo vacío
    let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
  
    // Verifica si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.id === product.id);
  
    if (productoExistente) {
        // Si ya existe, incrementa la cantidad y asegúrate de que sea un número
        productoExistente.cantidad = (productoExistente.cantidad || 0) + 1;
    } else {
        // Si no existe, agrégalo con cantidad inicial de 1
        carrito.push({
            id: product.id,
            nombre: product.name,
            precio: product.cost,
            imagen: product.images[0],
            cantidad: 1 // Inicializar cantidad como número
        });
    }
  
    // Actualiza el carrito en el localStorage
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
  
    // Llama a la función para actualizar el badge en tiempo real
    actualizarBadgeCarrito();
  
    // Muestra una alerta de confirmación
     // Muestra una alerta de confirmación
    Swal.fire({
      title: "Producto agregado al carrito",
      text: product.name,
      icon: "success",  // Usa "success" para un ícono predeterminado de check en verde
      iconHtml: "👌🏻",  // Alternativamente, puedes personalizar el icono con un emoji
      confirmButtonText: "Continuar comprando",
      cancelButtonText: "Ver carrito",
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Acción para "Continuar comprando"
        window.location.href = "product-info.html"; // Redirige a la página de productos
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción para "Ver carrito"
        window.location.href = "cart.html"; // Redirige a la página del carrito
      }
    });
    
    console.log("Producto agregado al carrito:", carrito);
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
  
