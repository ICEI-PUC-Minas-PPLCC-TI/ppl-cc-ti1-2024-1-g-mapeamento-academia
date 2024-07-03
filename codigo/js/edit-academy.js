document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const academyId = params.get('id');
    fetchAcademyDetails(academyId).then(academy => {
        if (academy) {
            document.getElementById('editAcademyForm').addEventListener('submit', async (event) => {
                event.preventDefault();

                const id = academyId;
                const name = document.getElementById('name').value;
                const location = document.getElementById('location').value;
                const address = document.getElementById('address').value;
                const price = document.getElementById('price').value;
                const image = document.getElementById('image').value;
                const login = academy.login;
                const password = academy.password;

                const response = await fetch(`http://localhost:3000/academies/${academyId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ login, id, name, location, address, price, image , password})
                });

                if (response.ok) {
                    alert('Dados atualizados com sucesso!');
                    window.location.href = `academy-dashboard.html?id=${academyId}`;
                } else {
                    alert('Erro ao atualizar, tente novamente.');
                }
            });
        }
    });
});

async function fetchAcademyDetails(id) {
    const response = await fetch(`http://localhost:3000/academies/${id}`);
    if (response.ok) {
        const academy = await response.json();
        document.getElementById('name').value = academy.name;
        document.getElementById('location').value = academy.location;
        document.getElementById('address').value = academy.address;
        document.getElementById('price').value = academy.price;
        document.getElementById('image').value = academy.image;
        return academy;
    } else {
        alert('Erro ao carregar detalhes da academia.');
        return null;
    }
}