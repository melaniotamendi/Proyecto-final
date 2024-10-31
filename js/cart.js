document.addEventListener("DOMContentLoaded", function () {
    // Llamamos al carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Se crea un contenedor
    const cartContainer = document.getElementById("cartContainer");

  //Si el carrito esta vacio
    if (carrito.length > 0) {
      // Se suma en el HTML cada producto en el carrito
      cartContainer.innerHTML = carrito.map(producto => `
        <div class="cart-item">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" />
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
        </div>
      `).join(''); // Encadena los prodcutos guardados 
    } else {
      // Si no hay prodcutos en el contenedor si muestra:
      cartContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    }
  });
  
  