// Portions of this code are from the book JavaScript: Making Isometric Social
// Real-Time Games with HTML5, CSS3 and Javascript (ISBN #978-1-4493-0475-1).
// Copyright 2011 by Mario Andres Pagella.

window.onload = function () {
    // Legend:
    // 100 = Start Tile
    // 101 = End Tile
    // 999 = Blank Space
    // 105 = Boulder
    // 1 = Red Filter
    // 1.1 = Green Filter
    // 1.2 = Blue Filter
    this.map1 = [
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,101],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [100,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999]];

    this.map2 = [
    [999,999,999,999,999,999,999,999,999,999],
    [101,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,100],
    [999,999,999,999,999,999,999,999,999,999]];

    this.map3 = [
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,105,105,105,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,105,999,999,999,999,105,999,999,999],
    [999,999,999,100,999,999,105,999,999,999],
    [999,999,999,999,105,105,999,999,999,999],
    [999,999,999,999,999,999,999,999,999,999],
    [999,101,105,999,999,999,999,999,999,999]];
    
    this.map4 = [
    [999,999,999,999,999,105,105,105,105,105],
    [999,999,999,999,105,999,999,105,105,999],
    [999,105,1.2,105,105,105,999,999,105,105],
    [101,105,999,105,105,999,999,999,999,999],
    [105,105,999,105,105,999,999,1.1,999,999],
    [999,999,999,105,999,999,105,105,105,999],
    [999,999,999,999,999,105,105,105,999,999],
    [999,999,999,999,105,105,999,999,999,999],
    [999,999,105,105,105,999,999,999,999,100],
    [999,999,105,999,999,999,999,999,999,105]];

    var tileMap = [];
    this.mapIndex = 0;
    this.mapTiles = [this.map1, this.map2, this.map3, this.map4];
    
    if(window.location == "http://lazorz-fossrit.rhcloud.com/Lazor-lvl1.html")
        this.tileTypeArray = this.mapTiles[0];
    if(window.location == "http://lazorz-fossrit.rhcloud.com/Lazor-lvl2.html")
        this.tileTypeArray = this.mapTiles[1];
    if(window.location == "http://lazorz-fossrit.rhcloud.com/Lazor-lvl3.html")
        this.tileTypeArray = this.mapTiles[2];
    if(window.location == "http://lazorz-fossrit.rhcloud.com/Lazor-lvl4.html")
        this.tileTypeArray = this.mapTiles[3];
    
    this.tileIndex = new Array(10);
    this.tileCenterPos = new Array(10);
    
    // 48px square tiles
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

    //BackgroundBits
    var background = document.getElementById('backgroundCanvas');
    var canvas = document.getElementById('myCanvas');
    var lineCanvas = document.getElementById('lineCanvas');
    var tileCanvas = document.getElementById('tileCanvas');
    var engine = document.getElementById('engine');
    //BackgroundBits
    var b = background.getContext('2d');
    var c = canvas.getContext('2d');
    var lc = lineCanvas.getContext('2d');
    var tc = tileCanvas.getContext('2d');

    //Create a BeamEngine object
    var beamEngine = new BeamEngine(engine,tileTypeArray);
    //this.tileTypeArray = this.mapTiles[beamEngine.getMapIndex()];

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

    //BackgroundBits
    //Temp Loading in background image
    this.backgroundImage = new Image();
    this.backgroundImage.src = "image/background_space.png";

    var mirrorList = [];
    mirrorList[0] = this.mirror45;
    mirrorList[1] = this.mirror90;
    mirrorList[2] = this.mirror135;
    mirrorList[3] = this.mirror180;
    mirrorList[4] = this.mirror225;
    mirrorList[5] = this.mirror270;
    mirrorList[6] = this.mirror315;
    mirrorList[7] = this.mirror360;

    var mirIndex = 0;

    this.selectedTool = new Image();
    this.selectedTool.src = "image/select.png";
    this.boulder = new Image();
    this.boulder.src = "image/boulder.png";

    this.toolboxFilter = new Image();
    this.toolboxFilter.src = "image/toolbox_filter.png";
    this.redFilter = new Image();
    this.redFilter.src = "image/red_filter.png";
    this.greenFilter = new Image();
    this.greenFilter.src = "image/green_filter.png";
    this.blueFilter = new Image();
    this.blueFilter.src = "image/blue_filter.png";

    var filterList = [];
    filterList[0] = this.redFilter;
    filterList[1] = this.greenFilter;
    filterList[2] = this.blueFilter;

    var filIndex = 0;

    this.deleteTiles = new Image();
    this.deleteTiles.src = "image/delete.png";

    this.start = new Image();
    this.start.src = "image/start.png";
    this.end = new Image();
    this.end.src = "image/end_top.png";

    for(var row = 0; row < 10; row++) {
        for(var col = 0; col < 10; col++) {
            if(this.tileTypeArray[row][col] == 100)
                var startPos = new Point(row, col);

            if(this.tileTypeArray[row][col] == 101)
                var endPos = new Point(row, col);
        }
    }

	//var startPos = new Point(3, 5);
	//var endPos = new Point(9, 0);

    //For determining which tile was selected from the toolbox
    tileType = null;

    setupTileArrays();
    tileCanvas.addEventListener('click', handleClick, false);
    //BackgroundBits
    drawBackground();
    drawGrid();
    
    if(beamEngine.getLevelComplete() == true) {
            if(this.mapIndex == 2)
                this.mapIndex = 0;
            else
                this.mapIndex += 1;
                
            this.tileTypeArray = this.mapTiles[this.mapIndex];
            beamEngine.update(tileTypeArray);
            lineCanvas.width = lineCanvas.width;
            beamEngine.drawBeam(lc, startPos, endPos, tileCenterPos);
    }

    function handleClick(e) {
        //When a click is detected, translate the mouse coordinates to pixel coordinates
        var row = Math.floor((e.clientX) / tile.width);
        var column = Math.floor((e.clientY) / tile.height);
        var tilePositionX = tile.width * row;
        var tilePositionY = tile.height * column;

        c.strokeStyle = "rgba(90, 90, 90, 0.5)";
        c.lineWidth = 1;

        if(column < 10 && row < 10) {
            if (tileMap[row] == null) {
                tileMap[row] = [];
            }
            tileMap[row][column] = 0;

            if(tileType != null && tileTypeArray[row][column] != 100 && tileTypeArray[row][column] != 101 && tileTypeArray[row][column] != 105) {
                switch(Math.floor(tileType)) {
                    case 0:
                        tc.clearRect(tilePositionX, tilePositionY, tile.width, tile.height);

                        if(tileIndex[row][column] == mirrorList.length-1 || tileTypeArray[row][column] == 999) {
                            mirIndex = 0;
                            tc.drawImage(mirrorList[mirIndex], tilePositionX, tilePositionY, mirrorList[mirIndex].width, mirrorList[mirIndex].height);
                            tileTypeArray[row][column] = tileType + .0;
                            tileIndex[row][column] = mirIndex;
                        }
                        else {
                            mirIndex = tileIndex[row][column]+1;
                            tc.drawImage(mirrorList[mirIndex], tilePositionX, tilePositionY, mirrorList[mirIndex].width, mirrorList[mirIndex].height);
                            tileTypeArray[row][column] = tileType + mirIndex/10;
                            tileIndex[row][column] = mirIndex;
                        }

                        break;
                    case 1:
                         tc.clearRect(tilePositionX, tilePositionY, tile.width, tile.height);

                         if(tileIndex[row][column] == filterList.length-1 || tileTypeArray[row][column] == 999) {
                            filIndex = 0;
                            tc.drawImage(filterList[filIndex], tilePositionX, tilePositionY, filterList[filIndex].width, filterList[filIndex].height);
                            tileTypeArray[row][column] = tileType + .0;
                            tileIndex[row][column] = filIndex;
                         }
                         else {
                            filIndex = tileIndex[row][column]+1;
                            tc.drawImage(filterList[filIndex], tilePositionX, tilePositionY, filterList[filIndex].width, filterList[filIndex].height);
                            tileTypeArray[row][column] = tileType + filIndex/10;
                            tileIndex[row][column] = filIndex;
                         }

                         break;
                    case 9:
                        tc.clearRect(tilePositionX, tilePositionY, tile.width, tile.height);
                        tileTypeArray[row][column] = 999;
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
    }

    //BackgroundBits
    function drawBackground() {
        b.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);
    }

    function drawGrid() {
        c.strokeStyle = "rgba(90, 90, 90, 0.5)";
        //c.fillRect (0, 0, canvas.width, canvas.height);

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
                //This is where you set the color of the grid line strokes
                //For example:
                //c.strokeStyle = '#FFFFFF';
                c.strokeRect(tilePositionX, tilePositionY, tile.width, tile.height);
            }
        }

        setTimeout(drawToolBox, 1);
    }

    function drawToolBox() {
        c.fillStyle = "rgba(00, 55, 99, 0.2)";
        c.fillRect (0, grid.height * tile.height, grid.width * tile.width, tile.height);
        c.strokeRect(0, grid.height * tile.height, grid.width * tile.width, tile.height);
        //
        //Draw the Mirror Tile in the tool box
        c.drawImage(this.mirror45, 0, grid.height * tile.height, this.mirror45.width, this.mirror45.height);
        //Draw the boulder in the tool box
        //c.drawImage(this.boulder, this.boulder.width, grid.height * tile.height, this.boulder.width, this.boulder.height);

        //Draw filter in the toolbox
        c.drawImage(this.toolboxFilter, toolboxFilter.width, grid.height * tile.height, toolboxFilter.width, toolboxFilter.height);

        //Draw delete symbol
        c.drawImage(this.deleteTiles, this.deleteTiles.width*9, grid.height * tile.height, this.deleteTiles.width, this.deleteTiles.height);

        for (var row = 0; row < 10; row++) {
            for (var col = 0; col < 10; col++) {
                var tilePositionX = tile.width * row;
                var tilePositionY = tile.height * col;

                if(this.tileTypeArray[row][col] == 100)
                    tc.drawImage(start, tilePositionX, tilePositionY, this.start.width, this.start.height);
                if(this.tileTypeArray[row][col] == 101)
                {
                    c.drawImage(end, tilePositionX, tilePositionY, this.end.width, this.end.height);
                    
                    if(window.location == "http://lazorz-fossrit.rhcloud.com/Lazor-lvl4.html") {
                        tc.fillStyle = "rgba(00, 174, 00, 1)";
                        tc.beginPath();
                        tc.arc(tileCenterPos[row][col].x, tileCenterPos[row][col].y, 12, 0, Math.PI*2, true);
                        tc.closePath();
                        tc.fill();
                    }
                }
                if(this.tileTypeArray[row][col] == 105)
                    tc.drawImage(boulder, tilePositionX, tilePositionY, this.boulder.width, this.boulder.height);
                if(this.tileTypeArray[row][col] == 1)
                    tc.drawImage(redFilter, tilePositionX, tilePositionY, this.redFilter.width, this.redFilter.height);
                if(this.tileTypeArray[row][col] == 1.1)
                    tc.drawImage(greenFilter, tilePositionX, tilePositionY, this.greenFilter.width, this.greenFilter.height);
                if(this.tileTypeArray[row][col] == 1.2)
                    tc.drawImage(blueFilter, tilePositionX, tilePositionY, this.blueFilter.width, this.blueFilter.height);
            }
        }
        //
        //c.fillStyle = '#FFFFFF';
        //tc.drawImage(start, tile.height*startPos.x, tile.height*startPos.y, this.start.width, this.start.height);

        this.tileTypeArray[startPos.x][startPos.y] = 100;
        //c.drawImage(end, tile.width*endPos.x, tile.height*endPos.y, this.end.width, this.end.height);
        this.tileTypeArray[endPos.x][endPos.y] = 101;

        beamEngine.update(tileTypeArray);
        lineCanvas.width = lineCanvas.width;
        beamEngine.drawBeam(lc, startPos, endPos, tileCenterPos);
    }

    // Populates the 2d array with all falses because every space is empty at the start (for now)
    function setupTileArrays() {
        for (var row = 0; row < 10; row++) {
            for (var col = 0; col < 10; col++) {
                var tilePosX = tile.width * row;
                var tilePosY = tile.height * col;

                //if(this.tileTypeArray[row] == null)
                    //this.tileTypeArray[row] = new Array(10);

                if(this.tileIndex[row] == null)
                    this.tileIndex[row] = new Array(10);

                if(this.tileCenterPos[row] == null)
                    this.tileCenterPos[row] = new Array(10);

                //this.tileTypeArray[row][col] = 999;
                this.tileIndex[row][col] = -1;
                this.tileCenterPos[row][col] = new Point(tilePosX + (tile.width/2), tilePosY + (tile.height/2));
            }
        }
    }
}
