const spdy = require('spdy'),
  fs = require('fs'),
  path = require('path'),
  express = require('express')
  app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, req.url))
})

const isNullOrUndefined = value => (
  value === undefined || value === null
)

function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}

const data = []

for (let i = 0; i < 1000; i++) {
  data.push({ content: b()})
}

app.get('/db', (req, res) => {
  if (!isNullOrUndefined(req.query.idx)) {
    const idx = parseInt(req.query.idx, 10)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(data[idx]))
    return
  }
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Data-Count', data.length.toString())
  res.send(JSON.stringify(data[0]))
})

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
})
