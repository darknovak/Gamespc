const apiKey = 'd525fe7a9e9f4b7e9972115cd52cce82';  // Substitua com sua chave API da RAWG
const apiUrl = 'https://api.rawg.io/api/games?key=' + apiKey + '&page_size=6';  // Buscar 6 jogos

// Função para pegar e exibir os jogos
async function fetchGames() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const games = data.results;
        displayGames(games);
    } catch (error) {
        console.error('Erro ao buscar os jogos:', error);
    }
}

// Função para exibir os jogos com botão "Jogar"
function displayGames(games) {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';  // Limpar conteúdo anterior
    
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        
        gameCard.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.short_description || 'Sem descrição disponível.'}</p>
            <button onclick="playGame('${game.slug}')">Jogar</button>
        `;
        
        gamesContainer.appendChild(gameCard);
    });
}

// Função para abrir o jogo em iFrame
function playGame(slug) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://itch.io/embed/iframe/${slug}`;  // Aqui você coloca o link do jogo
    iframe.width = "100%";
    iframe.height = "600";
    iframe.style.border = "none";
    
    // Abre o jogo dentro de uma nova janela
    const gameWindow = window.open('', 'gameWindow', 'width=800, height=600');
    gameWindow.document.body.appendChild(iframe);
}

// Inicia a busca pelos jogos
fetchGames();
$(document).ready(function() {
    const apiKey = 'd525fe7a9e9f4b7e9972115cd52cce82';  // Substitua pela sua chave da API RAWG
    const baseUrl = 'https://api.rawg.io/api/games';

    // Função para buscar jogos de plataformas específicas
    function fetchGames() {
        $.ajax({
            url: `${baseUrl}?key=${apiKey}&platforms=18,1,7&page_size=10`,  // Filtrando por plataformas (PlayStation, PC, Xbox)
            method: 'GET',
            success: function(data) {
                displayGames(data.results);
            },
            error: function(error) {
                console.log('Erro ao carregar os jogos:', error);
            }
        });
    }

    // Função para exibir os jogos
    function displayGames(games) {
        const gameContainer = $('#game-container');
        gameContainer.empty();  // Limpa o contêiner antes de adicionar os jogos

        games.forEach(game => {
            const gameCard = `
                <div class="game-card">
                    <img src="${game.background_image}" alt="${game.name}">
                    <div class="game-info">
                        <h3>${game.name}</h3>
                        <p>Plataforma: ${game.platforms.map(platform => platform.name).join(', ')}</p>
                        <p>${game.released}</p>
                        <a href="${game.url}" target="_blank">Jogar Agora</a>
                    </div>
                </div>
            `;
            gameContainer.append(gameCard);
        });
    }

    // Chama a função para buscar os jogos quando a página carregar
    fetchGames();
});

