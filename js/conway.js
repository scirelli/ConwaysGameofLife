var conway = conway || {};
/*
 * 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * 2. Any live cell with two or three live neighbours lives on to the next generation.
 * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
 * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
(function(conway){
    'use strict';
    conway.Game = function(){
        this.board = null;
    };

    conway.Game.prototype = {
        init:function(width, height) {
            this.conwayBoard = new conway.BufferedBoard(width, height);
            return this;
        },
        seed:function() {
            this.conwayBoard.setBoard(conway.Patterns.Blinker().getBoard(), this.conwayBoard.xytopos(0, 1));
            return this;
        },
        tick:function() {
            this.conwayBoard.swap();
            var board = this.conwayBoard,
                processBoard = this.conwayBoard.getBoard(),
                drawBoard = this.conwayBoard.getDrawBoard(),
                liveCount = 0,
                value = 0,
                width = this.conwayBoard.getWidth(),
                height = this.conwayBoard.getHeight(),
                xytopos = this.conwayBoard.xytopos;
            
            for(var y=0; y<height; y++){
                for(var x=0; y<width; x++){
                    liveCount += board.getValue(x-1, y-1);
                    liveCount += board.getValue(x, y-1);
                    liveCount += board.getValue(x+1, y-1);
                    
                    liveCount += board.getValue(x-1, y);
                    liveCount += board.getValue(x, y);
                    liveCount += board.getValue(x+1, y);
                    
                    liveCount += board.getValue(x-1, y+1);
                    liveCount += board.getValue(x, y+1);
                    liveCount += board.getValue(x+1, y+1);
                }
            }

            return this;
        },
        toString:function() {
            return this.conwayBoard.toString(); 
        },
        print:function() {
            console.log(this.toString()); 
            return this;
        }
    };
})(conway);
/*
function move() {
    // copy world data
    world_data[1].set(world_data[0]);

    var ct = 0, v;
    for(var x=0; x<cells_x; ++x){
        for(var y=0; y<cells_y; ++y){
            // How many neighbor cells are alive?
            ct = 0;
            ct += get_cell_value(1, x-1, y-1);
            ct += get_cell_value(1, x,   y-1);
            ct += get_cell_value(1, x+1, y-1);
            ct += get_cell_value(1, x-1, y);
            ct += get_cell_value(1, x+1, y);
            ct += get_cell_value(1, x-1, y+1);
            ct += get_cell_value(1, x,   y+1);
            ct += get_cell_value(1, x+1, y+1);

            // cell value		
            v = get_cell_value(1, x, y);           

            if(v==1){
                if (ct<2 || ct>3) {
                    // death by underpopulation
                    set_cell_value(x, y, 0);
                } else {
                    // Live to see another day
                    set_cell_value(x, y, 1);
                } 
            }else if(v==0){
                if (ct==3) {
                    // Give birth to a new cell
                    set_cell_value(x, y, 1);
                } else {
                    // remain dead
                    set_cell_value(x, y, 0);
                }
            }
        } // for y ...
    } // for x ...
}
*/
