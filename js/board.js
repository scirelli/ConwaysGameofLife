var conway = conway || {};

(function(conway){
    'use strict';

    conway.Board = function(width, height){
        this.width = width || 0;
        this.height = height || 0;
        this.board = null;

        this.init(width, height);
    };

    conway.Board.ON  = 255,
    conway.Board.OFF = 0;

    conway.Board.prototype = {
        init:function(width, height) {
            this.board = new Uint8ClampedArray(width*height);
        },
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
        setBoard:function(board, offset) {
            this.board.set(board, offset); 
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
        getBoard:function() {
            return this.board;
        },
        getHeight:function() {
            return this.height;
        },
        getWidth:function() {
            return this.width;
        },
        getValue:function(x, y){
            return this.getBoard()[(y*this.width) + x] || 0;
        },
        toString:function() {
            var height = this.getHeight(),
                width = this.getWidth(),
                board = this.getBoard(),
                str = [];

            for(var y=0; y<height; y++){
                for(var x=0, s=[]; x<width; x++){
                    s.push(this.getValue(x, y) ? 'X' : '_');
                }
                str.push(s.join(','));
            }

            return str.join('\n');
        }
    };

    conway.BufferedBoard = function(width, height){
        conway.Board.call(this, width, height);

        var bufferedBoard = [this.board, new conway.Board(width, height)];

        this.board = bufferBoard[0];
        this.drawBoard = bufferedBoard[1];
    };
    conway.BufferedBoard.prototype = new conway.Board();

    conway.BufferedBoard.prototype.swap = function() {
        var tmp = this.drawBoard;

        this.drawBoard = this.board;
        this.board = tmp;
    };

    conway.BufferedBoard.prototype.setBoard = function(board) {
        this.drawBoard = board.slice(0);
        this.board = boa.slice(0);
        return this;
    };

    conway.BufferedBoard.prototype.getDrawBoard = function() {
        return this.drawBoard;
    };
})(conway);
