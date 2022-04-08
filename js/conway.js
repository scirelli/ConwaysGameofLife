var conway = conway || {};
/*
 * 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * 2. Any live cell with two or three live neighbours lives on to the next generation.
 * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
 * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
(function(conway){
    'use strict';
    conway.Game = function(document){
        this.document            = document;
        this.board               = null;
        this.container           = null;
        this.canvas              = null;
        this.canvasContext       = null;
        this.canvasBuffer        = null;
        this.canvasBufferContext = null;
        this.parentElement       = null;
        this.conwayBoard         = null; 
        this.imageBufferData     = null;
        
        this.width              = 0;
        this.height             = 0;
        this.rows               = 0;
        this.columns            = 0;
    };

    const LIVE            = conway.ConwayImageBoard.ON,
          DEAD            = conway.ConwayImageBoard.OFF,
          UNDERPOPULATION = 2 * LIVE,
          OVERPOPULATION  = 3 * LIVE,
          REPRODUCTION    = 3 * LIVE,
          CELL_WIDTH      = 5,
          CELL_HEIGHT     = 5,
          SCALE_FACTOR_X  = CELL_WIDTH,
          SCALE_FACTOR_Y  = CELL_HEIGHT,
          CELL_COLOR      = new conway.ColorRGB(255, 255, 255, 255);

    conway.Game.prototype = {
        init:function(parentElement, width, height) {
            if(this.width%4 || this.height%4) {
                console.warn('Canvas dimensions should be in multiples of ' + SCALE_FACTOR + '.');
            }
            this.width        = width;
            this.height       = height;
            this.rows         = Math.floor(height/CELL_HEIGHT);
            this.columns      = Math.floor(width/CELL_WIDTH);

            this.parentElement = parentElement;

            createCanvas.call(this);
            createBufferCanvas.call(this);

            this.conwayBoard   = new conway.ConwayImageBoard(this.columns, this.rows, this.canvasContext);

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
        seedRandom: function() {
            let width = this.conwayBoard.getWidth(),
                height = this.conwayBoard.getHeight();

            for(let y=0; y<height; y++){
                for(let x=0,v=0; x<width; x++){
                    v = Math.round(Math.random());
                    this.conwayBoard.setBufferValue(x, y, v); 
                    this.conwayBoard.setValue(x, y, v);
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
                    liveCount += board.getBufferValue(x-1, y-1) || 0;
                    liveCount += board.getBufferValue(x, y-1) || 0;
                    liveCount += board.getBufferValue(x+1, y-1) || 0;
                    
                    liveCount += board.getBufferValue(x-1, y) || 0;
                    liveCount += board.getBufferValue(x+1, y) || 0;
                    
                    liveCount += board.getBufferValue(x-1, y+1) || 0;
                    liveCount += board.getBufferValue(x, y+1) || 0;
                    liveCount += board.getBufferValue(x+1, y+1) || 0;

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
            drawCells.call(this);
            drawGrid.call(this);
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

    function drawCells() {
        let board           = this.conwayBoard,
            width           = board.getWidth(),
            height          = board.getHeight(),
            imageBufferData = this.imageBufferData.data,
            imageData       = board.getData();

        for(let y=0,dy; y<height; y++){
            dy = y*width;
            for(let x=0,v=0,pos, posInBuffer=0; x<width; x++){
                pos = dy + x;
                posInBuffer = 4 * pos;

                imageBufferData[posInBuffer]     = imageData[pos] * CELL_COLOR.red;
                imageBufferData[posInBuffer + 1] = imageData[pos] * CELL_COLOR.green; 
                imageBufferData[posInBuffer + 2] = imageData[pos] * CELL_COLOR.blue;
                imageBufferData[posInBuffer + 3] = CELL_COLOR.alpha;
            }
        }

        this.canvasBufferContext.putImageData(this.imageBufferData, 0, 0);
        this.canvasContext.scale(SCALE_FACTOR_X, SCALE_FACTOR_Y);
        this.canvasContext.drawImage(this.canvasBuffer, 0, 0);
        this.canvasContext.scale(1/SCALE_FACTOR_X, 1/SCALE_FACTOR_Y);

        return this;
    }
   
    function drawGrid() {
        // this.canvasContext;

        // ctx.moveTo(i * cell_width, 0);
        // ctx.lineTo(i * cell_width, cells_y * cell_height);

        // ctx.strokeStyle=colGrid;
        // ctx.stroke();
        return this;        
    }

    function removeCanvasBuffers() {
        this.parentElement.querySelectorAll('canvas.buffer').forEach(function(buffer) {
            buffer.remove(); 
        });
    }
     
    function createCanvas() {
        this.canvas        = this.parentElement.querySelector('canvas#gameBoard');
        this.canvasContext = this.canvas.getContext('2d');
        return this;
    }

    function createBufferCanvas() {
        removeCanvasBuffers.call(this);

        this.canvasBuffer        = this.document.createElement('canvas');
        this.canvasBufferContext = this.canvasBuffer.getContext('2d');
        this.canvasBuffer.width  = this.columns;
        this.canvasBuffer.height = this.rows;

        this.imageBufferData     = this.canvasContext.createImageData(this.columns, this.rows);

        this.canvasBuffer.classList.add('buffer');
        this.parentElement.appendChild(this.canvasBuffer);

        return this;
    }
})(conway);
