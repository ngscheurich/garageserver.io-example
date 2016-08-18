class PlayerState {
  constructor(id, state, physicsDelta, server) {
    Object.assign(this, { id, state, physicsDelta, server });

    this.x = this.state.x ? this.state.x : 0;
    this.y = this.state.y ? this.state.y : 0;
    this.speed = 100;
  }

  next(playerInputs) {
    for (const playerInput of playerInputs) {
      if (playerInput.input === 'left') this.move('left');
      if (playerInput.input === 'right') this.move('right');
      if (playerInput.input === 'up') this.move('up');
      if (playerInput.input === 'down') this.move('down');
    }

    return {x: this.x, y: this.y};
  }

  move(direction) {
    switch (direction) {
    case 'left':
      this.x -= this.physicsDelta * this.speed;
      break;
    case 'right':
      this.x += this.physicsDelta * this.speed;
      break;
    case 'up':
      this.y -= this.physicsDelta * this.speed;
      break;
    case 'down':
      this.y += this.physicsDelta * this.speed;
      break;
    default:
      break;
    }
  }
}

if (typeof module !== 'undefined') module.exports = PlayerState;
