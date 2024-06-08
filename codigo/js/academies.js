document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', filterAcademies);

    fetchAcademies();
});

async function fetchAcademies() {
    const academy = JSON.parse(sessionStorage.getItem('academy'));

    if (academy) {
        alert('Academias logadas não podem ver outras academias.');
        return; // Impede a busca de academias para academias logadas
    }

    const response = await fetch('http://localhost:3000/academies');
    const academies = await response.json();
    displayAcademies(academies);
}

function displayAcademies(academies) {
    const tbody = document.getElementById('academiesTableBody');
    tbody.innerHTML = '';

    academies.forEach(academy => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="academy-details.html?id=${academy.id}">${academy.name}</a></td>
            <td>${academy.location}</td>
            <td>${academy.rating}</td>
        `;
        tbody.appendChild(row);
    });
}

function filterAcademies() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#academiesTableBody tr');

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const location = row.cells[1].textContent.toLowerCase();

        if (name.includes(searchTerm) || location.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    const isAsc = table.rows[0].cells[columnIndex].classList.toggle('asc');
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent;
        const cellB = b.cells[columnIndex].textContent;

        return isAsc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    rows.forEach(row => tbody.appendChild(row));
}
