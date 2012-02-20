// Portions of this code are from the book JavaScript: Making Isometric Social
// Real-Time Games with HTML5, CSS3 and Javascript (ISBN #978-1-4493-0475-1).
// Copyright 2011 by Mario Andres Pagella.
window.onload = function () {
    var tileMap = [];
    this.tileTypeArray = new Array(10);
    this.tileIndex = new Array(10);
    this.tileCenterPos = new Array(10);

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

    var canvas = document.getElementById('myCanvas');
	var lineCanvas = document.getElementById('lineCanvas');
	var engine = document.getElementById('engine');
	var c = canvas.getContext('2d');
	var lc = lineCanvas.getContext('2d');
	
	//Create a BeamEngine object
	var beamEngine = new BeamEngine(engine,tileTypeArray);
	
    //Temp loading in image for toolbox placeholder
    //Mirrors
    this.mirror45 = new Image();
    this.mirror45.src = "image/mirror45.png";
    this.mirror90 = new Image();
    this.mirror90.src = "image/mirror90.png";
    this.mirror135 = new Image();
    this.mirror135.src = "image/mirror135.png";
    this.mirror180 = new Image();
    this.mirror180.src = "image/mirror180.png";
    this.mirror225 = new Image();
    this.mirror225.src = "image/mirror225.png";
    this.mirror270 = new Image();
    this.mirror270.src = "image/mirror270.png";
    this.mirror315 = new Image();
    this.mirror315.src = "image/mirror315.png";
    this.mirror360 = new Image();
    this.mirror360.src = "image/mirror360.png";

    var mirrorList = [];
    mirrorList[0] = this.mirror45;
    mirrorList[1] = this.mirror90;
    mirrorList[2] = this.mirror135;
    mirrorList[3] = this.mirror180;
    mirrorList[4] = this.mirror225;
    mirrorList[5] = this.mirror270;
    mirrorList[6] = this.mirror315;
    mirrorList[7] = this.mirror360;

    var curIndex = 0;

    this.selectedTool = new Image();
    this.selectedTool.src = "image/select.png";
    this.boulder = new Image();
    this.boulder.src = "image/boulder.png";

    this.start = new Image();
    this.start.src = "image/start.png";
    this.end = new Image();
    this.end.src = "image/end_top.png";
	
	var startPos = new Point(0, 5);
	var endPos = new Point(9, 0);

    //For determining which tile was selected from the toolbox
    tileType = null;

    setupTileArrays();
    lineCanvas.addEventListener('click', handleClick, false);
    drawGrid();

    function handleClick(e) {
        //When a click is detected, translate the mouse coordinates to pixel coordinates
        var row = Math.floor((e.clientX) / tile.width);
        var column = Math.floor((e.clientY) / tile.height);
        var tilePositionX = tile.width * row;
        var tilePositionY = tile.height * column;
		
		c.strokeStyle = "#000000";
		c.lineWidth = 1;
			
        if(column < 10 && row < 10) {
            if (tileMap[row] == null) {
                tileMap[row] = [];
            }
            tileMap[row][column] = 0;

            if(tileType != null && tileTypeArray[row][column] != 'start' && tileTypeArray[row][column] != 'end') {
                switch(Math.floor(tileType)) {
                    case 0:
                        c.clearRect(tilePositionX, tilePositionY, tile.width, tile.height);

                        if(curIndex == 7 || tileTypeArray[row][column] == -1) {
                            curIndex = 0;
                            c.drawImage(mirrorList[curIndex], tilePositionX, tilePositionY, mirrorList[curIndex].width, mirrorList[curIndex].height);
                            tileTypeArray[row][column] = tileType + .0;
                            tileIndex[row][column] = curIndex;
                        }
                        else {
                            curIndex = tileIndex[row][column]+1;
                            c.drawImage(mirrorList[curIndex], tilePositionX, tilePositionY, mirrorList[curIndex].width, mirrorList[curIndex].height);
                            tileTypeArray[row][column] = tileType + curIndex/10;
                            tileIndex[row][column] = curIndex;
                        }

                        c.strokeRect(tilePositionX, tilePositionY, tile.width, tile.height);
                        break;
                    case 1:
                         c.clearRect(tilePositionX, tilePositionY, tile.width, tile.height);
                         c.drawImage(boulder, tilePositionX, tilePositionY, boulder.width, boulder.height);
                         c.strokeRect(tilePositionX, tilePositionY, tile.width, tile.height);
						 tileTypeArray[row][column] = tileType;
                         break;
                }
				
				beamEngine.update(tileTypeArray);
				lineCanvas.width = lineCanvas.width;
				beamEngine.drawBeam(lc, startPos, endPos, tileCenterPos);
            }
        }
        else if(column == 10 && row < 10) {
            tileType = row;
            c.clearRect(0, grid.height * tile.height, grid.width * tile.width, tile.height);
            drawToolBox();
            c.drawImage(selectedTool, tilePositionX, tilePositionY, selectedTool.width, selectedTool.height);
        }
		/*console.clear(); 
        for(var i = 0; i < 10; i++) {
            console.log(tileTypeArray[i])
        }*/
    }

    function drawGrid() {
        c.fillStyle = '#FFFFFF';
        c.fillRect (0, 0, canvas.width, canvas.height);

        var startRow = 0;
        var startCol = 0;
        var rowCount = startRow + Math.floor(canvas.width / tile.width) + 1;
        var colCount = startCol + Math.floor(canvas.height / tile.height) + 1;

        rowCount = ((startRow + rowCount) > grid.width) ? grid.width : rowCount;
        colCount = ((startCol + colCount) > grid.height) ? grid.height : colCount;
		
        for (var row = startRow; row < rowCount; row++) {
            for (var col = startCol; col < colCount; col++) {
                var tilePositionX = tile.width * row;
                var tilePositionY = tile.height * col;

                //Else just draw the strokes for each rectangle tile
                c.strokeRect(tilePositionX, tilePositionY, tile.width, tile.height);
            }
        }
		
		setTimeout(drawToolBox, 1);
    }

    function drawToolBox() {	
        c.fillStyle = "rgba(00, 55, 99, 0.2)";
        c.fillRect (0, grid.height * tile.height, grid.width * tile.width, tile.height);
        c.strokeRect(0, grid.height * tile.height, grid.width * tile.width, tile.height);
		
        //Draw the Mirror Tile in the tool box
        c.drawImage(this.mirror45, 0, grid.height * tile.height, this.mirror45.width, this.mirror45.height);
        //Draw the boulder in the tool box
        c.drawImage(this.boulder, this.boulder.width, grid.height * tile.height, this.boulder.width, this.boulder.height);

        //c.fillStyle = '#FFFFFF';
		c.drawImage(start, startPos.x, tile.height*startPos.y, this.start.width, this.start.height);
        this.tileTypeArray[startPos.x][startPos.y] = 'start';
        c.drawImage(end, tile.width*endPos.x, endPos.y, this.end.width, this.end.height);
        this.tileTypeArray[endPos.x][endPos.y] = 'end';
    }

    // Populates the 2d array with all falses because every space is empty at the start (for now)
    function setupTileArrays() {
        for (var row = 0; row < 10; row++) {
            for (var col = 0; col < 10; col++) {
                var tilePosX = tile.width * row;
                var tilePosY = tile.height * col;

                if(this.tileTypeArray[row] == null)
                    this.tileTypeArray[row] = new Array(10);

                if(this.tileIndex[row] == null)
                    this.tileIndex[row] = new Array(10);

                if(this.tileCenterPos[row] == null)
                    this.tileCenterPos[row] = new Array(10);

                this.tileTypeArray[row][col] = 999;
                this.tileIndex[row][col] = -1;
                this.tileCenterPos[row][col] = new Point(tilePosX + (tile.width/2), tilePosY + (tile.height/2));
            }
        }
    }
}
