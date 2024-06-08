document.getElementById('loginUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
    const users = await response.json();

    if (users.length > 0) {
        alert('Login realizado com sucesso!');
        loginUser(users[0]); // Chamar função de login de usuário
        window.location.href = `academies.html?id=${users[0].id}`;
    } else {
        alert('Email ou senha incorretos.');
    }
});
