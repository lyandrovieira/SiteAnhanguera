// Carregamento do menu
fetch('menu-ruas.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o menu: ', error));
