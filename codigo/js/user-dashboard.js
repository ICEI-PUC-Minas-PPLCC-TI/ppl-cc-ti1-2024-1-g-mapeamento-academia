document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user ? user.id : null;

    if (!userId) {
        alert('Usuário não está logado.');
        window.location.href = '../index.html'; // Redirecionar para a página de login
        return;
    }

    fetchUserDetails(userId);

    document.getElementById('edit-btn').addEventListener('click', () => {
        window.location.href = `edit-user.html?id=${userId}`;
    });
});

async function fetchUserDetails(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const user = await response.json();
    displayUserDetails(user);
}

function displayUserDetails(user) {
    document.getElementById('user-name').innerHTML += `<strong>${user.name}<strong>`;
    document.getElementById('user-cpf').textContent = `CPF: ${user.cpf}`;
    document.getElementById('user-email').textContent = `Email: ${user.email}`;
}
