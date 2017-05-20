HTMLImports.whenReady(function() {
    'use strict';

    //@private
    let _game = new WeakMap();

    class ConwayGameOfLifeElement extends Polymer.Element {
        static get is() { return 'conway-game-of-life'; }
        static get properties() {
            return {
                width: {
                    value:100,
                    type: Number,
                    readOnly: false,
                    notify: true,
                    observer: '_widthChanged'
                },
                height: {
                    value:100,
                    type: Number,
                    readOnly: false,
                    observer: '_heightChange'
                }
            }
        }
        
        constructor() {
            super();

            _game.set(this, new conway.Game(document));

            console.log('conway-game-of-life created');
        }

        ready() {
            super.ready();
            
            let game = _game.get(this);

            this.$.gameBoard.width = this.width;
            this.$.gameBoard.height = this.height;

            game
                .init(this.shadowRoot, this.width, this.height)
                .seedRandom();
            
                (function() {
                    let continueRunning = true;
                    const INTERVAL = 100;

                    setTimeout(go, INTERVAL);

                    function go(){
                        if(continueRunning){
                            game
                                .tick()
                                .draw();

                            setTimeout(go, INTERVAL);
                        }
                    }
                })();

        }

        _heightChange(newValue, oldValue) {
            this.$.gameBoard.height = newValue;
        }
        
        _widthChanged(newValue, oldValue) {
            this.$.gameBoard.width = newValue;
        }
    }

    window.customElements.define(ConwayGameOfLifeElement.is, ConwayGameOfLifeElement);
});
