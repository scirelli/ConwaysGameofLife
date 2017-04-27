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
        this.container = null;
        this.canvas = null;
    };

    const LIVE = conway.Board.ON,
          DEAD = conway.Board.OFF,
          UNDERPOPULATION = 2 * LIVE,
          OVERPOPULATION = 3 * LIVE,
          REPRODUCTION = 3 * LIVE;

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
                for(var x=0; x<width; x++){
                    value = board.getValue(x, y);
                    liveCount = 0;
                    liveCount += board.getValue(x-1, y-1);
                    liveCount += board.getValue(x, y-1);
                    liveCount += board.getValue(x+1, y-1);
                    
                    liveCount += board.getValue(x-1, y);
                    liveCount += board.getValue(x+1, y);
                    
                    liveCount += board.getValue(x-1, y+1);
                    liveCount += board.getValue(x, y+1);
                    liveCount += board.getValue(x+1, y+1);

                    if(value === LIVE){
                        if( liveCount < UNDERPOPULATION || liveCount > OVERPOPULATION ){
                            board.setValue(x, y, DEAD);
                        }else{
                            //Remain alive
                            board.setValue(x, y, LIVE);
                        }
                    }else{
                        if( liveCount === REPRODUCTION ){
                            board.setValue(x, y, LIVE);
                        }else{
                            //remain dead
                            board.setValue(x, y, DEAD);
                        }
                    }
                }
            }

            return this;
        },
        setDisplayContainerElement:function(el){
            if(typeof(el) === 'string'){
                this.container = document.querySelector(el);
            }else{
                this.container = el;
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

    function createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.conwayBoard.getWidth();
        this.canvas.height = this.conwayBoard.getHeight();
    };
})(conway);
