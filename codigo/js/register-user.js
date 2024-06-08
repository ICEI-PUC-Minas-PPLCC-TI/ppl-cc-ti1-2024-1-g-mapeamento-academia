document.getElementById('registerUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, cpf, email, password })
    });

    if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '../pages/login-user.html';
    } else {
        alert('Erro no cadastro, tente novamente.');
    }
});
