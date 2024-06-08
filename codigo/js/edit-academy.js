document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const academyId = params.get('id');
    fetchAcademyDetails(academyId);

    document.getElementById('editAcademyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value;
        const address = document.getElementById('address').value;
        const rating = document.getElementById('rating').value;
        const image = document.getElementById('image').value;

        const response = await fetch(`http://localhost:3000/academies/${academyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, location, address, rating, image })
        });

        if (response.ok) {
            alert('Dados atualizados com sucesso!');
            window.location.href = `academy-dashboard.html?id=${academyId}`;
        } else {
            alert('Erro ao atualizar, tente novamente.');
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
        document.getElementById('rating').value = academy.rating;
        document.getElementById('image').value = academy.image;
    } else {
        alert('Erro ao carregar detalhes da academia.');
    }
}
