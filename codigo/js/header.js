// script para carregar o header
fetch('../partials/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        checkLogin(); // checkLogin() é chamado após o carregamento do header
    });
    function checkLogin() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const academy = JSON.parse(sessionStorage.getItem('academy'));
    
        // Função auxiliar para alternar a classe 'd-none' (usada para desativar um elemento no Bootstrap)
        function toggleVisibility(elementId, shouldShow) {
            const element = document.getElementById(elementId);
            if (element) {
                if (shouldShow) {
                    element.classList.remove('d-none'); // Mostra o elemento
                } else {
                    element.classList.add('d-none'); // Oculta o elemento
                }
            }
        }
    
        // Verifica se o usuário ou academia está logado e ajusta a visibilidade dos elementos dinâmicamente
        if (user) {
            toggleVisibility('nav-start', false);
            toggleVisibility('nav-search', true);
            toggleVisibility('nav-favorites', true);
            toggleVisibility('nav-dashboard-user', true);
            toggleVisibility('nav-dashboard-academy', false);
            toggleVisibility('nav-logout', true);
        } else if (academy) {
            toggleVisibility('nav-start', false);
            toggleVisibility('nav-search', true);
            toggleVisibility('nav-favorites', false);
            toggleVisibility('nav-dashboard-user', false);
            toggleVisibility('nav-dashboard-academy', true);
            toggleVisibility('nav-logout', true);
        } else {
            toggleVisibility('nav-start', true);
            toggleVisibility('nav-search', false);
            toggleVisibility('nav-favorites', false);
            toggleVisibility('nav-dashboard-user', false);
            toggleVisibility('nav-dashboard-academy', false);
            toggleVisibility('nav-logout', false);
        }
    }
    
    //checkLogin após a definição da função para atualizar a barra de navegaçaão
    document.addEventListener('DOMContentLoaded', (event) => {
        checkLogin();
    });
    
    

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
    window.location.href = localIndex; // Redireciona o usuário para a página de apresentação (agr deve estar funcionando corretamente)
}


