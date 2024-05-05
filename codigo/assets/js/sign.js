let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signInBtn.onclick = function(event) {
    event.preventDefault();
    nameField.style.maxHeight = "0";
    title.innerHTML = "Login";
    signUpBtn.classList.add("disable");
    signInBtn.classList.remove("disable");
}

signUpBtn.onclick = function(event) {
    event.preventDefault();
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Cadastro";
    signUpBtn.classList.remove("disable");
    signInBtn.classList.add("disable");
}