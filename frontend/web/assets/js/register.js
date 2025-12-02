// URLs da API (Substituir 'http://localhost:3000' pelo endereço real do backend)
const API_URL = 'https://fiscally-untasting-janel.ngrok-free.dev -> http://localhost:3000/api/auth/register'; 

document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Validação básica do lado do cliente (pode ser expandida)
    if (password.length < 6) {
        messageElement.textContent = 'A senha deve ter no mínimo 6 caracteres.';
        messageElement.style.color = 'red';
        return;
    }

    try {
        // ENVIANDO OS DADOS PARA O BACKEND (ENDPOINT /api/auth/register)
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Cadastro bem-sucedido!
            messageElement.textContent = 'Cadastro realizado com sucesso! Você será redirecionado para o Login.';
            messageElement.style.color = 'green';
            
            // Redireciona para a página de Login após 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 2000);
            
        } else {
            // Erro vindo do backend (ex: email já cadastrado)
            messageElement.textContent = data.message || 'Erro ao se cadastrar. Tente novamente.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        // Erro de conexão ou rede
        messageElement.textContent = 'Erro de conexão com o servidor. Verifique se o backend está ativo.';
        messageElement.style.color = 'red';
        console.error('Erro na requisição:', error);
    }
});