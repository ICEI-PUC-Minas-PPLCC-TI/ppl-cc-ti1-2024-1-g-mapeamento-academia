document.addEventListener('DOMContentLoaded', async () => {
    // Obter o ID da academia a partir da URL
    const params = new URLSearchParams(window.location.search);
    const academyId = params.get('id');

    await fetchAcademyDetails(academyId);
    fetchReviews(academyId);
    checkIfFavorite(academyId); //checagem para verificar se essa página está nos favoritos

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

        // Enviar avaliação
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


//Checar se a página estpá na lista de favoritos do usuário
// Função para verificar se a academia já está nos favoritos
async function checkIfFavorite(academyId) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        const userId = user.id;
        const favorites = await fetch(`http://localhost:3000/favorites?userId=${userId}`);
        const favoritesData = await favorites.json();
        const isFavorite = favoritesData.some(favorite => favorite.academyId === academyId);
        
        const favoriteBtn = document.getElementById('favorite-btn');
        if (isFavorite) {
            favoriteBtn.classList.add('btn-danger');
            favoriteBtn.disabled = true;
            favoriteBtn.innerText = 'Já está nos favoritos';
        } else {
            favoriteBtn.classList.remove('btn-danger');
            favoriteBtn.disabled = false;
            favoriteBtn.innerText = 'Adicionar aos Favoritos';
        }
    }
}


// Função para adicionar a academia aos favoritos
async function addToFavorites(academyId) {
    try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            alert('Usuário não está logado.');
            window.location.href = 'login.html';
            return;
        }
        const userId = user.id; // Obter o ID do usuário logado

        // Enviar requisição para adicionar aos favoritos
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
            const error = await response.text(); // Ou response.json() se o servidor retornar JSON
            console.error('Falha ao adicionar aos favoritos:', error);
            alert('Erro ao adicionar aos favoritos, tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao processar a requisição, tente novamente.');
    }
}
