// Portions of this code are from the book JavaScript: Making Isometric Social
// Real-Time Games with HTML5, CSS3 and Javascript (ISBN #978-1-4493-0475-1).
// Copyright 2011 by Mario Andres Pagella.
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

    var canvas = document.getElementById('myCanvas');
    var c = canvas.getContext('2d');
    
    //Temp loading in image for toolbox placeholder
    this.tb1 = new Image();
    this.tb2 = new Image();
    this.tb1.src = "image/mirror45.png";
    this.tb2.src = "image/orange.png";

    //For determining which tile was selected from the toolbox
    tileType = null;
    
    canvas.addEventListener('click', handleClick, false);

    drawGrid();

    function handleClick(e) {
        //When a click is detected, translate the mouse coordinates to pixel coordinates
        var row = Math.floor((e.clientX) / tile.width);
        var column = Math.floor((e.clientY) / tile.height);
        
        if(column < 10) {
            if (tileMap[row] == null) {
                tileMap[row] = [];
            }
            tileMap[row][column] = 1;
            
            if(tileType != null) {
                var tilePositionX = tile.width * row;
                var tilePositionY = tile.height * column;
                
                switch(tileType) {
                    case 0:
                        c.drawImage(tb1, tilePositionX, tilePositionY, tb1.width, tb1.height);
                        break;
                    case 1:
                        c.drawImage(tb2, tilePositionX, tilePositionY, tb2.width, tb2.height);
                        break;
                }
            }
        }
        else {
            tileType = row;
        }
    }

    function drawGrid() {
        c.fillStyle = '#FFFFFF';
        c.fillRect (0, 0, canvas.width, canvas.height);

        drawToolBox(); //Add the toolbox to the bottom of the grid

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
        c.fillStyle = '#FFFFFF';
        c.fillRect (0, grid.height * tile.height, grid.width * tile.width, tile.height);
        c.strokeRect(0, grid.height * tile.height, grid.width * tile.width, tile.height);
        
        //Draw the Mirror Tile in the tool box
        c.drawImage(this.tb1, 0, grid.height * tile.height, this.tb1.width, this.tb1.height);
        //Draw the Orange Box (for now) in the tool box
        c.drawImage(this.tb2, this.tb1.width, grid.height * tile.height, this.tb2.width, this.tb2.height);
    }
}
