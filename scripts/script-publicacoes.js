// Carregamento do menu
fetch('menu-publicacoes.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o menu: ', error));
