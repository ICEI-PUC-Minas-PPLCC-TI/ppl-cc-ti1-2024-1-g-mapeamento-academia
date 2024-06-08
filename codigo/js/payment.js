function mostrarform(tipo) {
    var dadoscartaoC = document.getElementById('dadoscartaoC');
    var dadoscartaoD = document.getElementById('dadoscartaoD');
    var dadospix = document.getElementById('dadospix');
    
    dadoscartaoC.classList.add('esconde');
    dadoscartaoD.classList.add('esconde');
    dadospix.classList.add('esconde');

    document.getElementById('credito-btn').classList.remove('selected');
    document.getElementById('debito-btn').classList.remove('selected');
    document.getElementById('pix-btn').classList.remove('selected');

    if (tipo === 'credito') {
        dadoscartaoD.classList.remove('esconde');
        dadoscartaoC.classList.add('mostrar');
        document.getElementById('credito-btn').classList.add('selected');
        
        dadoscartaoD.classList.remove('mostrar');
        dadoscartaoD.classList.add('esconde');
        
        dadospix.classList.remove('mostrar');
        dadospix.classList.add('esconde');

    } else if (tipo === 'debito') {
        dadoscartaoC.classList.remove('esconde');
        dadoscartaoD.classList.add('mostrar');
        document.getElementById('debito-btn').classList.add('selected');
        
        dadoscartaoC.classList.remove('mostrar');
        dadoscartaoC.classList.add('esconde');
        
        dadospix.classList.remove('mostrar');
        dadospix.classList.add('esconde');

    } else if (tipo === 'pix') {
        dadospix.classList.remove('esconde');
        dadospix.classList.add('mostrar');
        document.getElementById('pix-btn').classList.add('selected');
        
        dadoscartaoC.classList.remove('mostrar');
        dadoscartaoC.classList.add('esconde');

        dadoscartaoD.classList.remove('mostrar');
        dadoscartaoD.classList.add('esconde');
        
    }
}

function processarpag(){
    alert("Pagamento concluido!");
}

window.onload = verificarCampos;