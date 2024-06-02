

//funções usando o LocalStorage para armazenar os dados inseridos/mostrar dados ja inseridos

function lerCadastros() {
  let localInfo = localStorage.getItem('cadastros');
  let objInfo = {};
  if (localInfo) //testa pra ver se tem alguma coisa ja no localstorage e converte em json
    objInfo = JSON.parse(localInfo);
  else {
    objInfo = { cadastros: [] }
  }

  return objInfo;
}


function insereDados(dados) {
  localStorage.setItem('cadastros', JSON.stringify(dados));
}

function generoSelecionado() {
  //seleciona todos os botões de gênero
  let botoesGenero = document.getElementsByName('generos');
  //percorre todos os botões para determinar qual deles está selecionado
  for (let i = 0; i < botoesGenero.length; i++) {
    if (botoesGenero[i].checked) {
      return botoesGenero[i].value;
    }
  }
  //se nenhum botão estiver marcado, assumir que o gênero é "outro"
  return 'outro';
}

function cadastraDados(dados) {
  let objDados = lerCadastros();
  let strNome = document.getElementById('nome_usuario').value;
  let strTelefone = document.getElementById('telefone_usuario').value;
  let strEmail = document.getElementById('email_usuario').value;
  let strCpf = document.getElementById('cpf_usuario').value;
  let strEstado = document.getElementById('ESTADO').value;
  let strCidade = document.getElementById('CIDADE').value;
  let strGenero = generoSelecionado();
  let strData = document.getElementById('data_usuario').value;
  let novoUsuario = {
    nome: strNome,
    telefone: strTelefone,
    email: strEmail,
    cpf: strCpf,
    estado: strEstado,
    cidade: strCidade,
    genero: strGenero,
    data: strData
  }

  objDados.cadastros.push(novoUsuario);
  insereDados(objDados);
}

//seleção dinâmica de Estados e Cidades a partir de um JSON localizado em um JSONServer (temporariamente pessoal)

const urlJSON = 'https://8233cdf2-c07b-4922-bf70-6d2f874ca974-00-9xcrit4ey3zv.riker.replit.dev/estadosInfo'

let estadosInfo = []

function carregaJSONServer(func) {
  fetch(urlJSON)
    .then(function (response) { return response.json() })
    .then(function (dados) {
      estadosInfo = dados
      console.log('JSON das cidades carregado com sucesso')
      console.log(dados)
      func()
    })
}

//botão de cadastrar
document.getElementById('cadastrar').addEventListener('click', cadastraDados);
