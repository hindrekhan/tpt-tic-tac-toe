const express = require('express');

const sum = require('./sum');

const app = express();

const port = process.env.PORT || 3000;


app.get('/health_check', (req, res) => {
  // eslint-disable-next-line global-require
  res.send(`ok:${+new Date()}[${require('os').hostname()}]`);
});

app.get('/', (req, res) => {
  res.send('hello world<br><a href="/sum/1/2">1=2=?</a>');
});

app.get('/sum/:a/:b', (req, res) => {
  const { a, b } = req.params;
  const s = sum(parseInt(a, 10), parseInt(b, 10));
  res.send(`${a}+${b}=${s}`);
});

app.listen(port, () => {
  console.log(
    `Server is now running on http://localhost:${port}/`,
  );
});
