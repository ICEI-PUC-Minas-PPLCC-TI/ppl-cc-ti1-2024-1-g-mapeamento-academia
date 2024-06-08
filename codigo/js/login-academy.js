document.getElementById('loginAcademyForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`http://localhost:3000/academies?name=${name}&password=${password}`);
    const academies = await response.json();

    if (academies.length > 0) {
        alert('Login realizado com sucesso!');
        loginAcademy(academies[0]); // Chamar função de login de academia
        window.location.href = `academy-dashboard.html?id=${academies[0].id}`;
    } else {
        alert('Nome ou senha incorretos.');
    }
});
