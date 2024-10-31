document.addEventListener("DOMContentLoaded", function () {
    // Se obtiene el nombre de usuario actual
    const nombreDeUsuario = localStorage.getItem("loggedInUser");  

    // Luego se obtiene los prodcutos del carrito relacionados al user
    const carritoKey = `carrito_${nombreDeUsuario}`;
    const carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
    const cartContainer = document.getElementById("cartContainer");

    // Verifica si el carrito tiene productos
    if (carrito.length > 0) {
        // Se pide que colocar de cada producto del carrito dentro del contenedor
        cartContainer.innerHTML = carrito.map(producto => `
            <div class="cart-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" />
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
            </div>
        `).join(''); // Suma los prodcutos
    } else {
        // Mensaje si el carrito esta vacio
        cartContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    }
});

  