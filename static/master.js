


document.addEventListener('DOMContentLoaded', () => {

    let d = new Date()
    const button =  document.querySelector('#button')

    if (parseInt(localStorage.getItem('timer')) > d.getTime() - 86400000) {
        button.disabled = true;
    }
    else {
        button.disabled = false;
    }

    const socket = io();

    socket.on('connect', () => {
        document.querySelector('#newSubmit').onsubmit = () => {

            const newText = document.querySelector('#newText');

            if (newText.value.length === 0 || newText.value.length > 20 || newText.value.indexOf(' ') > 0) {
                return false;
            }

            let d = new Date();
            localStorage.setItem('timer', d.getTime());

            button.disabled = true;

            socket.emit('new garfield', {'newText': newText.value});

            newText.value = "";

            return false;
        }

        socket.on('add garfield', data => {
            const div = document.querySelector('#main')

            div.append(` ${data.newText}`)
        })
    })
})