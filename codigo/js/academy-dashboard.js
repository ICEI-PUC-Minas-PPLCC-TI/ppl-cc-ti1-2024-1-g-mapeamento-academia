document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const academyId = params.get('id');
    fetchAcademyDetails(academyId);

    document.getElementById('edit-btn').addEventListener('click', () => {
        window.location.href = `edit-academy.html?id=${academyId}`;
    });
});

async function fetchAcademyDetails(id) {
    const response = await fetch(`http://localhost:3000/academies/${id}`);
    if (response.ok) {
        const academy = await response.json();
        displayAcademyDetails(academy);
    } else {
        alert('Erro ao carregar detalhes da academia.');
    }
}

function displayAcademyDetails(academy) {
    document.getElementById('academy-name').textContent = academy.name;
    document.getElementById('academy-image').src = academy.image;
    document.getElementById('academy-location').textContent = `Localização: ${academy.location}`;
    document.getElementById('academy-address').textContent = `Endereço: ${academy.address}`;
    document.getElementById('academy-rating').textContent = `Avaliação: ${academy.rating}`;
}
