const express = require('express');
const debug = require('debug')('gs-example');
const GameServer = require('./lib/GameServer');
const path = require('path');
const io = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render('index');
});

const server = app.listen(app.get('port'), function () {
  debug('Express server listening on port %s', app.get('port'));
});

const sockets = io.listen(server);

new GameServer(sockets).start();
