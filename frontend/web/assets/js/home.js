// ARQUIVO: frontend/web/assets/js/home.js (REFATORADO)

const API_BASE_URL = 'https://fiscally-untasting-janel.ngrok-free.dev -> http://localhost:3000/api';

let allDonations = []; // Armazena todas as doações para filtro

async function fetchDonations() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('Faça login para continuar.');
        window.location.href = 'index.html';
        return;
    }

    const container = document.getElementById('donations-container');
    const loading = document.getElementById('loading-message');

    // Mocks ajustados
    const mockDonations = [
        { _id: 'mock1', title: 'Sofá', description: 'Bom estado.', category: 'moveis', location: 'Centro', contact: '85999999999', imageUrls: ['https://via.placeholder.com/300'] },
        // Adicione mais se quiser
    ];

    try {
        const response = await fetch(`${API_BASE_URL}/donations`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        allDonations = data.data || mockDonations;
        renderDonations(allDonations);
    } catch (error) {
        allDonations = mockDonations;
        renderDonations(allDonations);
        loading.textContent = 'Usando dados de teste.';
    } finally {
        loading.style.display = 'none';
    }
}

function renderDonations(donations) {
    const container = document.getElementById('donations-container');
    container.innerHTML = '';
    donations.forEach(item => {
        const card = document.createElement('div');
        card.className = 'donation-card';
        const imgSrc = item.imageUrls?.[0] || 'default.jpg';
        card.innerHTML = `
            <img src="${imgSrc}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description.slice(0, 80)}...</p>
            <p>Local: ${item.location}</p>
            <a href="details.html?id=${item._id}"><button class="primary-btn">Detalhes</button></a>
        `;
        container.appendChild(card);
    });
}

function filterDonations() {
    const query = (document.getElementById('search-input') || document.getElementById('search-input-mobile')).value.toLowerCase();
    const filtered = allDonations.filter(item => 
        item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );
    renderDonations(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDonations();
    const toggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => nav.classList.toggle('active'));

    document.getElementById('logout-button').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userToken');
        window.location.href = 'index.html';
    });
});