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

  let productHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${product.images[0]}" class="img-fluid" alt="${product.name}">
      </div>
      <div class="col-md-6">
        <h2>${product.name}</h2>
        <p class="lead">${product.cost}</p>
        <p> ${product.description}</p>
        <p><strong>Cantidad vendidos: </strong>${product.soldCount}</p>
        <button class="btn btn-primary">Comprar</button>
      </div>
    </div>
  `;

  // Renderizar la información del producto
  container.innerHTML = productHTML;
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