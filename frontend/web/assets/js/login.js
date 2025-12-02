document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // URL da API de Login
    const API_URL = 'https://fiscally-untasting-janel.ngrok-free.dev -> http://localhost:3000/api/auth/login'; 

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Login bem-sucedido!
            messageElement.textContent = 'Login realizado com sucesso! Redirecionando...';
            messageElement.style.color = 'green';
            
            // Salvar o token de autenticação
            localStorage.setItem('userToken', data.token);

            // Redirecionar para a página principal (Home)
            window.location.href = 'home.html'; 
        } else {
            // Erro de autenticação (erro vindo do backend)
            messageElement.textContent = data.message || 'Erro ao fazer login. Verifique suas credenciais.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        // Erro de conexão ou rede
        messageElement.textContent = 'Erro de conexão com o servidor. Tente novamente.';
        messageElement.style.color = 'red';
        console.error('Erro na requisição:', error);
    }
});