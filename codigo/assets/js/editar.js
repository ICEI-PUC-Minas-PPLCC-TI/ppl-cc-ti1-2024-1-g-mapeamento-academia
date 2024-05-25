document.addEventListener('DOMContentLoaded', function() {
    const storedData = JSON.parse(localStorage.getItem('painelData'));

    if (storedData) {
        document.getElementById('nome').value = storedData.nome;
        document.getElementById('endereco').value = storedData.endereco;
        document.getElementById('descricao').value = storedData.descricao;
        document.getElementById('mainPhoto').value = storedData.mainPhoto;
        document.getElementById('photos').value = storedData.photos.join(', ');
    }
});

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const updatedData = {
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        descricao: document.getElementById('descricao').value,
        mainPhoto: document.getElementById('mainPhoto').value,
        photos: document.getElementById('photos').value.split(',').map(photo => photo.trim())
    };

    localStorage.setItem('painelData', JSON.stringify(updatedData));

    // Redirecionar de volta para o painel de controle
    window.location.href = 'painel-de-controle.html';
});
