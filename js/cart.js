document.addEventListener("DOMContentLoaded", function () {
    // Se obtiene el nombre de usuario actual
    const nombreDeUsuario = localStorage.getItem("loggedInUser");
  
    // Luego se obtiene los productos del carrito relacionados al usuario
    const carritoKey = `carrito_${nombreDeUsuario}`;
    const carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
  
    const cartContainer = document.getElementById("cartContainer");
    const cartSummary = document.getElementById("cartSummary");
    const totalPriceElement = document.getElementById("totalPrice");
    let total = 0;
  
    function actualizarTotal() {
      total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
      totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
  
    function actualizarCantidad(index, cambio) {
      carrito[index].cantidad += cambio;
      if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
      localStorage.setItem(carritoKey, JSON.stringify(carrito));
      renderizarCarrito();
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
              <td>$aca va el subtotal</td>
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
  