document.addEventListener('DOMContentLoaded', (event) => {
    checkLogin();
});

function checkLogin() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const academy = JSON.parse(sessionStorage.getItem('academy'));

    if (user) {
        toggleDisplay('nav-login-user', false);
        toggleDisplay('nav-login-academy', false);
        toggleDisplay('nav-dashboard-user', true);
        toggleDisplay('nav-dashboard-academy', false);
        toggleDisplay('nav-logout', true);
    } else if (academy) {
        toggleDisplay('nav-login-user', false);
        toggleDisplay('nav-login-academy', false);
        toggleDisplay('nav-dashboard-user', false);
        toggleDisplay('nav-dashboard-academy', true);
        toggleDisplay('nav-logout', true);
    } else {
        toggleDisplay('nav-login-user', true);
        toggleDisplay('nav-login-academy', true);
        toggleDisplay('nav-dashboard-user', false);
        toggleDisplay('nav-dashboard-academy', false);
        toggleDisplay('nav-logout', false);
    }
}

function toggleDisplay(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'block' : 'none';
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
