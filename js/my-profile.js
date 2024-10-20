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
