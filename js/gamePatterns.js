var conway = conway || {};

(function(conway){
    'use strict';

    const O = conway.Board.ON,
          F = conway.Board.OFF;

    conway.Patterns = {
        Blinker:function(){
            return new conway.Board(5, 3).setBoard([
                F,F,F,F,F,
                F,O,O,O,F,
                F,F,F,F,F
            ]);
        },
        Toad:function() {
            return new conway.Board(6, 4).setBoard([
                F,F,F,F,F,F,
                F,O,O,O,F,F,
                F,F,O,O,O,F,
                F,F,F,F,F,F
            ]);
        },
        Beacon:function() {
            return new conway.Board(6, 6).setBoard([
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
