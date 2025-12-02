// ARQUIVO: frontend/web/assets/js/details.js (CORRIGIDO E REFATORADO)

const API_BASE_URL = 'https://fiscally-untasting-janel.ngrok-free.dev -> http://localhost:3000/api';

async function loadItemDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if (!itemId) {
        displayError('ID inválido. Volte à home.');
        return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/donations/${itemId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar item: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Resposta do backend:', data); // Log para depurar

        const item = data.data; // Ajustado: assume {success, data}, mas verifica

        if (!item) {
            throw new Error('Item não encontrado nos dados retornados.');
        }

        renderItemDetails(item);
        document.getElementById('item-details').style.display = 'block';

    } catch (error) {
        console.error('Erro completo:', error);
        displayError(error.message || 'Erro ao carregar detalhes. Usando mock.');

        // Render mock completo no catch
        const mockItem = {
            title: 'Sofá de Teste (MOCK)',
            description: 'Descrição de teste para depuração.',
            category: 'Móveis',
            location: 'Centro, Fortaleza',
            contact: '85999999999',
            imageUrls: ['https://via.placeholder.com/300?text=Mock+Foto+1', 'https://via.placeholder.com/300?text=Mock+Foto+2']
        };
        renderItemDetails(mockItem);
        document.getElementById('item-details').style.display = 'block';

    } finally {
        document.getElementById('loading-details').style.display = 'none';
    }
}

function renderItemDetails(item) {
    document.getElementById('detail-title').textContent = item.title || 'Título não disponível';
    document.getElementById('detail-category').textContent = item.category || 'Categoria não disponível';
    document.getElementById('detail-description').textContent = item.description || 'Descrição não disponível';
    document.getElementById('detail-location').textContent = item.location || 'Localização não disponível';
    document.getElementById('detail-contact').textContent = item.contact || 'Contato não disponível';

    // Galeria
    const gallery = document.getElementById('item-gallery');
    gallery.innerHTML = '';
    (item.imageUrls || []).forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        gallery.appendChild(img);
    });

    // Contato WhatsApp
    const contactLink = document.getElementById('detail-contact-link');
    if (item.contact) {
        const whatsappNum = item.contact.replace(/\D/g, '');
        contactLink.href = `https://wa.me/55${whatsappNum}`;
        contactLink.style.display = 'inline-block';
    } else {
        contactLink.style.display = 'none';
    }

    // Mapa (embed simples do Google Maps)
    const mapDiv = document.getElementById('map-placeholder');
    if (item.location) {
        mapDiv.innerHTML = `<iframe src="https://www.google.com/maps?q=${encodeURIComponent(item.location)}&output=embed" width="100%" height="200" frameborder="0"></iframe>`;
    } else {
        mapDiv.innerHTML = 'Mapa não disponível.';
    }
}

function displayError(msg) {
    document.getElementById('error-message').textContent = msg;
    document.getElementById('error-message').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', loadItemDetails);