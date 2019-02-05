document.addEventListener('DOMContentLoaded', () => {

    const socket = io();

    socket.on('connect', () => {
        document.querySelector('#newSubmit').onsubmit = () => {
            const newText = document.querySelector('#newText');


            if (newText.value.length === 0) {
                return false;
            }


            socket.emit('new garfield', {'newText': newText.value});

            newText.value = ""
        }

        socket.on('add garfield', data => {
            const div = document.querySelector('#container')

            div.append(` ${data.newText}`)
        })
    })
})