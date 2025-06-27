// Carregamento do menu
fetch('menu-publicacoes.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o menu: ', error));

// Mostrar ou esconder menu dependendo do tamanho da tela
function mudouTamanho() {
    const menu = document.getElementById('menu');
    const burguer = document.getElementById('burguer');
    if (menu) {
        if (window.innerWidth >= 694) {
            menu.style.display = 'block';
            if (burguer) burguer.classList.remove('fixed-navbar');
        } else {
            menu.style.display = 'none';
            if (burguer) burguer.classList.add('fixed-navbar');
        }
    }
}

// Fixar navbar ao topo após o cabeçalho sumir
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const navbar = document.getElementById('menu-container');
    const burguer = document.getElementById('burguer');
    const headerBottom = header.getBoundingClientRect().bottom + window.scrollY;
    if (window.scrollY >= headerBottom) {
        navbar.classList.add('fixed-navbar');
        if (burguer) burguer.classList.add('fixed-navbar');
    } else {
        navbar.classList.remove('fixed-navbar');
        if (burguer) burguer.classList.remove('fixed-navbar');
    }
});

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

// Garante que header e navbar não estejam fixos ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0); // Garante que a página comece no topo
    const navbar = document.getElementById('menu-container');
    const burguer = document.getElementById('burguer');
    if (navbar) navbar.classList.remove('fixed-navbar');
    if (burguer) burguer.classList.remove('fixed-navbar');
});

let tamanhoFonte = 16;

function ajustarFonte(delta) {
    tamanhoFonte += delta;
    if (tamanhoFonte < 10) tamanhoFonte = 10;
    if (tamanhoFonte > 30) tamanhoFonte = 30;
    document.querySelector("main").style.fontSize = tamanhoFonte + 'px';
}

function resetarFonte() {
    tamanhoFonte = 16;
    document.querySelector("main").style.fontSize = tamanhoFonte + 'px';
}