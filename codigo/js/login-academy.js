document.getElementById('loginAcademyForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`http://localhost:3000/academies?login=${login}&password=${password}`);
    const academies = await response.json();

    if (academies.length > 0) {
        alert('Login realizado com sucesso!');
        loginAcademy(academies[0]); // Chamar função de login de academia
        localStorage.setItem('academyId', academies[0].id);
        window.location.href = `academy-dashboard.html?id=${academies[0].id}`;
    } else {
        alert('Nome ou senha incorretos.');
    }
});
