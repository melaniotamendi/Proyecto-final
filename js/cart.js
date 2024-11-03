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
  
  