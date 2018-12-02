const path = require('path');
const express = require('express');
const cors = require('cors');
const randomstring = require("randomstring");
const sum = require('./sum');
const TicTacToe = require('./TicTacToe');

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

const db = {};

function getGameJson(code, game) {
  return {
    code,
    fields: game.getFields(),
    lastTurn: game.lastTurn,
    victory: game.victory(),
    tie: game.tie(),
  }
}

app.get('/api/start', (req, res) => {
  const code = randomstring.generate({
    length: 5,
    charset: 'alphabetic'
  });
  db[code] = new TicTacToe();
  res.json(getGameJson(code, db[code]));
});

app.get('/api/makeTurn/:code/:x/:y/:type', (req, res) => {
  const { code, x, y, type } = req.params;
  const game = db[code];
  if (!game) {
    res.json({
      'error': 'no game found with given id',
    });
    return;
  }
  try {
    game.makeTurn(+x, +y, type);
    res.json(getGameJson(code, game));
  } catch(e) {
    res.json({
      'error': e.message,
    });
  }
});

app.get('/api/status/:code', (req, res) => {
  const { code } = req.params;
  const game = db[code];
  if (!game) {
    res.json({
      'error': 'no game found with given id',
    });
    return;
  }
  res.json(getGameJson(code, game))
});


app.get('/health_check', (req, res) => {
  // eslint-disable-next-line global-require
  res.send(`ok:${+new Date()}[${require('os').hostname()}]`);
});

app.use('/', express.static(path.resolve(__dirname, '../../web/dist')));

app.get('/sum/:a/:b', (req, res) => {
  const { a, b } = req.params;
  const s = sum(parseInt(a, 10), parseInt(b, 10));
  res.send(`${a}+${b}=${s}`);
});

app.get('/api/random', (req, res) => {
  res.json({
    number: Math.floor((Math.random() * 1000) + 1),
  })
});

app.listen(port, '0.0.0.0', () => {
  console.log(
    `Server is now running on http://localhost:${port}/`,
  );
});
