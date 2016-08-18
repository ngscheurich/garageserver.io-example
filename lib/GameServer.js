const debug = require('debug')('gs-example');
const GarageServer = require('./server/garageserver.io');
const PlayerState = require('./shared/PlayerState.js');

class GameServer {
  constructor(sockets) {
    this.physicsInterval = 15;
    this.physicsDelta = this.physicsInterval / 1000;
    this.physicsIntervalId = 0;
    this.server = GarageServer.createGarageServer(sockets, {});
  }

  start() {
    this.physicsIntervalId = setInterval(
      () => this.update(),
      this.physicsInterval
    );
    this.server.start();
    debug('GarageServer.IO started');
  }

  update() {
    const players = this.server.getPlayers();
    for (const player of players) {
      const state = new PlayerState(
        player.id,
        player.state,
        this.physicsDelta,
        this.server
      );
      const nextState = state.next(player.inputs);
      this.server.updatePlayerState(player.id, nextState);
    }
  }
}

module.exports = GameServer;
