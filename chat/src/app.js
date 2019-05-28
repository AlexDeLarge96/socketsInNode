const express = require("express")
const path = require("path")
const socketio = require("socket.io")
const http = require("http")

const publicDir = path.join(__dirname, "../public")
const port = 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(publicDir))

io.on("connection", (socket) => {
    socket.on("join", room => {
        socket.join(room)
        socket.emit("welcome", "<b>Hello from server. You are in " + room + "</b>")
        socket.broadcast.to(room).emit("updateChat", "<b>A new user has joined the chat</b>")
    })

    socket.on("sendMsg", (msg, room) => {
        io.to(room).emit("updateChat", msg)
    })
})

server.listen(port, () => console.log("Server running on port " + port))