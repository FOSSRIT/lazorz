function nothing(row, col, hor_v, ver_v) {
    var row2 = row + ver_v;
    var col2 = col + hor_v;
    return [row2, col2, hor_v, ver_v];
}

function ninety_degree_mirror(row, col, hor_v, ver_v) {
    hor_v = hor_v * -1;
    return nothing(row, col, hor_v, ver_v);
}


function main_loop() {
    var row, col;
    row = 5, col = 5;
    var hor_v = -1;
    var ver_v = 0;

    var lookup = {
        0: nothing,
        1: ninety_degree_mirror,
        // etc...
    }

    grid = [
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
    ]

    for ( var i = 0; i < 40; i++ ) {
        var callback = lookup[grid[row][col]];
        var results = callback(row, col, hor_v, ver_v);
        row = results[0], col = results[1];
        hor_v = results[2], ver_v = results[3];
        print(" row and col is " + row + " and " + col ); 
    }
}
// run it
main_loop();
