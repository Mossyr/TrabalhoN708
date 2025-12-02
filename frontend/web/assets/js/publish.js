const API_BASE_URL = 'https://fiscally-untasting-janel.ngrok-free.dev -> http://localhost:3000/api';

document.getElementById('publish-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('Sua sessão expirou. Faça login novamente.');
        window.location.href = 'index.html'; 
        return;
    }

    const form = event.target;
    const messageElement = document.getElementById('publish-message');
    
    // 1. Coleta os dados do formulário, incluindo arquivos
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('contact', document.getElementById('contact').value); // NOVO CAMPO

    // 2. Anexa os arquivos (apenas os 2 primeiros)
    const files = document.getElementById('image').files;
    if (files.length === 0 || files.length > 2) {
        messageElement.textContent = 'Por favor, anexe entre 1 e 2 fotos do item.';
        messageElement.style.color = 'red';
        return;
    }

    for (let i = 0; i < Math.min(files.length, 2); i++) {
        formData.append('images', files[i]); // 'images' é o nome que o backend irá esperar
    }

    // 💡 OBSERVAÇÃO CRÍTICA PARA O BACKEND:
    // Ao usar FormData para upload de arquivos, o HEADER 'Content-Type': 'application/json' NÃO DEVE SER ENVIADO.
    // O navegador se encarrega de definir o Content-Type como 'multipart/form-data'.
    
    try {
        const response = await fetch(`${API_BASE_URL}/donations`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // A autenticação continua
            },
            body: formData // Envia o objeto FormData
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = 'Item publicado com sucesso! Redirecionando...';
            messageElement.style.color = 'green';
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } else {
            messageElement.textContent = data.message || 'Erro ao publicar o item. Verifique os dados.';
            messageElement.style.color = 'red';
        }

    } catch (error) {
        messageElement.textContent = 'Erro de conexão com o backend. O servidor de API está rodando?';
        messageElement.style.color = 'red';
        console.error('Erro na requisição de upload:', error);
    }
});
