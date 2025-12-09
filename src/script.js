	const tiles = document.querySelectorAll(".tile");
	const scoreElement = document.getElementById("score");
	const restartButton = document.getElementById("restart-btn");
	const backButton = document.getElementById("back-btn");

	//20251201
	// initGame -> updateScore -> insertRandomTile
	// Inserta un nuevo número (2 o 4) en una celda vacía aleatoria
	function insertRandomTile() 
	{
		const emptyTiles = Array.from(tiles).filter(tile => tile.textContent === "");
		if (emptyTiles.length === 0) return;

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

	//20251201
	// initGame -> updateScore
	// Actualiza el marcador y añade dos números iniciales
	function updateScore(value) 
	{
		scoreElement.textContent = value;
		insertRandomTile();
		insertRandomTile();
	}

	//20251201
	// initGame -> updateScore
	// Inicializamos el juego
	function initGame() 
	{
		tiles.forEach(tile => 
		{
			tile.textContent = "";
			tile.removeAttribute("data-value");
		});
		updateScore(0);
	}

	//20251201
	// Press key -> getBoardState
	// Obtiene el estado actual del tablero como una matriz 2D
	function getBoardState()
	{
		const board = [];
		let row = 0;
		while (row < 4) 
		{
			const rowData = [];
			let col = 0;
			while (col < 4) 
			{
				const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
				const value = parseInt(tile.textContent) || 0;
				rowData.push(value);
				col++;
			}
			board.push(rowData);
			row++;
		}
		return board;
	}

	//20251201
	// Press key -> resetNumbers
	// Reinicia el contenido de todas las celdas
	function resetNumbers() 
	{
		tiles.forEach(tile => 
		{
			tile.textContent = "";
			tile.removeAttribute("data-value");
		});
	}

	//20251201
	// Press key -> moveUpWithMerge
	// Fusionar hacia arriba
	function moveUpWithMerge(column) 
	{
		let compacted = [];
		let i = 0;
		while (i < column.length) 
		{
			if (column[i] !== 0) 
			{
				compacted.push(column[i]);
			}
			i++;
		}

		let merged = [];
		i = 0;
		while (i < compacted.length) 
		{
			if (compacted[i] === compacted[i + 1]) 
			{
				merged.push(compacted[i] + compacted[i + 1]);
				i += 2;
			}
			else
			{
				merged.push(compacted[i]);
				i++;
			}
		}

		while (merged.length < 4) 
		{
			merged.push(0);
		}
		return merged;
	}


	//20251201
	// Press key -> moveDownWithMerge
	// Fusionar hacia abajo
	function moveDownWithMerge(column) 
	{
		let compacted = [];
		let i = 0;
		while (i < column.length) 
		{
			if (column[i] !== 0) 
			{
				compacted.push(column[i]);
			}
			i++;
		}

		let merged = [];
		i = compacted.length - 1;
		while (i >= 0) 
		{
			if (i > 0 && compacted[i] === compacted[i - 1]) 
			{
				merged.unshift(compacted[i] + compacted[i - 1]);
				i -= 2;
			}
			else
			{
				merged.unshift(compacted[i]);
				i--;
			}
		}

		while (merged.length < 4) 
		{
			merged.unshift(0);
		}
		return merged;
	}


	//20251201
	// Press key -> moveLeftWithMerge
	// Fusionar hacia la izquierda
	function moveLeftWithMerge(row) 
	{
		let compacted = [];
		let i = 0;
		while (i < row.length) 
		{
			if (row[i] !== 0) 
			{
				compacted.push(row[i]);
			}
			i++;
		}

		let merged = [];
		i = 0;
		while (i < compacted.length) 
		{
			if (compacted[i] === compacted[i + 1]) 
			{
				merged.push(compacted[i] + compacted[i + 1]);
				i += 2;
			}
			else
			{
				merged.push(compacted[i]);
				i++;
			}
		}

		while (merged.length < 4) 
		{
			merged.push(0);
		}
		return merged;
	}

	//20251201
	// Press key -> moveRightWithMerge
	// Fusionar hacia la derecha
	function moveRightWithMerge(row) 
	{
		let compacted = [];
		let i = 0;
		while (i < row.length) 
		{
			if (row[i] !== 0) 
			{
				compacted.push(row[i]);
			}
			i++;
		}

		let merged = [];
		i = compacted.length - 1;
		while (i >= 0) 
		{
			if (i > 0 && compacted[i] === compacted[i - 1]) 
			{
				merged.unshift(compacted[i] + compacted[i - 1]);
				i -= 2;
			}
			else
			{
				merged.unshift(compacted[i]);
				i--;
			}
		}

		while (merged.length < 4) 
		{
			merged.unshift(0);
		}
		return merged;
	}


	//20251201
	// Press key -> UpdateBoard
	// Actualiza el tablero con una nueva matriz de valores
let score = 0;
function updateBoard(board) 
{
	score = 0;
	let row = 0;
	while (row < 4) 
	{
		let col = 0;
		while (col < 4) 
		{
			const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
			const previousValue = parseInt(tile.textContent) || 0;
			const value = board[row][col];

			if (value === 0) 
			{
				tile.textContent = "";
				tile.removeAttribute("data-value");
			}
			else
			{
				tile.textContent = value;
				tile.setAttribute("data-value", value);
				score += value;
				// Añadir clase para animación
				tile.classList.add("merged");

				// Eliminar la clase después de la animación (evita acumulación)
				setTimeout(() => {
					tile.classList.remove("merged");
				}, 200); // debe coincidir con la duración en CSS

			}
			col++;
		}
		row++;
	}
	scoreElement.textContent = score;
}


	//20251201
	// Press key -> checkGameOver
	// Comprueba si el juego ha terminado por derrota
	function checkGameOver() 
	{
		const board = getBoardState();
		let row = 0;
		while (row < 4) 
		{
			let col = 0;
			while (col < 4) 
			{
				const current = board[row][col];

				if (current === 0) 
					return;

				if (col > 0 && current === board[row][col - 1]) 
					return;

				if (col < 3 && current === board[row][col + 1]) 
					return;

				if (row > 0 && current === board[row - 1][col]) 
					return;

				if (row < 3 && current === board[row + 1][col]) 
					return;
				col++;
			}
			row++;
		}
		alert("💀Derrota");
		lastBoard = null;
		score = 0;
	}

	//20251202
	// Press key -> checkWin
	// Comprueba si el jugador ha ganado alcanzando 2048
	function checkWin() 
	{
		let row = 0;
		while (row < 4) 
		{
			let col = 0;
			while (col < 4) 
			{
				if (getBoardState()[row][col] === 2048) 
				{
					alert("🏆Victoria!");
					lastBoard = null;
					score = 0;
					return;
				}
				col++;
			}
			row++;
		}
	}



	//20251202
	// Press key
	// Maneja las pulsaciones de teclas para mover las celdas
	document.addEventListener("keydown", (event) => 
	{
		if (event.key === "ArrowUp" || event.key === "w") 
		{
			console.log("⬆️ Arriba");
			const board = getBoardState();
			lastBoard = JSON.parse(JSON.stringify(board));
			lastScore = score;
			const newBoard = [[], [], [], []];
			let col = 0;
			while (col < 4) 
			{
				const column = [];
				let row = 0;
				while (row < 4) 
				{
					column.push(board[row][col]);
					row++;
				}
				const mergedColumn = moveUpWithMerge(column);
				row = 0;
				while (row < 4) 
				{
					newBoard[row][col] = mergedColumn[row];
					row++;
				}
				col++;
			}
			if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) 
			{
				resetNumbers();
				updateBoard(newBoard);
				insertRandomTile();
				checkWin();
				checkGameOver();
			}
		}
		else if (event.key === "ArrowLeft" || event.key === "a") 
		{
			console.log("⬅️ Izquierda");
			const board = getBoardState();
			lastBoard = JSON.parse(JSON.stringify(board));
			lastScore = score;
			const newBoard = [];
			let i = 0;
			while (i < board.length) 
			{
				newBoard.push(moveLeftWithMerge(board[i]));
				i++;
			}
			if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) 
			{
				resetNumbers();
				updateBoard(newBoard);
				insertRandomTile();
				checkWin();
				checkGameOver();
			}
		}
		else if (event.key === "ArrowRight" || event.key === "d") 
		{
			console.log("➡️ Derecha");
			const board = getBoardState();
			lastBoard = JSON.parse(JSON.stringify(board));
			lastScore = score;
			const newBoard = [];
			let i = 0;
			while (i < board.length) 
			{
				newBoard.push(moveRightWithMerge(board[i]));
				i++;
			}
			if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) 
			{
				resetNumbers();
				updateBoard(newBoard);
				insertRandomTile();
				checkWin();
				checkGameOver();
			}
		}
		else if (event.key === "ArrowDown" || event.key === "s") 
		{
			console.log("⬇️ Abajo");
			const board = getBoardState();
			lastBoard = JSON.parse(JSON.stringify(board));
			lastScore = score;
			const newBoard = [[], [], [], []];
			let col = 0;
			while (col < 4) 
			{
				const column = [];
				let row = 0;
				while (row < 4) 
				{
					column.push(board[row][col]);
					row++;
				}
				const mergedColumn = moveDownWithMerge(column);
				row = 0;
				while (row < 4) 
				{
					newBoard[row][col] = mergedColumn[row];
					row++;
				}
				col++;
			}
			if (JSON.stringify(lastBoard) !== JSON.stringify(newBoard)) 
			{
				resetNumbers();
				updateBoard(newBoard);
				insertRandomTile();
				checkWin();
				checkGameOver();
			}
		}
		else
		{
			console.log("Otra tecla:", event.key);
		}
	});


	//20251201
	// Click en botón "Restart"
	restartButton.addEventListener("click", () => 
	{
		initGame();
		lastBoard = null;
		score = 0;
	});

	//20251202
	// Click en botón "Back"
	let lastBoard = null;
	let lastScore = 0;
	backButton.addEventListener("click", () => 
	{
		if (lastBoard) 
		{
			resetNumbers();
			updateBoard(lastBoard);
			score = lastScore;
			scoreElement.textContent = score;
		}
	});


	//20251201
	// Primera carga del juego
	initGame();
