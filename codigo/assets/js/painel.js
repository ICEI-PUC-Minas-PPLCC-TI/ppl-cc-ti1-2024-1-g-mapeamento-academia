// Dados a serem armazenados no Local Storage
const painelData = {
    nome: "SmartFit - Unidade XYZ",
    endereco: "Rua da Água, 29",
    descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nulla neque repellat eos obcaecati doloribus vitae laboriosam, ullam ea perspiciatis error sed magnam accusamus est ad, rem facilis voluptates rerum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel atque iusto, tempora autem quos quas inventore asperiores quidem officia repellat perspiciatis ex. Cumque sint nesciunt ipsum est molestias nobis aliquam.",
    mainPhoto: "../assets/img/logo.png",
    photos: [
        "../assets/img/esteira.png",
        "../assets/img/acad.png",
        "../assets/img/smart-blue.png",
        "../assets/img/smart-esteira.png",
        "../assets/img/acad.png",
        "../assets/img/smart-blue.png",
        "../assets/img/smart-esteira.png",
        "../assets/img/smart-outside.jpg"
    ]
};

// Armazenar os dados no Local Storage
localStorage.setItem('painelData', JSON.stringify(painelData));

// Recuperar os dados do Local Storage
const storedData = JSON.parse(localStorage.getItem('painelData'));

// Exibir os dados na página HTML
document.getElementById('nome').textContent = `Nome: ${storedData.nome}`;
document.getElementById('endereco').textContent = `Endereço: ${storedData.endereco}`;
document.getElementById('descricao').textContent = `Descrição: ${storedData.descricao}`;
document.getElementById('mainPhoto').src = storedData.mainPhoto;

storedData.photos.forEach((photo, index) => {
    document.getElementById(`foto${index + 1}`).querySelector('img').src = photo;
});
