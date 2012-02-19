

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

function nothing(row, col, hor_v, ver_v) {
    var row2 = row + ver_v;
    var col2 = col + hor_v;
    return [row2, col2, hor_v, ver_v];
}

function mirror_45(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}
function mirror_90(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}
function mirror_135(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}
function mirror_180(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}
function mirror_225(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}
function mirror_270(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}
function mirror_315(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}
function mirror_360(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}

BeamEngine.prototype.drawBeam = function(cVas, startPos, tileCenters) {
    var row, col;
    row = startPos.x, col = startPos.y;
    var hor_v = 1;
    var ver_v = 0;

    var lookup = {
        999: nothing,
        0: mirror_45,
        0.1: mirror_90,
        0.2: mirror_135,
        0.3: mirror_180,
        0.4: mirror_225,
        0.5: mirror_270,
        0.6: mirror_315,
        0.7: mirror_360,
        /*
        1: block,
        etc...*/
    }

    for ( var i = 0; i < 40; i++ ) {
	
        var callback = lookup[grid[row][col]];		
        var results = nothing(row, col, hor_v, ver_v);
        row = results[0], col = results[1];
        hor_v = results[2], ver_v = results[3];
		//console.log(results);
    }
	
	// OKAY: tileCenters is the array that holds all the center points for the tiles.
	// 		 you need to get the start tiles center pos and grab the 'x' value for the move to.
	cVas.clearRect(0, 0, 480, 528);
	cVas.lineWidth = 4;
	cVas.strokeStyle = "#FF0000";
	cVas.moveTo(tileCenters[startPos.x][startPos.y].x, tileCenters[startPos.x][startPos.y].y);
	cVas.lineTo(tileCenters[9][9].x - 3, tileCenters[9][9].y);
	cVas.stroke();
}
// run it
//console.log("loop call");
this.grid;
//main_loop();
