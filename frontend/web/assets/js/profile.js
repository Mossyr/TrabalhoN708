// ARQUIVO: frontend/web/assets/js/profile.js (OTIMIZADO)

const API_BASE_URL = 'https://fiscally-untasting-janel.ngrok-free.dev -> http://localhost:3000/api';

/**
 * Função para buscar os dados do usuário e suas doações.
 */
async function loadProfile() {
    const token = localStorage.getItem('userToken');
    const loadingElement = document.getElementById('loading-profile');
    const contentElement = document.getElementById('profile-content');

    // 1. VERIFICAÇÃO DE AUTENTICAÇÃO
    if (!token) {
        alert('Você precisa estar logado para ver o perfil.');
        window.location.href = 'index.html';
        return;
    }

    try {
        // 2. CARREGAMENTO PARALELO (OTIMIZAÇÃO)
        // Faz as duas requisições ao mesmo tempo.
        const [userResponse, donationsResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/auth/me`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`${API_BASE_URL}/donations/my`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);

        // 3. PROCESSAR RESPOSTAS
        const [userData, donationsData] = await Promise.all([
            userResponse.json(),
            donationsResponse.json()
        ]);


        // --- A. PROCESSAR DADOS DO USUÁRIO ---
        if (userResponse.ok) {
            document.getElementById('profile-name').textContent = userData.data.name;
            document.getElementById('profile-email').textContent = userData.data.email;
        } else {
            // Se falhar (ex: token expirado, erro 401), forçamos o logout
            alert(userData.message || 'Falha ao carregar perfil. Refaça o login.');
            localStorage.removeItem('userToken');
            window.location.href = 'index.html';
            return;
        }

        // --- B. PROCESSAR MINHAS DOAÇÕES ---
        const listElement = document.getElementById('my-donations-list');
        listElement.innerHTML = ''; // Limpa o "Nenhuma doação ativa." inicial

        if (donationsResponse.ok && donationsData.data && donationsData.data.length > 0) {
            
            donationsData.data.forEach(donation => {
                const item = document.createElement('div');
                item.className = 'donation-card-small';
                // Certifica-se de que o ID do MongoDB (_id) é usado para o link
                item.innerHTML = `
                    <p><b>${donation.title}</b></p>
                    <p>Status: ${donation.status}</p>
                    <a href="details.html?id=${donation._id}">Ver Detalhes</a>
                `;
                listElement.appendChild(item);
            });
            document.getElementById('donations-count').textContent = donationsData.data.length;
        } else if (donationsResponse.ok && donationsData.data && donationsData.data.length === 0) {
             // Caso a requisição seja OK, mas não haja doações
             listElement.innerHTML = '<p>Você ainda não publicou nenhuma doação.</p>';
             document.getElementById('donations-count').textContent = 0;
        } else {
            // Se a rota falhar (erro 500 no backend), exibe o erro
            listElement.innerHTML = `<p class="error-message">Erro ao carregar doações: ${donationsData.message || 'Falha na conexão.'}</p>`;
        }

    } catch (error) {
        console.error('Erro de conexão ou requisição no perfil:', error);
        alert('Erro fatal ao conectar com a API. Verifique o servidor Node.js.');
    } finally {
        // Esconde o loading e mostra o conteúdo, independente do resultado (sucesso/erro)
        loadingElement.style.display = 'none';
        contentElement.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', loadProfile);

document.getElementById('logout-button').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('userToken');
    window.location.href = 'index.html';
});