/* global ColorHash */
/* global GarageServerIO */
/* global THREEx */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const keyboard = new THREEx.KeyboardState();
const colorHash = new ColorHash();

GarageServerIO.initializeGarageServer('http://localhost:3000', {
  onReady: startUpdate,
});

function startUpdate() {
  function update() {
    window.requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const playerStates = GarageServerIO.getPlayerStates();
    for (const player of playerStates) {
      ctx.fillStyle = colorHash.hex(player.id);
      ctx.beginPath();
      ctx.arc(
        player.state.x, player.state.y, 10,
        0, Math.PI * 2, true
      );
      ctx.fill();
    }

    checkPressed('left');
    checkPressed('right');
    checkPressed('up');
    checkPressed('down');
  }

  update();
}

function checkPressed(key) {
  if (keyboard.pressed(key)) GarageServerIO.addInput(key);
}
