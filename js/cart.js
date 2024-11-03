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

document.addEventListener("DOMContentLoaded", function () {
    // Se obtiene el nombre de usuario actual
    const nombreDeUsuario = localStorage.getItem("loggedInUser");
  
    // Luego se obtiene los productos del carrito relacionados al usuario
    const carritoKey = `carrito_${nombreDeUsuario}`;
    let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
  
      // Asegurarse de que cada producto tenga una cantidad y precio válidos
      carrito.forEach((producto) => {
        if (typeof producto.cantidad !== 'number' || producto.cantidad < 1) {
           producto.cantidad = 1; // Asegúrate de que la cantidad siempre sea al menos 1
        }
        if (typeof producto.precio !== 'number' || producto.precio < 0) {
           producto.precio = 0; // Asegúrate de que el precio sea al menos 0
        }
        });
    
  
      // Si el carrito cargado no es un array, lo inicializamos 
      if (!Array.isArray(carrito)) {
          carrito = [];
          localStorage.setItem(carritoKey, JSON.stringify(carrito));
         }
  
    const cartContainer = document.getElementById("cartContainer");
    const cartSummary = document.getElementById("cartSummary");
    const totalPriceElement = document.getElementById("totalPrice");
    let total = 0;
  
    function actualizarTotal() {
     let total = carrito.reduce((sum, producto) => {
      // Ver si los valores son válidos
      const precio = parseFloat(producto.precio) || 0;
      const cantidad = parseInt(producto.cantidad, 10) || 1;
      console.log(`Producto: ${producto.nombre}, Precio: ${precio}, Cantidad: ${cantidad}`);
      return sum + (precio * cantidad);
        }, 0);
      totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
  
    function actualizarCantidad(index, cambio) {
      const cantidadActual = carrito[index].cantidad || 1; // Default a 1 si es undefined o null
      carrito[index].cantidad = Math.max(cantidadActual + cambio, 1);
      localStorage.setItem(carritoKey, JSON.stringify(carrito));
      renderizarCarrito();
      actualizarBadgeCarrito();
    }
  
    function eliminarProducto(index) {
      carrito.splice(index, 1);
      localStorage.setItem(carritoKey, JSON.stringify(carrito));
      renderizarCarrito();
    }
  
    function renderizarCarrito() {
      if (carrito.length > 0) {
        let productosHTML = `
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
        `;
        carrito.forEach((producto, index) => {
          // Asegurarse de que precio y cantidad son válidos
          const precio = parseFloat(producto.precio) || 0;
          const cantidad = parseInt(producto.cantidad, 10) || 1;
          // Calcular el subtotal de cada producto 
          const subtotal = producto.precio * producto.cantidad; 
        
          // Chequear errores para que no se visualice NaN
          if (isNaN(precio) || isNaN(cantidad) || isNaN(subtotal)) {
          console.error(`Error con el producto ${producto.nombre}: Precio: ${precio}, Cantidad: ${cantidad}, Subtotal: ${subtotal}`);
          }
        
          productosHTML += `
            <tr>
              <td>
                <div class="cart-item">
                  <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" />
                  <div class="product-details">${producto.nombre}</div>
                </div>
              </td>
              <td>$${producto.precio.toFixed(2)}</td>
              <td>
                <div class="product-quantity">
                  <button onclick="actualizarCantidad(${index}, -1)">-</button>
                  <input type="text" value="${producto.cantidad}" readonly />
                  <button onclick="actualizarCantidad(${index}, 1)">+</button>
                </div>
              </td>
              <td>${subtotal.toFixed(2)}</td>
              <td>
                <button onclick="eliminarProducto(${index})" class="delete-button">X</button>
              </td>
            </tr>
          `;
        });
        productosHTML += `
            </tbody>
          </table>
        `;
        cartContainer.innerHTML = productosHTML;
        // Muestra el resumen y botones si hay productos
        cartSummary.style.display = "flex";
      } else {
        cartContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        // Oculta el resumen y botones si no hay productos
        cartSummary.style.display = "none";
      }
      actualizarTotal();
    }
  
    // Asegúrate de que las funciones actualizarCantidad y eliminarProducto estén disponibles globalmente
    window.actualizarCantidad = actualizarCantidad;
    window.eliminarProducto = eliminarProducto;
  
    renderizarCarrito();
  });

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

//funcion para redirigir a categorias
  function continuarComprando() {
    window.location.href = "categories.html";
}
  
