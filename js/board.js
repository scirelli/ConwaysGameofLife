var conway = conway || {};

(function(conway){
    'use strict';

    conway.ABoard = function(width, height){
        this.width = width || 0;
        this.height = height || 0;
        this.data = null;

        this.init(width, height);
    };

    conway.ABoard.prototype = {
        init:function(width, height) {},
        clear:function() {
            throw new Error('Must be implemented in base class.');
        },
        getValue:function(x, y){
            throw new Error('Must be implemented in base class.');
        },
        setValue:function(x, y, v){
            throw new Error('Must be implemented in base class.');
        },

        xytopos:function(x, y){
            return (y*this.width) + x;
        },
        pnttopos:function(p){
            return (p.y*this.width) + p.x;
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
        },

        getData:function() {
            return this.data;
        },
        setData:function(data) {
            this.data = data;
            return this;
        },

        toString:function() {
            var height = this.getHeight(),
                width = this.getWidth(),
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
    
    //=========================================================
    
    conway.ArrayBoard = function(width, height) {
        conway.ABoard.call(this, width, height);
    };
    conway.ArrayBoard.prototype = new conway.ABoard();
    conway.ArrayBoard.prototype.init = function(width, height) {
        this.data = new Uint8Array(width * height);
    };
    conway.ArrayBoard.prototype.clear = function() {
        this.data.fill(0);
    };
    conway.ArrayBoard.prototype.getValue = function(x, y){
        return this.data[this.xytopos(x, y)];
    };
    conway.ArrayBoard.prototype.setValue = function(x, y, v){
        this.data[this.xytopos(x, y)] = v;
    };

    //=========================================================
    conway.ABufferedBoard = function(width, height){
        this.bufferedData = null;
        conway.ABoard.call(this, width, height);
    };
    conway.ABufferedBoard.prototype = new conway.ABoard();

    conway.ABufferedBoard.prototype.swap = function() {
        var tmp = this.bufferedData;

        this.bufferedData = this.data;
        this.data = tmp;
    };

    conway.ABufferedBoard.prototype.clear = function() {
        this.getBufferedData().fill(0);
        this.getData().fill(0);
        return this;
    };

    conway.ABufferedBoard.prototype.getBufferedData = function() {
        return this.bufferedData;
    };

    conway.ABufferedBoard.prototype.setBufferedData = function(data) {
         this.bufferedData = data;
         return this;
    };

    conway.ABufferedBoard.prototype.getValue = function(x, y){
        return this.getData()[this.xytopos(x, y)];
    };
    conway.ABufferedBoard.prototype.setValue = function(x, y, v){
         this.getData()[this.xytopos(x, y)] = v;
         return this;
    };

    conway.ABufferedBoard.prototype.setBufferValue = function(x, y, v){
        this.getBufferedData()[this.xytopos(x, y)] = v;
        return this;
    };
    conway.ABufferedBoard.prototype.getBufferValue = function(x, y){
        return this.getBufferedData()[this.xytopos(x, y)];
    };

    //=========================================================
    
    /*
     * Note: Read from bufferData write to data.
     */
    conway.ConwayImageBoard = function(width, height) {
        conway.ABufferedBoard.call(this, width, height);
    };
    conway.ConwayImageBoard.ON  = 1,
    conway.ConwayImageBoard.OFF = 0;
    conway.ConwayImageBoard.prototype =  new conway.ABufferedBoard();

    conway.ConwayImageBoard.prototype.init = function() {
        this.setData(new Uint8ClampedArray(this.getWidth() * this.getHeight()));
        this.setBufferedData(new Uint8ClampedArray(this.getWidth() * this.getHeight()));
    };
})(conway);
