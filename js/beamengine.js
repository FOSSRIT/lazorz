this.grid;
this.levelComplete = false;

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
	var col2 = col + ver_v;
	var row2 = row + hor_v;
		
    return [col2, row2, hor_v, ver_v];
}

function nothing(col, row, hor_v, ver_v) {
	var col2 = col + ver_v;
	var row2 = row + hor_v;
	
	if(col2 < 0 || col2 > 9)
		col2 = col;
	
	if(row2 < 0 || row2 > 9)
		row2 = row;
		
    return [col2, row2, hor_v, ver_v];
}

function level_complete(cVas, endPos, tileCenters) {
	levelComplete = true;
	console.log("LEVEL COMPLETE")
	cVas.fillStyle = "#FF0000";
	cVas.beginPath();
	cVas.arc(tileCenters[endPos.x][endPos.y].x, tileCenters[endPos.x][endPos.y].y, 12, 0, Math.PI*2, true);
	cVas.closePath();
	cVas.fill();
	cVas.fillStyle = "#000000";
}

function mirror_45(col, row, hor_v, ver_v) {
	if(ver_v > 0) {
		hor_v = ver_v * -1;
		ver_v = 0;
	}
	else if(hor_v > 0) {
		ver_v = hor_v * -1;
		hor_v = 0;
	}
	else {
		hor_v = 0;
		ver_v = 0;
	}
	
    return nothing(col, row, hor_v, ver_v);
}

function mirror_90(col, row, hor_v, ver_v) {
	ver_v = 0;
    hor_v = 0;
    return nothing(col, row, hor_v, ver_v);
}

function mirror_135(col, row, hor_v, ver_v) {
	if(ver_v > 0) {
		hor_v = ver_v * 1;
		ver_v = 0;
	}
	else if(hor_v < 0) {
		ver_v = hor_v * 1;
		hor_v = 0;
	}
	else {
		ver_v = 0;
		hor_v = 0;
	}
    return nothing(col, row, hor_v, ver_v);
}

function mirror_180(col, row, hor_v, ver_v) {
    ver_v = 0;
    hor_v = 0;
    return nothing(col, row, hor_v, ver_v);
}

function mirror_225(col, row, hor_v, ver_v) {
    if(ver_v < 0) {
		hor_v = ver_v * -1;
		ver_v = 0;
	}
	else if(hor_v < 0) {
		ver_v = hor_v * -1;
		hor_v = 0;
	}
	else {
		ver_v = 0;
		hor_v = 0;
	}
    return nothing(col, row, hor_v, ver_v);
}

function mirror_270(col, row, hor_v, ver_v) {
    ver_v = 0;
    hor_v = 0;
    return nothing(col, row, hor_v, ver_v);
}

function mirror_315(col, row, hor_v, ver_v) {
    if(ver_v < 0) {
		hor_v = ver_v * 1;
		ver_v = 0;
	}
	else if(hor_v > 0) {
		ver_v = hor_v * 1;
		hor_v = 0;
	}
	else {
		ver_v = 0;
		hor_v = 0;
	}
    return nothing(col, row, hor_v, ver_v);
}

function mirror_360(col, row, hor_v, ver_v) {
    ver_v = 0;
    hor_v = 0;
    return nothing(col, row, hor_v, ver_v);
}

function block(col, row, hor_v, ver_v) {
    ver_v = 0;
    hor_v = 0;
    return nothing(col, row, hor_v, ver_v);
}

BeamEngine.prototype.drawBeam = function(cVas, startPos, endPos, tileCenters) {
    var col, row;
    row = startPos.x;
	col = startPos.y;
    var hor_v = 0;
    var ver_v = 1;

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
        1: block,
    }

	// OKAY: tileCenters is the array that holds all the center points for the tiles.
	// 		 you need to get the start tiles center pos and grab the 'x' value for the move to.
	cVas.lineWidth = 4;
	cVas.strokeStyle = "#FF0000";
	cVas.moveTo(tileCenters[startPos.x][startPos.y].x, tileCenters[startPos.x][startPos.y].y);
	this.levelComplete = false;
	
	for(var i = 0; i < 110; i++) {
		if(grid[row][col] != 'end') {
			var callback = lookup[grid[row][col]];
			var results = callback(row, col, hor_v, ver_v);
			row = results[0];
			col = results[1];
			hor_v = results[2];
			ver_v = results[3];
			cVas.lineTo(tileCenters[row][col].x, tileCenters[row][col].y);
			cVas.stroke();
			//console.log(results);
		}
		else{
			level_complete(cVas, endPos, tileCenters);
			break;
		}
	}
}
// run it
//console.log("loop call");
//main_loop();
