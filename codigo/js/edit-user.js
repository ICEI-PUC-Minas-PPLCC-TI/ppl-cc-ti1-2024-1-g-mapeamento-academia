document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    fetchUserDetails(userId).then(user => {
        if (user) {
            document.getElementById('editUserForm').addEventListener('submit', async (event) => {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const cpf = document.getElementById('cpf').value;
                const email = document.getElementById('email').value;
                const password = user.password; // Acessando a senha aqui

                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, cpf, email, password }) // Incluindo a senha no corpo da requisição
                });

                if (response.ok) {
                    alert('Dados atualizados com sucesso!');
                    window.location.href = `user-dashboard.html?id=${userId}`;
                } else {
                    alert('Erro ao atualizar, tente novamente.');
                }
            });
        }
    });
});

async function fetchUserDetails(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    if (response.ok) {
        const user = await response.json();
        document.getElementById('name').value = user.name;
        document.getElementById('cpf').value = user.cpf;
        document.getElementById('email').value = user.email;
        return user;
    } else {
        alert('Erro ao carregar detalhes do usuário.');
        return null;
    }
}
