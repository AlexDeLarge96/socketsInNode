const socket = io()

const $room1Button = document.querySelector("#room1")
const $room2Button = document.querySelector("#room2")

socket.on("status", status => {
    updateStatus(status)
    disabledButtons(false)
})

$room1Button.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit("changeRoom", 1)
    disabledButtons(true)
})

$room2Button.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit("changeRoom", 2)
    disabledButtons(true)
})

const updateStatus = (status) => {

    if (status[0] == 0) {
        $room1Button.textContent = "On room 1"
        $room1Button.className = "buttonOn"
    } else {
        $room1Button.textContent = "Off room 1"
        $room1Button.className = "buttonOff"
    }

    if (status[1] == 0) {
        $room2Button.textContent = "On room 2"
        $room2Button.className = "buttonOn"
    } else {
        $room2Button.textContent = "Off room 2"
        $room2Button.className = "buttonOff"
    }
}

const disabledButtons = (disabled) => {
    $room1Button.disabled = disabled
    $room2Button.disabled = disabled
}