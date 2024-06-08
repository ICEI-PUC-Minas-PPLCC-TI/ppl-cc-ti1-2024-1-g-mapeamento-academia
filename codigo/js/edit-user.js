document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    fetchUserDetails(userId);

    document.getElementById('editUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;

        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, cpf, email })
        });

        if (response.ok) {
            alert('Dados atualizados com sucesso!');
            window.location.href = `user-dashboard.html?id=${userId}`;
        } else {
            alert('Erro ao atualizar, tente novamente.');
        }
    });
});

async function fetchUserDetails(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const user = await response.json();
    document.getElementById('name').value = user.name;
    document.getElementById('cpf').value = user.cpf;
    document.getElementById('email').value = user.email;
}