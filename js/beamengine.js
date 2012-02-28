this.grid;
this.levelComplete = false;
this.dir = Math.floor((Math.random() * 4));
this.hor_v = 0;
this.ver_v = 0;

function BeamEngine(engine, tileTypeArr)
{
	//console.log("constructor");
	this.gameContainer = engine;
	grid = tileTypeArr;
}

BeamEngine.prototype.update = function(tileTypeArr)
{
	//console.log("update");
	grid = tileTypeArr;
}

function startingPiece(col, row, hor_v, ver_v) {
	if(this.dir == 0) {
		this.ver_v = 0;
		this.hor_v = 1;
	}
	else if(this.dir == 1) {
		this.ver_v = 1;
		this.hor_v = 0;
	}
	else if(this.dir == 2) {
		this.ver_v = 0;
		this.hor_v = -1;
	}
	else if(this.dir == 3) {
		this.ver_v = -1;
		this.hor_v = 0;
	}

	var col2 = col + this.ver_v;
	var row2 = row + this.hor_v;
		
    return [col2, row2, this.hor_v, this.ver_v];
}

function nothing(col, row, hor_v, ver_v) {
	var col2 = col + this.ver_v;
	var row2 = row + this.hor_v;
	
	if(col2 < 0 || col2 > 9)
		col2 = col;
	
	if(row2 < 0 || row2 > 9)
		row2 = row;
		
    return [col2, row2, this.hor_v, this.ver_v];
}

function level_complete(cVas, endPos, tileCenters) {
	levelComplete = true;
	console.log("LEVEL COMPLETE")
	cVas.fillStyle = cVas.strokeStyle;
	cVas.beginPath();
	cVas.arc(tileCenters[endPos.x][endPos.y].x, tileCenters[endPos.x][endPos.y].y, 12, 0, Math.PI*2, true);
	cVas.closePath();
	cVas.fill();
	cVas.fillStyle = "#000000";
}

function mirror_45(col, row, hor_v, ver_v) {
	if(this.ver_v > 0) {
		this.hor_v = this.ver_v * -1;
		this.ver_v = 0;
	}
	else if(this.hor_v > 0) {
		this.ver_v = this.hor_v * -1;
		this.hor_v = 0;
	}
	else {
		this.hor_v = 0;
		this.ver_v = 0;
	}
	
    return nothing(col, row, this.hor_v, this.ver_v);
}

function mirror_90(col, row, hor_v, ver_v) {
	this.ver_v = 0;
    this.hor_v = 0;
    return nothing(col, row, this.hor_v, this.ver_v);
}

function mirror_135(col, row, hor_v, ver_v) {
	if(this.ver_v > 0) {
		this.hor_v = this.ver_v * 1;
		this.ver_v = 0;
	}
	else if(this.hor_v < 0) {
		this.ver_v = this.hor_v * 1;
		this.hor_v = 0;
	}
	else {
		this.ver_v = 0;
		this.hor_v = 0;
	}
    return nothing(col, row, this.hor_v, this.ver_v);
}

function mirror_180(col, row, hor_v, ver_v) {
    this.ver_v = 0;
    this.hor_v = 0;
    return nothing(col, row, this.hor_v, this.ver_v);
}

function mirror_225(col, row, hor_v, ver_v) {
    if(this.ver_v < 0) {
		this.hor_v = this.ver_v * -1;
		this.ver_v = 0;
	}
	else if(this.hor_v < 0) {
		this.ver_v = this.hor_v * -1;
		this.hor_v = 0;
	}
	else {
		this.ver_v = 0;
		this.hor_v = 0;
	}
    return nothing(col, row, this.hor_v, this.ver_v);
}

function mirror_270(col, row, hor_v, ver_v) {
    this.ver_v = 0;
    this.hor_v = 0;
    return nothing(col, row, this.hor_v, this.ver_v);
}

function mirror_315(col, row, hor_v, ver_v) {
    if(this.ver_v < 0) {
		this.hor_v = this.ver_v * 1;
		this.ver_v = 0;
	}
	else if(this.hor_v > 0) {
		this.ver_v = this.hor_v * 1;
		this.hor_v = 0;
	}
	else {
		this.ver_v = 0;
		this.hor_v = 0;
	}
    return nothing(col, row, this.hor_v, this.ver_v);
}

function mirror_360(col, row, hor_v, ver_v) {
    this.ver_v = 0;
    this.hor_v = 0;
    return nothing(col, row, this.hor_v, this.ver_v);
}

function block(col, row, hor_v, ver_v) {
    this.ver_v = 0;
    this.hor_v = 0;
    return nothing(col, row, this.hor_v, this.ver_v);
}

function red_filter(col, row, hor_v, ver_v, cVas, tileCenters) {
	cVas.beginPath();
    cVas.moveTo(tileCenters[col][row].x, tileCenters[col][row].y);
	cVas.strokeStyle = "#FF0000";
	cVas.closePath();
    return nothing(col, row, this.hor_v, this.ver_v);
}

function green_filter(col, row, hor_v, ver_v, cVas, tileCenters) {
	cVas.beginPath();
    cVas.moveTo(tileCenters[col][row].x, tileCenters[col][row].y);
	cVas.strokeStyle = "#00FF00";
	cVas.closePath();
    return nothing(col, row, this.hor_v, this.ver_v);
}

function blue_filter(col, row, hor_v, ver_v, cVas, tileCenters) {
	cVas.beginPath();
    cVas.moveTo(tileCenters[col][row].x, tileCenters[col][row].y);
    cVas.strokeStyle = "#0000FF";
	cVas.closePath();
	return nothing(col, row, this.hor_v, this.ver_v);
}

BeamEngine.prototype.drawBeam = function(cVas, startPos, endPos, tileCenters) {
    var col, row;
    row = startPos.x;
	col = startPos.y;

    var lookup = {
		'start': startingPiece,
		'end': level_complete,
        999: nothing,
        0: mirror_45,
        0.1: mirror_90,
        0.2: mirror_135,
        0.3: mirror_180,
        0.4: mirror_225,
        0.5: mirror_270,
        0.6: mirror_315,
        0.7: mirror_360,
		1: red_filter,
		2: green_filter,
        3: blue_filter,
    }

	// OKAY: tileCenters is the array that holds all the center points for the tiles.
	// 		 you need to get the start tiles center pos and grab the 'x' value for the move to.
	
	cVas.beginPath();
	cVas.lineWidth = 4;
	cVas.strokeStyle = "#FF0000";
	cVas.moveTo(tileCenters[startPos.x][startPos.y].x, tileCenters[startPos.x][startPos.y].y);
	this.levelComplete = false;
	
	for(var i = 0; i < 110; i++) {		
		if(grid[row][col] != 'end') {
			var callback = lookup[grid[row][col]];
			var results = callback(row, col, this.hor_v, this.ver_v, cVas, tileCenters);
			row = results[0];
			col = results[1];
			this.hor_v = results[2];
			this.ver_v = results[3];
			cVas.lineTo(tileCenters[row][col].x, tileCenters[row][col].y);
			cVas.stroke();
			//console.log(results);
		}
		else{
			level_complete(cVas, endPos, tileCenters);
			break;
		}
	}
	
	cVas.closePath();
}
// run it
//console.log("loop call");
//main_loop();
