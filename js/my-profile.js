document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (loggedInUser) {
    // Mostrar el nombre de usuario en la barra
    document.getElementById('nombreDeUsuario').textContent = loggedInUser;

    // Cargar la imagen de perfil asociada al usuario
    const userData = JSON.parse(localStorage.getItem(`user_${loggedInUser}`));
    if (userData && userData.profileImage) {
      document.getElementById('imagenPerfil').src = userData.profileImage;
    }

    // Cargar los datos del formulario si existen
    if (userData) {
      document.getElementById('nombre').value = userData.nombre || '';
      document.getElementById('segundoNombre').value = userData.segundoNombre || '';
      document.getElementById('apellido').value = userData.apellido || '';
      document.getElementById('segundoApellido').value = userData.segundoApellido || '';
      document.getElementById('telefono').value = userData.telefono || '';
    }
  }

  // Botón de cerrar sesión
  document.getElementById('logout').addEventListener('click', function () {
    console.log('Cerrando sesión...');
    localStorage.removeItem('loggedInUser'); // Cierra sesión
    window.location.href = 'login.html'; // Redirige al usuario a la página de inicio de sesión
  });
});

// Obtener elementos del DOM
const inputFotoPerfil = document.getElementById("inputFotoPerfil");
const imagenPerfil = document.getElementById("imagenPerfil");
const guardarFotoPerfil = document.getElementById("guardarFotoPerfil");

// Evento para escuchar la selección de una imagen por el usuario
inputFotoPerfil.addEventListener("change", function () {
  const file = inputFotoPerfil.files[0];
  const reader = new FileReader();

  // Cuando el archivo es cargado, lo convertimos a Base64
  reader.onloadend = function () {
    const base64String = reader.result;
    imagenPerfil.src = base64String; // Mostrar la imagen en la página
  };

  // Leer el archivo seleccionado como URL de datos
  if (file) {
    reader.readAsDataURL(file);
  }
});

// Evento para guardar la imagen en localStorage cuando el usuario hace clic en "Guardar Foto"
guardarFotoPerfil.addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto

  const loggedInUser = localStorage.getItem('loggedInUser'); // Obtén el usuario actual

  // Verificar que haya un usuario logueado
  if (loggedInUser) {
    const base64Image = imagenPerfil.src; // Obtener la imagen actual en la página

    // Crear un objeto con los datos del usuario
    const userData = {
      profileImage: base64Image,
    };

    // Guardar los datos del usuario (imagen) en localStorage asociada a su nombre
    localStorage.setItem(`user_${loggedInUser}`, JSON.stringify(userData));

    // Verificar si el usuario ya existe en el arreglo de usuarios
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (!usuariosGuardados.includes(loggedInUser)) {
      usuariosGuardados.push(loggedInUser); // Agregar el nuevo usuario
      localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados)); // Guardar el arreglo actualizado en localStorage
    }

    Swal.fire({
      title: "Foto de perfil guardada con éxito",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#F38020", // Color naranja del botón
      showCloseButton: true,
    });
  } else {
    Swal.fire({
      title: "No hay ningún usuario logueado",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#F38020",
      showCloseButton: true,
    });
  }
});

// Evento para guardar los datos del perfil en el formulario
guardarFotoPerfil.addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir el envío por defecto

  const nombre = document.getElementById('nombre').value.trim();
  const segundoNombre = document.getElementById('segundoNombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const segundoApellido = document.getElementById('segundoApellido').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  // Validar campos de nombre y apellido
  if (nombre === "" || apellido === "") {
    Swal.fire({
      title: "Por favor, completa los campos obligatorios: Nombre y Apellido.",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#F38020",
      showCloseButton: true,
    });
    return;
  }

  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const base64Image = imagenPerfil.src;

    // Crear un objeto con los datos del perfil
    const userData = {
      nombre: nombre,
      segundoNombre: segundoNombre,
      apellido: apellido,
      segundoApellido: segundoApellido,
      telefono: telefono,
      profileImage: base64Image,
    };

    // Guardar los datos en localStorage
    localStorage.setItem(`user_${loggedInUser}`, JSON.stringify(userData));

    Swal.fire({
      title: "Datos del perfil guardados con éxito",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#F38020",
      showCloseButton: true,
    });
  } else {
    Swal.fire({
      title: "No hay ningún usuario logueado.",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#F38020",
      showCloseButton: true,
    });
  }
});

// Función para actualizar el badge del carrito
function actualizarBadgeCarrito() {
  const nombreDeUsuario = localStorage.getItem("loggedInUser");
  if (!nombreDeUsuario) {
    return; // No actualiza si no hay un usuario conectado
  }

  const carritoKey = `carrito_${nombreDeUsuario}`;
  let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];

  // Suma la cantidad total de productos
  let cantidadTotal = carrito.reduce((total, producto) => total + parseInt(producto.cantidad || 0, 10), 0);

  // Actualiza el contenido del badge
  document.getElementById('badge-carrito').textContent = cantidadTotal;
  document.getElementById('badge-carrito-menu').textContent = cantidadTotal;
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', actualizarBadgeCarrito);
