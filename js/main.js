var conway = {};
/*
 * 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * 2. Any live cell with two or three live neighbours lives on to the next generation.
 * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
 * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
(function(conway){
    conway.Board = function(width, height){
        this.width = width || 0;
        this.height = height || 0;
        this.board = new Uint8Array(width*height);
    };
    conway.Board.prototype = {
        xytopos:function(x, y){
            return (y*this.width) + x;
        },
        pnttopos:function(p){
            return (p.y*this.width) + p.x;
        },
        clear:function() {
            this.board.fill(0); 
            return this;
        },
        setBoard:function(board) {
            this.board.set(board); 
            return this;
        },
        setWidth:function(w) {
            this.width = w;
            return this;
        },
        setHeight:function(h) {
            this.height = h;
            return this;
        },
        getHeight:function() {
            return this.height;
        },
        getWidth:function() {
            return this.width;
        }
    };

    conway.Point = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    conway.processWindow = function(){
        this.above = [];
        this.middle = [];
        this.below = [];
    };
    conway.processWindow = function() {
        shiftUp: function(next){
            this.above = this.middle;
            this.middle = this.below;
            this.below = next;
            return this;
        }
    };

    conway.game = function(){
        this.board = null;
    };

    conway.game.prototype = {
        init:function() {
            this.conwayBoard = new conway.Board(5, 5);
        },
        seed:function() {
            this.conwayBoard.setBoard([
                0,0,0,0,0,
                0,0,0,0,0,
                0,1,1,1,0,
                0,0,0,0,0,
                0,0,0,0,0
            ]);
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
