(function(conway) {
        var gameContainer = document.querySelector('#gameContainer'),
            game = new conway.Game();
    game
        .setDisplayContainerElement(gameContainer)
        .init(5, 5)
        .seed()
        .print();

        /*
        setInterval(function(){
            game.tick()
            .print()
        }, 500);
        */
})(conway);
