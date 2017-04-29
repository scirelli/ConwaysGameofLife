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

    const LIVE            = conway.ConwayImageBoard.ON,
          DEAD            = conway.ConwayImageBoard.OFF,
          UNDERPOPULATION = 2 * LIVE,
          OVERPOPULATION  = 3 * LIVE,
          REPRODUCTION    = 3 * LIVE;

    conway.Game.prototype = {
        init:function(width, height, ctx) {
            this.conwayBoard = new conway.ConwayImageBoard(width, height, ctx);
            return this;
        },
        seed:function() {
            let pattern       = conway.Patterns.Blinker(),
                patternWidth  = pattern.getWidth(),
                patternHeight = pattern.getHeight(),
                offsetX       = 5,
                offsetY       = 5;

            for(let y=0; y<patternHeight; y++){
                for(let x=0,v=0; x<patternWidth; x++){
                    v = pattern.getValue(x, y);
                    this.conwayBoard.setBufferValue(x + offsetX, y + offsetY, v); 
                    this.conwayBoard.setValue(x + offsetX, y + offsetY, v);
                }
            }

            return this;
        },
        tick:function() {
            this.conwayBoard.swap();
            var board = this.conwayBoard,
                liveCount = 0,
                value = 0,
                width = this.conwayBoard.getWidth(),
                height = this.conwayBoard.getHeight();
            
            for(var y=0; y<height; y++){
                for(var x=0; x<width; x++){
                    value = board.getBufferValue(x, y);

                    liveCount = 0;
                    liveCount += board.getBufferValue(x-1, y-1);
                    liveCount += board.getBufferValue(x, y-1);
                    liveCount += board.getBufferValue(x+1, y-1);
                    
                    liveCount += board.getBufferValue(x-1, y);
                    liveCount += board.getBufferValue(x+1, y);
                    
                    liveCount += board.getBufferValue(x-1, y+1);
                    liveCount += board.getBufferValue(x, y+1);
                    liveCount += board.getBufferValue(x+1, y+1);

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
        draw:function() {
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
