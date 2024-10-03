const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, ingresa tu usuario y contraseña.');

    } else {
       
        localStorage.setItem('loggedInUser', username);
      
        window.location.href = 'index.html';
    }
});

