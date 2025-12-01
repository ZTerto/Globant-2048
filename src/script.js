document.addEventListener("DOMContentLoaded", () => 
{
	const tiles = document.querySelectorAll(".tile");
	const scoreElement = document.getElementById("score");
	const restartButton = document.getElementById("restart-btn");

	// 🔹 Inicializamos el juego
	function initGame() 
	{
		tiles.forEach(tile => 
		{
			tile.textContent = "";
			tile.removeAttribute("data-value");
		});
	updateScore(0);
	}

	// 🔹 Función para actualizar el score
	function updateScore(value) 
	{
		scoreElement.textContent = value;
		insertRandomTile();
		insertRandomTile();
	}

	function insertRandomTile() 
	{
		const emptyTiles = Array.from(tiles).filter(tile => tile.textContent === "");
		const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
		let value;

		if (Math.random() < 0.5) 
		{
			value = 2;
		}
		else 
		{
			value = 4;
		}

		randomTile.textContent = value;
		randomTile.setAttribute("data-value", value);
	}

	// 🔹 Evento para reiniciar
	restartButton.addEventListener("click", () => 
	{
		initGame();
	});

	// 🔹 Primera inicialización
	initGame();
});
