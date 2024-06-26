const apiBaseUrl = 'http://localhost:3000';

// Obter ID do usuário logado da sessão
const user = JSON.parse(sessionStorage.getItem('user'));
const userId = user ? user.id : null;

if (!userId) {
    alert('Usuário não está logado.');
    window.location.href = 'login.html'; // Redirecionar para a página de login
}

// Função para buscar os favoritos do usuário
async function fetchFavorites() {
    const response = await fetch(`${apiBaseUrl}/favorites?userId=${userId}`);
    const favorites = await response.json();
    return favorites;
}

// Função para buscar os detalhes de uma academia
async function fetchAcademyDetails(academyId) {
    const response = await fetch(`${apiBaseUrl}/academies/${academyId}`);
    const academy = await response.json();
    return academy;
}

// Função para remover uma academia dos favoritos
async function removeFavorite(favoriteId) {
    try {
        const response = await fetch(`${apiBaseUrl}/favorites/${favoriteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            renderFavorites(); // Re-renderizar os favoritos
            alert('Favorito removido com sucesso!');
        } else {
            const error = await response.text();
            console.error('Falha ao remover dos favoritos:', error);
            alert('Falha ao remover dos favoritos');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao processar a requisição, tente novamente.');
    }
}

// Função para renderizar os favoritos na lista do HTML
async function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''; // Limpar a lista antes de renderizar
    const favorites = await fetchFavorites();

    // Iterar sobre os favoritos e buscar detalhes das academias
    for (const favorite of favorites) {
        const academy = await fetchAcademyDetails(favorite.academyId);
        
        // Criar elemento de lista (agr o id ta sendo passado corretamente)
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${academy.image}" alt="${academy.name}">
            <div>
                <h2>${academy.name}</h2>
                <p>Localização: ${academy.location}</p>
                <p>Endereço: ${academy.address}</p>
                <p>Avaliação: ${academy.rating || 'N/A'}</p>
            </div>
            <button onclick="removeFavorite('${favorite.id}')">Remover</button> 
        `;
        favoritesList.appendChild(listItem);
    }
}
// Chamar a função para renderizar os favoritos ao carregar a página
document.addEventListener('DOMContentLoaded', renderFavorites);
