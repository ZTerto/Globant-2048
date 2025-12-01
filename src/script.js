	const tiles = document.querySelectorAll(".tile");
	const scoreElement = document.getElementById("score");
	const restartButton = document.getElementById("restart-btn");

	//20251201
	// initGame -> updateScore -> insertRandomTile
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
	function updateScore(value) 
	{
		scoreElement.textContent = value;
		insertRandomTile();
		insertRandomTile();
	}

	//20251201
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
	// Crea una matriz con los valores actuales del tablero
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
	// Actualiza el DOM con los nuevos valores de la matriz
	function updateBoard(board) 
	{
		let row = 0;
		while (row < 4) 
		{
			let col = 0;
			while (col < 4) 
			{
				const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
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
				}
				col++;
			}
			row++;
		}
	}


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

				// 🟢 Aún hay una casilla vacía
				if (current === 0) return;

				// ⬅️ Casilla izquierda
				if (col > 0 && current === board[row][col - 1]) return;

				// ➡️ Casilla derecha
				if (col < 3 && current === board[row][col + 1]) return;

				// ⬆️ Casilla arriba
				if (row > 0 && current === board[row - 1][col]) return;

				// ⬇️ Casilla abajo
				if (row < 3 && current === board[row + 1][col]) return;

				if (current === 2048)
				{
					alert("Victoria!");
					initGame();
				}
				col++;
			}
			row++;
		}
		alert("💀 Derrota");
		initGame();
	}


	//20251201
	// Evento para teclas: W A S D / Flechas
	document.addEventListener("keydown", (event) => 
	{
		if (event.key === "ArrowUp" || event.key === "w") 
		{
			console.log("⬆️ Arriba");
			const board = getBoardState();
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
			resetNumbers();
			updateBoard(newBoard);
			checkGameOver();
			insertRandomTile();
		}
		else if (event.key === "ArrowLeft" || event.key === "a") 
		{
			console.log("⬅️ Izquierda");
			const board = getBoardState();
			const newBoard = [];
			let i = 0;
			while (i < board.length) 
			{
				newBoard.push(moveLeftWithMerge(board[i]));
				i++;
			}
			resetNumbers();
			updateBoard(newBoard);
			checkGameOver();
			insertRandomTile();
		}
		else if (event.key === "ArrowRight" || event.key === "d") 
		{
			console.log("➡️ Derecha");
			const board = getBoardState();
			const newBoard = [];
			let i = 0;
			while (i < board.length) 
			{
				newBoard.push(moveRightWithMerge(board[i]));
				i++;
			}
			resetNumbers();
			updateBoard(newBoard);
			checkGameOver();
			insertRandomTile();
		}
		else if (event.key === "ArrowDown" || event.key === "s") 
		{
			console.log("⬇️ Abajo");
			const board = getBoardState();
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
			resetNumbers();
			updateBoard(newBoard);
			checkGameOver();
			insertRandomTile();
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
	});

	//20251201
	// Primera carga del juego
	initGame();
