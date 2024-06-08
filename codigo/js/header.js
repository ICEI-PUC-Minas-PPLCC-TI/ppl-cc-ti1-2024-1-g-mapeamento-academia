// script para carregar o header
fetch('../partials/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        checkLogin(); // Certifique-se de que checkLogin() é chamado após o carregamento do header
    });

function checkLogin() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const academy = JSON.parse(sessionStorage.getItem('academy'));

    if (user) {
        document.getElementById('nav-login-user').style.display = 'none';
        document.getElementById('nav-login-academy').style.display = 'none';
        document.getElementById('nav-dashboard-user').style.display = 'block';
        document.getElementById('nav-dashboard-academy').style.display = 'none';
        document.getElementById('nav-favorites').style.display = 'block';
        document.getElementById('nav-logout').style.display = 'block';
    } else if (academy) {
        document.getElementById('nav-login-user').style.display = 'none';
        document.getElementById('nav-login-academy').style.display = 'none';
        document.getElementById('nav-dashboard-user').style.display = 'none';
        document.getElementById('nav-dashboard-academy').style.display = 'block';
        document.getElementById('nav-favorites').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'block';
    } else {
        document.getElementById('nav-login-user').style.display = 'block';
        document.getElementById('nav-login-academy').style.display = 'block';
        document.getElementById('nav-dashboard-user').style.display = 'none';
        document.getElementById('nav-dashboard-academy').style.display = 'none';
        document.getElementById('nav-favorites').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'none';
    }
}

function loginUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    checkLogin();
}

function loginAcademy(academy) {
    sessionStorage.setItem('academy', JSON.stringify(academy));
    checkLogin();
}

function logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('academy');
    checkLogin();
}

