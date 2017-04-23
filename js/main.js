(function(conway) {
    var game = new conway.Game();
    game.init(5, 5).seed().print().tick().print();
})(conway);
