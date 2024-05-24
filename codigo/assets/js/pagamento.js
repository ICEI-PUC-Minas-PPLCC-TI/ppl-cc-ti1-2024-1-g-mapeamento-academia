function mostrarform(tipo) {
  var dadoscartao = document.getElementById('dadoscartao');
  var dadospix = document.getElementById('dadospix');
  dadoscartao.classList.add('esconde');
  dadospix.classList.add('esconde');
  
  if (tipo === 'credito' || tipo === 'debito') {
      dadoscartao.classList.remove('esconde');
      verificarCampos();
  } else if (tipo === 'pix') {
      dadospix.classList.remove('esconde');
  }
}

function verificarCampos() {
  var campos = document.querySelectorAll('#dadoscartao input');
  var todosPreenchidos = Array.from(campos).every(input => input.value);
  document.getElementById('botaopag').disabled = !todosPreenchidos;
}

// Adicionando ouvintes de eventos para cada campo de entrada
document.querySelectorAll('#dadoscartao input').forEach(input => {
  input.addEventListener('input', verificarCampos);
});

function processarpag() {
  // Aqui você adicionaria o código para processar o pagamento
  alert('Pagamento processado!');
}

function codigo() {
  // Aqui você adicionaria o código para gerar o código de teste e o QR Code
  window.open('pagina-codigo.html', '_blank');
}

// Chame verificarCampos quando a página carregar para definir o estado inicial do botão
window.onload = verificarCampos;
