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

