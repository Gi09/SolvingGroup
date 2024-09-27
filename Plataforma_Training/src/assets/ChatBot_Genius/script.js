
// Função para abrir e fechar o chat
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer.classList.contains('show')) {
        chatContainer.classList.remove('show');
    } else {
        chatContainer.classList.add('show');
    }
}

// Função para adicionar uma mensagem na tela
function addMessage(content, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender + "-message");

    const messageText = document.createElement("span");
    messageText.innerText = content;
    messageDiv.appendChild(messageText);

    if (sender === "chatbot") {
        const speakButton = document.createElement("button");
        speakButton.innerText = "🔊 Ouvir";
        speakButton.classList.add("speak-btn");
        speakButton.onclick = () => speak(content);
        messageDiv.appendChild(speakButton);
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para converter texto em áudio
function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    synth.speak(utterance);
}

// Função para enviar uma mensagem
function sendMessage() {
    const inputField = document.getElementById("message-input");
    const message = inputField.value.trim();
    if (message === "") return;

    addMessage(message, "user");

    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.response, "chatbot");
    })
    .catch(error => {
        console.error('Erro ao enviar mensagem:', error);
        addMessage("Desculpe, algo deu errado. Tente novamente mais tarde.", 'chatbot');
    });

    inputField.value = "";
}