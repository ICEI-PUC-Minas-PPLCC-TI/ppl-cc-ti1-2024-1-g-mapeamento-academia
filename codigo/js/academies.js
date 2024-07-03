document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    
    // Cria uma versão debounced da função 'filterAcademies'
    const debouncedFilterAcademies = debounce(filterAcademies, 500);
  
    // Agora usa a versão debounced da função no evento de input
    searchInput.addEventListener('input', debouncedFilterAcademies);
  
    fetchAcademies();
    initMap();
  });
  
  // Função debounce conforme fornecida anteriormente
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  let map;
  let userLocation;
  
  function initMap() {
    map = L.map('map').setView([-19.9167, -43.9345], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    navigator.geolocation.getCurrentPosition(function(position) {
      userLocation = [position.coords.latitude, position.coords.longitude];
      L.marker(userLocation).addTo(map)
        .bindPopup('Sua localização atual')
        .openPopup();
    });
  }
  
  let allAcademies = []; // Array global para armazenar todas as academias
  let allMarkers = {}; // Objeto para armazenar referências aos marcadores
  
  async function fetchAcademies() {
    const response = await fetch('http://localhost:3000/academies');
    allAcademies = await response.json();
    displayAcademies(allAcademies);
    addAcademiesToMap(allAcademies);
  }
  


 //lista
  async function displayAcademies(academies) {
    const tbody = document.getElementById('academiesTableBody');
    tbody.innerHTML = '';
  
    for (const academy of academies) {
      const address = academy.location;
      const latLng = await getLatLngFromAddress(address);
      const distance = userLocation ? (map.distance(latLng, userLocation) / 1000).toFixed(2) : 'Indisponível';
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="academy-details.html?id=${academy.id}">${academy.name}</a></td>
        <td>${academy.location}</td>
        <td>${academy.price}</td>
        <td>${distance} km</td>
      `;
      tbody.appendChild(row);
    }
  }
  
  async function getLatLngFromAddress(address) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(address)}`; //api do nominatim tem limite de 1 requisição por segundo
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        // utiliza o primeiro resultado, que é o mais próximo do endereço fornecido pelo nominatim
        const { lat, lon } = data[0];
        return [lat, lon];
      } else {
        console.error('Nenhum resultado encontrado para o endereço:', address);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar as coordenadas para o endereço:', address, error);
      return null;
    }
  }
  
  
  
  
  async function addAcademiesToMap(academies) {
    for (const academy of academies) {
      const address = academy.address;
      const latLng = await getLatLngFromAddress(address);
      if (latLng) {
        const marker = L.marker(latLng).addTo(map);
        marker.bindPopup(`<a href="academy-details.html?id=${academy.id}" target="_blank">${academy.name}</a>`);
        allMarkers[academy.id.toString()] = marker;
        marker.bindTooltip(academy.name, { permanent: true, direction: 'top' }).openTooltip();
        marker.on('click', function() {
          window.location.href = `academy-details.html?id=${academy.id}`;
        });
        if (userLocation) {
          const distance = (map.distance(latLng, userLocation) / 1000).toFixed(2);
          console.log(`A distância até a academia ${academy.name} é: ${distance} km.`);
        }
      } else {
        console.log(`Não foi possível adicionar a academia ${academy.name} ao mapa devido a um endereço inválido.`);
      }
    }
  }
  
  


function filterAcademies() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    let foundAcademies = [];
    const rows = document.querySelectorAll('#academiesTableBody tr');
  
    rows.forEach(row => {
      const name = row.cells[0].textContent.toLowerCase();
      const academyId = row.getAttribute('data-academy-id');
  
      if (name.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  
    allAcademies.forEach(academy => {
      const name = academy.name.toLowerCase();
      if (name.includes(searchTerm)) {
        // verificando se o ID da academia é uma string válida e não nula
        if (academy.id) {
          foundAcademies.push(academy.id.toString());
        }
      }
    });
  
    console.log('IDs das academias encontradas:', foundAcademies); // Depuração
    showAcademiesOnMap(foundAcademies);
  }

  async function showAcademiesOnMap(foundAcademies) {
    console.log('IDs das academias encontradas:', foundAcademies); // Depuração
  
    // Se não houver academias encontradas, não faça nada
    if (foundAcademies.length === 0) {
      console.log('Nenhuma academia corresponde à pesquisa.'); // Depuração
      return; // Sai da função sem adicionar ou remover marcadores
    }
  
    // Converte todos os IDs para strings para comparação
    const foundAcademiesStr = foundAcademies.map(id => id.toString());
  
    // Remove marcadores que não estão na lista de IDs encontrados
    Object.keys(allMarkers).forEach(id => {
      if (!foundAcademiesStr.includes(id)) {
        map.removeLayer(allMarkers[id]);
        delete allMarkers[id]; // Importante remover a referência do marcador
        console.log(`Marcador removido: ${id}`); // Depuração
      }
    });
  
    for (let id of foundAcademiesStr) {
      if (!allMarkers[id]) {
        const academy = allAcademies.find(academy => academy.id.toString() === id);
        if (academy) {
          const latLng = await getLatLngFromAddress(academy.address);
          if (latLng) { // Verifica se latLng não é null
            const marker = L.marker(latLng, {
              title: academy.name // Define o título do marcador com o nome da academia
            }).addTo(map);
  
            marker.bindPopup(`<a href="academy-details.html?id=${academy.id}" target="_blank">${academy.name}</a>`);
            
            // Adiciona a tooltip
            marker.bindTooltip(academy.name, {
              permanent: true,
              direction: 'top'
            }).openTooltip();
  
            // Restaura a funcionalidade de clique
            marker.on('click', function() {
              window.location.href = `academy-details.html?id=${academy.id}`;
            });
  
            allMarkers[id] = marker; // Garante que o ID seja uma string
            console.log(`Marcador adicionado: ${academy.name}`); // Depuração
          } else {
            console.log(`Não foi possível encontrar o endereço: ${academy.location}`);
          }
        }
      }
    }
  }
  
  

  function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);
  
    // Verifica se a ordenação é ascendente ou descendente
    const isAsc = table.rows[0].cells[columnIndex].classList.toggle('asc');
  
    rows.sort((a, b) => {
      let cellA = a.cells[columnIndex].textContent.trim();
      let cellB = b.cells[columnIndex].textContent.trim();
  
      // Se for a terceira coluna (preço), ordena como valor float
      if (columnIndex === 2) {
        cellA = parseFloat(cellA.replace(/[^0-9,.-]/g, '').replace(',', '.'));
        cellB = parseFloat(cellB.replace(/[^0-9,.-]/g, '').replace(',', '.'));
        return isAsc ? cellA - cellB : cellB - cellA;
      }
      // Se for a quarta coluna (distância), ordena como valor float
      else if (columnIndex === 3) {
        cellA = parseFloat(cellA.replace(/[^0-9,.]/g, ''));
        cellB = parseFloat(cellB.replace(/[^0-9,.]/g, ''));
        return isAsc ? cellA - cellB : cellB - cellA;
      }
  
      // Para outras colunas, usa a ordenação de strings
      else {
        return isAsc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      }
    });
  
    // Reinsere as linhas ordenadas no corpo da tabela
    rows.forEach(row => tbody.appendChild(row));
  }