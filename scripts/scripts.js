// Carregamento do menu
fetch('menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar menu: ', error));

// Mostrar ou esconder menu dependendo do tamanho da tela
function mudouTamanho() {
    const menu = document.getElementById('menu');
    if (menu) {
        if (window.innerWidth >= 694) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }
}

// Alternar visibilidade do menu ao clicar no botão
function clickMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }
}

// Mostrar botão "Voltar ao topo" ao rolar
window.onscroll = function () {
    const btn = document.getElementById("topBtn");
    if (btn) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }
};

// Rolagem suave para o topo
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
