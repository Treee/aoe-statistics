const mongoose = require('mongoose');
const Player = require("./player")(mongoose);

describe('Game Player', () => {
    it('can create two individual models', () => {
        const player = new Player.Model();
        player.name = "test";
        player.name1 = "test";
        const player2 = new Player.Model()
        player2.name = "fdsfdsfs";
        console.log('player', player);
        expect(player.name).toBe("test");
        expect(player2.name).toBe("fdsfdsfs");
    });

})
