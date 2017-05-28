HTMLImports.whenReady(function() {
    'use strict';

    //@private
    let _game = new WeakMap(),
        _setTimeoutId = new WeakMap(),
        _continueRunning = new WeakMap(),
        _tickCountMS = new WeakMap();

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
            _setTimeoutId.set(this, 0);
            _continueRunning.set(this, false);
            _tickCountMS.set(this, 100);

            console.log('conway-game-of-life created');
        }

        ready() {
            super.ready();
            
            this.$.gameBoard.width = this.width;
            this.$.gameBoard.height = this.height;
        }

         init() {
            let self = this,
                game = _game.get(self);

            game
                .init(self.shadowRoot, self.width, self.height)
                .seedRandom();

            return self;
        }

        stop() {
            window.clearTimeout(_setTimeoutId.get(this));
            _continueRunning.set(this, false);
        }
        
        start() {
            _continueRunning.set(this, true);
            _tick.call(this);
        }
        
        _heightChange(newValue, oldValue) {
            this.$.gameBoard.height = newValue;
            return this;
        }
        
        _widthChanged(newValue, oldValue) {
            this.$.gameBoard.width = newValue;
            return this;
        }
    }

    function _tick() {
        let self = this,
            game = _game.get(self);

        if(_continueRunning.get(self)){
            game
                .tick()
                .draw();

            _setTimeoutId.set(self, setTimeout(function(){
                _tick.call(self);
            }, _tickCountMS.get(self)));
        }

        return self;
    }

    window.customElements.define(ConwayGameOfLifeElement.is, ConwayGameOfLifeElement);
});
