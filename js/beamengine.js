

function BeamEngine(engine, tileTypeArr)
{
	console.log("constructor");
	this.gameContainer = engine;
	grid = tileTypeArr;
}

BeamEngine.prototype.update = function(tileTypeArr)
{
	console.log("update");
	grid = tileTypeArr;
}

function nothing(row, col, hor_v, ver_v) {
    var row2 = row + ver_v;
    var col2 = col + hor_v;
    return [row2, col2, hor_v, ver_v];
}

function ninety_degree_mirror(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}

BeamEngine.prototype.drawBeam = function() {
	//console.log("Mainloop");	
    var row, col;
    row = 5, col = 5;
    var hor_v = -1;
    var ver_v = 0;

    var lookup = {
        0: nothing,
        1: ninety_degree_mirror,
        /*
        1: block,
        2: forty_five_degree_mirror,
        3: ninety_degree_mirror,
        4: one_thirty_five_degree_mirror,
        5: one_eighty_degree_mirror,
        6: two_twenty_five_degree_mirror,
        7: two_seventy_degree_mirror,
        8: three_fifteen_degree_mirror,
        9: three_sixty_degree_mirror,
        etc...*/
    }
	

    /*grid = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]*/

    for ( var i = 0; i < 40; i++ ) {
	
        var callback = lookup[grid[row][col]];		
        var results = callback(row, col, hor_v, ver_v);
		console.log("drawBeam");
        row = results[0], col = results[1];
        hor_v = results[2], ver_v = results[3];
		console.log(results);
    }
	
	if(results == 1)
	{
		console.log("mirror found");
	}
}
// run it
//console.log("loop call");
this.grid;
//main_loop();
