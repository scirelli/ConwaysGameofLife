var conway = conway || {};

conway.ColorRGB = (function() {
    function ColorRGB(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;

        this.setRed(red);
        this.setGreen(green);
        this.setBlue(blue);
        this.setAlpha(alpha);
    }

    ColorRGB.prototype = {
        //Getters
        getRed:function(){
            return this.red;
        },
        getGreen:function(){
            return this.green;
        },
        getBlue:function(){
            return this.blue;
        },
        getAlpha:function(){
            return this.alpha;
        },

        //Setters
        setRed:function( red ){
            this.red = window.parseInt(red) & 255;
            return this;
        },
        setGreen:function( green ){
            this.green = window.parseInt(green) & 255;
            return this;
        },
        setBlue:function( blue ){
            this.blue = window.parseInt(blue) & 255;
            return this;
        },
        setAlpha:function( alpha ){
            this.alpha = window.parseInt(alpha) & 255;
            return this;
        }
    };

    return ColorRGB;
})();
