document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const academyId = params.get('id');
    fetchAcademyDetails(academyId);
    fetchReviews(academyId);

    document.getElementById('train-here-btn').addEventListener('click', () => {
        redirectToPayment(academyId);
    });

    document.getElementById('favorite-btn').addEventListener('click', () => {
        addToFavorites(academyId);
    });

    document.getElementById('reviewForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            alert('Usuário não está logado.');
            window.location.href = 'login.html';
            return;
        }
        const userId = user.id; // Obter o ID do usuário logado
        const rating = parseFloat(document.getElementById('rating').value);
        const comment = document.getElementById('comment').value;

        const response = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, academyId, rating, comment })
        });

        if (response.ok) {
            alert('Avaliação enviada com sucesso!');
            fetchReviews(academyId);
        } else {
            alert('Erro ao enviar a avaliação, tente novamente.');
        }
    });
});

async function fetchAcademyDetails(id) {
    const response = await fetch(`http://localhost:3000/academies/${id}`);
    const academy = await response.json();
    displayAcademyDetails(academy);
}

function displayAcademyDetails(academy) {
    document.getElementById('academy-name').textContent = academy.name;
    document.getElementById('academy-image').src = academy.image;
    document.getElementById('academy-location').textContent = `Localização: ${academy.location}`;
    document.getElementById('academy-address').textContent = `Endereço: ${academy.address}`;
}

async function fetchReviews(academyId) {
    const response = await fetch(`http://localhost:3000/reviews?academyId=${academyId}`);
    const reviews = await response.json();
    displayReviews(reviews);
    calculateRatingAverage(reviews);
}

function displayReviews(reviews) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
        const li = document.createElement('li');
        li.textContent = `Nota: ${review.rating}, Comentário: ${review.comment}`;
        reviewsList.appendChild(li);
    });
}

function calculateRatingAverage(reviews) {
    if (reviews.length === 0) {
        document.getElementById('rating-average').textContent = 'N/A';
        return;
    }
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const ratingAverage = ratingSum / reviews.length;
    document.getElementById('rating-average').textContent = ratingAverage.toFixed(2);
}

function redirectToPayment(academyId) {
    window.location.href = `payment.html?academyId=${academyId}`;
}

async function addToFavorites(academyId) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        alert('Usuário não está logado.');
        window.location.href = 'login.html';
        return;
    }
    const userId = user.id; // Obter o ID do usuário logado

    const response = await fetch('http://localhost:3000/favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, academyId })
    });

    if (response.ok) {
        alert('Academia adicionada aos favoritos!');
    } else {
        alert('Erro ao adicionar aos favoritos, tente novamente.');
    }
}
