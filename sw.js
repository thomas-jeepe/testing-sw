self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  self.clients.claim()
})

function getRestOfData(port, dataCount) {
  let i = 1
  while (i < dataCount) {
    const last = (i + 1) === dataCount
    fetch(`/db?idx=${i}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
        port.postMessage(json)
        if (last) {
          port.postMessage('DONE')
        }
      })
    i++
  }
}

function getData(port) {
  return fetch('/db')
    .then(res => {
      const dataCount = parseInt(res.headers.get('Data-Count'), 10)
      getRestOfData(port, dataCount)
      return res.json()
    })
    .then(json => {
      port.postMessage(json)
    })
}

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'GET_DATA') {
    const port = event.ports[0]
    getData(port)
  }
})
