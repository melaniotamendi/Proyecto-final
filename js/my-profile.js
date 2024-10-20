

// Para que funcione el usuario y el cerrar sesión en la barra
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    if (loggedInUser) {
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
    
  
    document.getElementById('logout').addEventListener('click', function() {
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
  
  document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      // Mostrar el nombre de usuario en el formulario
      document.getElementById('nombreDeUsuarioForm').textContent = loggedInUser;
    }
  });
  // Evento para guardar la imagen en localStorage cuando el usuario hace clic en "Guardar Foto"
  guardarFotoPerfil.addEventListener("click", function () {
    const loggedInUser = localStorage.getItem('loggedInUser'); // Obtén el usuario actual
    
    // Verificar que haya un usuario logueado
    if (loggedInUser) {
      const base64Image = imagenPerfil.src; // Obtener la imagen actual en la página
  
      // Crear un objeto con los datos del usuario
      const userData = {
        profileImage: base64Image
      };
  
      // Guardar los datos del usuario (imagen) en localStorage asociada a su nombre
      localStorage.setItem(`user_${loggedInUser}`, JSON.stringify(userData));
  
      // Verificar si el usuario ya existe en el arreglo de usuarios
      let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      if (!usuariosGuardados.includes(loggedInUser)) {
        usuariosGuardados.push(loggedInUser); // Agregar el nuevo usuario
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados)); // Guardar el arreglo actualizado en localStorage
      }
  
      alert("Foto de perfil guardada con éxito!");
    } else {
      alert("No hay ningún usuario logueado.");
    }
  });
 
  document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      // Mostrar el nombre de usuario en el formulario
      document.getElementById('nombreDeUsuarioForm').textContent = loggedInUser;
    }
  });

  // Prevenir que se envíe por defecto
  guardarFotoPerfil.addEventListener("click", function (event) {
    event.preventDefault(); 

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const segundoNombre = document.getElementById('segundoNombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const segundoApellido = document.getElementById('segundoApellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    
    // Validar campos de nombre y apellido
    if (nombre === "" || apellido === "") {
      alert("Por favor, completa los campos obligatorios: Nombre y Apellido.");
      return;
    }
    
    // Obtener la imagen actual del perfil
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
            profileImage: base64Image
        };

        // Guardar los datos en localStorage
        localStorage.setItem(`user_${loggedInUser}`, JSON.stringify(userData));
        alert("Datos del perfil guardados con éxito!");
    } else {
        alert("No hay ningún usuario logueado.");
    }
});