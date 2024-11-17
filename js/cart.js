let loggedInUser = localStorage.getItem("loggedInUser");
let carritoKey = `carrito_${loggedInUser}`;
let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];

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
            const carritoKey = `carrito_${localStorage.getItem("loggedInUser")}`;
             let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
              // Calcular el subtotal 
              let subtotal = carrito.reduce((sum, producto) => { const precio = parseFloat(producto.precio) || 0;
                const cantidad = parseInt(producto.cantidad, 10) || 1; 
                return sum + (precio * cantidad); }, 0); 
                // Mostrar el subtotal en el elemento con id="subtot" 
                document.getElementById("subtot").textContent = `$${subtotal.toFixed(2)}`; 
         
                // Obtener el valor de la opción de envío seleccionada 
                const shippingOption = document.querySelector('input[name="shipping"]:checked');
                 const shippingPercentage = shippingOption ? parseFloat(shippingOption.value) : 0; 
         
                 // Calcular el costo de envío y el total final 
                 const shippingCost = subtotal * shippingPercentage; 
                 const totalFinal = subtotal + shippingCost; 
         
                 // Actualizar en el DOM
                  document.getElementById("costenvio").textContent = `$${shippingCost.toFixed(2)}`; 
                  document.getElementById("totalPrice").textContent = `$${totalFinal.toFixed(2)}`;
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
      actualizarBadgeCarrito();
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
        paymentCard.style.display = "none";
        shippingCard.style.display = "none";
      }
      actualizarTotal();
    }
  
    // Asegúrate de que las funciones actualizarCantidad y eliminarProducto estén disponibles globalmente
    window.actualizarCantidad = actualizarCantidad;
    window.eliminarProducto = eliminarProducto;
  
    renderizarCarrito();
     // Agregar evento change a las opciones de envío 
const shippingOptions = document.querySelectorAll('input[name="shipping"]'); 
shippingOptions.forEach(option => { 
  option.addEventListener('change', actualizarTotal);
 });
    actualizarBadgeCarrito();
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



document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const guardarBtn = document.getElementById("guardarDireccionBtn");
  const loggedInUser = localStorage.getItem("loggedInUser");

  // Función para abrir el modal
  function abrirModal() {
    modal.style.display = "block";
  }

  // Cerrar el modal al hacer clic en el botón de cerrar (X)
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Cerrar el modal al hacer clic fuera del contenido del modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Hacer disponible la función abrirModal globalmente
  window.abrirModal = abrirModal;

  // Función para guardar la dirección en el localStorage
  function guardarDireccion(event) {
    event.preventDefault(); // Detiene el comportamiento predeterminado del formulario

    if (!loggedInUser) {
      alert("Debes iniciar sesión para guardar tu dirección.");
      return;
    }

    // Obtener valores de los inputs
    const departamentoInput = document.getElementById("departamento").value.trim();
    const localidadInput = document.getElementById("localidad").value.trim();
    const calleInput = document.getElementById("calle").value.trim();
    const numeroInput = document.getElementById("numero").value.trim();
    const esquinaInput = document.getElementById("esquina").value.trim();

    // Validación de campos obligatorios
    if (!departamentoInput || !localidadInput || !calleInput || !numeroInput || !esquinaInput) {
      alert("Todos los campos marcados son obligatorios. Por favor, completa la dirección.");
      return;
    }

    // Crear objeto dirección
    const direccion = {
      departamento: departamentoInput,
      localidad: localidadInput,
      calle: calleInput,
      numero: numeroInput,
      esquina: esquinaInput || null // Esquina es opcional
    };

    // Guardar en localStorage
    const direccionKey = `direccion_${loggedInUser}`;
    localStorage.setItem(direccionKey, JSON.stringify(direccion));

    // Cerrar modal y mostrar mensaje de éxito
    modal.style.display = "none";
    alert("Dirección guardada exitosamente.");
  }

  // Asignar evento al botón guardar
  guardarBtn.addEventListener("click", guardarDireccion);
});



function finalizarCompra() {
  if (!carrito || carrito.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
      return;
  }

  const direccionKey = `direccion_${loggedInUser}`;
  const direccion = JSON.parse(localStorage.getItem(direccionKey));

  if (!direccion || Object.values(direccion).some(value => !value || value.trim() === "")) {
      alert("Por favor, asegúrate de ingresar y guardar una dirección válida.");
      return;
  }

  const selectedShipping = document.querySelector('input[name="shipping"]:checked');
  if (!selectedShipping) {
      alert("Por favor, selecciona un tipo de envío.");
      return;
  }

  const cantidadValida = carrito.every(producto => producto.cantidad > 0);
  if (!cantidadValida) {
      alert("La cantidad de cada producto debe ser mayor a 0.");
      return;
  }

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedPayment) {
      alert("Por favor, selecciona una forma de pago.");
      return;
  }

  // si todo está validado
  alert("¡Compra finalizada con éxito! Gracias por tu pedido.");
  carrito = [];
  localStorage.setItem(carritoKey, JSON.stringify(carrito));
  actualizarBadgeCarrito();
  renderizarCarrito();
}

  
