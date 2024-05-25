document.addEventListener('DOMContentLoaded', function() {
    const storedData = JSON.parse(localStorage.getItem('painelData'));

    if (storedData) {
        document.getElementById('nome').textContent = `Nome: ${storedData.nome}`;
        document.getElementById('endereco').textContent = `Endereço: ${storedData.endereco}`;
        document.getElementById('descricao').textContent = `Descrição: ${storedData.descricao}`;
        document.getElementById('mainPhoto').src = storedData.mainPhoto;

        storedData.photos.forEach((photo, index) => {
            const photoElement = document.getElementById(`foto${index + 1}`);
            if (photoElement) {
                photoElement.querySelector('img').src = photo;
            }
        });
    }
});
