const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:8000'}})

const PORT = 3001

server.listen(PORT, () => console.log('Server running...'))