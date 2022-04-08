var conway = conway || {};

(function(conway){
    'use strict';

    const O = conway.ConwayImageBoard.ON,
          F = conway.ConwayImageBoard.OFF;

    conway.Patterns = {
        Blinker:function(){
            return new conway.ArrayBoard(5, 3).setData([
                F,F,F,F,F,
                F,O,O,O,F,
                F,F,F,F,F
            ]);
        },
        Toad:function() {
            return new conway.ArrayBoard(6, 4).setData([
                F,F,F,F,F,F,
                F,O,O,O,F,F,
                F,F,O,O,O,F,
                F,F,F,F,F,F
            ]);
        },
        Beacon:function() {
            return new conway.ArrayBoard(6, 6).setData([
                F,F,F,F,F,F,
                F,O,O,F,F,F,
                F,O,O,F,F,F,
                F,F,F,O,O,F,
                F,F,F,O,O,F,
                F,F,F,F,F,F
            ]);
        }
    };
})(conway);
