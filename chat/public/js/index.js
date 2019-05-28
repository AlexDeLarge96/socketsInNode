const socket = io()

const $chat = document.querySelector("#chat")
const $msg = document.querySelector("#msg")
const $send = document.querySelector("#send")

const rooms = ["room1", "room2"]
const userRoom = rooms[Math.floor(Math.random() * rooms.length)]

socket.on("welcome", msg => {
    $chat.insertAdjacentHTML("beforeEnd", msg)
})

$send.addEventListener("click", e => {
    e.preventDefault()
    socket.emit("sendMsg", $msg.value, userRoom)
    $msg.value = ""
})

socket.on("updateChat", msg => {
    $chat.insertAdjacentHTML("beforeEnd", "<br>" + msg)
    $chat.scrollTop = $chat.scrollHeight
})

socket.emit("join", userRoom)