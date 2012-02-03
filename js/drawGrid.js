window.onload = function () {
	var tileMap = [];
	
	// 50px square tiles
	var tile = {
		width: 48,
		height: 48
	}
	
	// 10x10 of 50px tiles
	var grid = {
		width: 10,
		height: 10
	}

	var Keys = {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39
	}

	var scroll = {
		x: 0,
		y: 0
	}

	var canvas = document.getElementById('myCanvas');
	var c = canvas.getContext('2d');
	
	//Temp loading in image for toolbox placeholder
	this.tb1 = new Image();
	this.tb1.src = "image/orange.png";
	
	canvas.addEventListener('click', handleClick, false);

	drawGrid();
	

	function handleClick(e) {
		// When a click is detected, translate the mouse coordinates to pixel coordinates
		var row = Math.floor((e.clientX + scroll.x) / tile.width);
		var column = Math.floor((e.clientY + scroll.y) / tile.height);

		if (tileMap[row] == null) {
			tileMap[row] = [];
		}
		tileMap[row][column] = 1;
	}

	function drawGrid() {
		c.fillStyle = '#FFFFFF';
		c.fillRect (0, 0, canvas.width, canvas.height);		

		var startRow = Math.floor(scroll.x / tile.width);
		var startCol = Math.floor(scroll.y / tile.height);
		var rowCount = startRow + Math.floor(canvas.width / tile.width) + 1;
		var colCount = startCol + Math.floor(canvas.height / tile.height) + 1;

		rowCount = ((startRow + rowCount) > grid.width) ? grid.width : rowCount;
		colCount = ((startCol + colCount) > grid.height) ? grid.height : colCount;

		for (var row = startRow; row < rowCount; row++) {
			for (var col = startCol; col < colCount; col++) {
				var tilePositionX = tile.width * row;
				var tilePositionY = tile.height * col;

				tilePositionX -= scroll.x;
				tilePositionY -= scroll.y;
				
				if (tileMap[row] != null && tileMap[row][col] != null) {
				
					//We're drawing the image on click, instead of changing the fill on the squares
					
					//c.fillStyle = '#CC0000';
					//c.fillRect(tilePositionX, tilePositionY, tile.width, tile.height);
					//c.fillStyle = '#000000';
					//c.strokeRect(tilePositionX, tilePositionY, tile.width, tile.height);
					c.drawImage(this.tb1, tilePositionX, tilePositionY, this.tb1.width, this.tb1.height);
					
				} else {
					c.strokeRect(tilePositionX, tilePositionY, tile.width, tile.height);
				}
			}
		}	
		drawToolBox(); //Add the toolbox to the bottom of the grid
		
		setTimeout(drawGrid, 1);
	}
	
	function drawToolBox() {
		c.fillStyle = '#FFFFFF';
		c.fillRect (0, grid.height * tile.height, grid.width * tile.width, tile.height);
		c.strokeRect(0, grid.height * tile.height, grid.width * tile.width, tile.height);
	}
}
