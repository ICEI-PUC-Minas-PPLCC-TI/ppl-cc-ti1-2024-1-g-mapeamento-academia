document.getElementById('registerAcademyForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const login = document.getElementById('login').value;
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const address = document.getElementById('address').value;
    const image = document.getElementById('image').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/academies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, name, location, address, image, password })
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../pages/login-academy.html';
        } else {
            const errorData = await response.json();
            alert(`Erro no cadastro: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro no cadastro, tente novamente.');
    }
});
