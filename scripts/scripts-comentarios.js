// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
    apiKey: "AIzaSyAMOTLT-aG8HubU3MmO8mvAeXEGsefY6l4",
    authDomain: "site-anhanguera.firebaseapp.com",
    databaseURL: "https://site-anhanguera-default-rtdb.firebaseio.com/",
    projectId: "site-anhanguera",
    storageBucket: "site-anhanguera.firebasestorage.app",
    messagingSenderId: "240750650666",
    appId: "1:240750650666:web:227c37e036f6da425d6a53"
};

// Inicializa o Firebase apenas se ainda não estiver inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Autenticação anônima
firebase.auth().signInAnonymously().catch(console.error);

// Identifica a página atual (ex: "casa-da-celg")
const paginaAtual = window.location.pathname.split('/').pop().replace('.html', '');

// Referência dinâmica para os comentários da página
const db = firebase.database();
const comentariosRef = db.ref('comentarios-' + paginaAtual);


// Função para escapar HTML (sanitização básica)
function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function(m) {
        return ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[m];
    });
}

// Função para criar o formulário de resposta
function criarFormResposta(parentKey) {
    const form = document.createElement('form');
    form.className = 'formResposta';
    form.innerHTML = `
        <input type="text" class="nomeResposta" placeholder="Seu nome:" maxlength="40">
        <textarea class="mensagemResposta" placeholder="Escreva sua resposta:" required maxlength="500"></textarea>
        <button type="submit" class="btnEnviarResposta">Enviar Resposta</button>
    `;
    form.onsubmit = function(e) {
        e.preventDefault();
        let nome = form.querySelector('.nomeResposta').value || 'Anônimo';
        let mensagem = form.querySelector('.mensagemResposta').value;
        nome = nome.trim().slice(0, 40);
        mensagem = mensagem.trim().slice(0, 500);
        if (mensagem === '') return;
        comentariosRef.child(parentKey).child('respostas').push({
            nome: escapeHTML(nome),
            mensagem: escapeHTML(mensagem),
            data: new Date().toLocaleString()
        });
        // Remove o formulário e restaura o botão responder
        if (form.parentElement) {
            const btnCancelar = form.parentElement.querySelector('.btnCancelarResposta');
            if (btnCancelar) {
                btnCancelar.textContent = 'Responder';
                btnCancelar.className = 'btnResponder';
            }
        }
        form.remove();
    };
    return form;
}

// Função para exibir respostas
function exibirRespostas(respostas, ul) {
    if (!respostas) return;
    Object.entries(respostas).forEach(([key, resposta]) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${escapeHTML(resposta.nome)}</strong> <em>(${escapeHTML(resposta.data)})</em>:<br>${escapeHTML(resposta.mensagem)}`;
        ul.appendChild(li);
    });
}

// Exibir comentários e respostas
comentariosRef.on('value', function(snapshot) {
    const lista = document.getElementById('listaComentarios');
    lista.innerHTML = '';
    const comentarios = snapshot.val();
    if (!comentarios) return;
    Object.entries(comentarios).forEach(([key, comentario]) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${escapeHTML(comentario.nome)}</strong> <em>(${escapeHTML(comentario.data)})</em>:<br>${escapeHTML(comentario.mensagem)}`;
        // Botão responder/cancelar
        const btnResponder = document.createElement('button');
        btnResponder.textContent = 'Responder';
        btnResponder.type = 'button';
        btnResponder.className = 'btnResponder';
        btnResponder.onclick = function() {
            const formExistente = li.querySelector('.formResposta');
            if (!formExistente) {
                li.appendChild(criarFormResposta(key));
                btnResponder.textContent = 'Cancelar Resposta';
                btnResponder.className = 'btnCancelarResposta';
            } else {
                formExistente.remove();
                btnResponder.textContent = 'Responder';
                btnResponder.className = 'btnResponder';
            }
        };
        li.appendChild(btnResponder);

        // Lista de respostas
        const ulRespostas = document.createElement('ul');
        ulRespostas.className = 'listaRespostas';
        exibirRespostas(comentario.respostas, ulRespostas);
        li.appendChild(ulRespostas);

        lista.appendChild(li);
    });
});

// Enviar comentário principal
document.getElementById('comentarioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let nome = document.getElementById('nome').value || 'Anônimo';
    let mensagem = document.getElementById('mensagem').value;
    nome = nome.trim().slice(0, 40);
    mensagem = mensagem.trim().slice(0, 500);
    if (mensagem === '') return;
    comentariosRef.push({
        nome: escapeHTML(nome),
        mensagem: escapeHTML(mensagem),
        data: new Date().toLocaleString()
    });
    document.getElementById('mensagem').value = '';
});
