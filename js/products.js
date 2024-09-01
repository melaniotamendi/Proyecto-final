//Para que funcione el usuario y el cerrar sesión en la barra de navegación
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