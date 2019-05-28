const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const path = require("path")

const SerialPort = require("serialport")
const ReadLine = require("@serialport/parser-readline")

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, "../public")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const devicePort = "COM3"
const serialPort = new SerialPort(devicePort, { baudRate: 9600 })
const parser = new ReadLine()
serialPort.pipe(parser)

app.use(express.static(publicDir))

io.on("connection", socket => {
    serialPort.write("New connection")
    parser.on("data", data => {
        if (data.includes("Status:")) {
            const status = data.replace(/["Status:" | \r]/g, "").split(",").map(st => parseInt(st))
            io.emit("status", status)
        }
    })
    socket.on("changeRoom", (room) => {
        serialPort.write("changeRoom" + room)
    })
})

server.listen(port, () => console.log("Server running on port " + port))