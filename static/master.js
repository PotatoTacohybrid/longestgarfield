


document.addEventListener('DOMContentLoaded', () => {

    const newText = document.querySelector('#newText')

    const button =  document.querySelector('#button')

    function timer() {

        let d = new Date()
    
        let curTime = d.getTime()

        let oldTime = localStorage.getItem('oldTime')


        if (!localStorage.getItem('oldTime')) { return true; }

        newText.disabled = true;
        button.disabled = true;

    
        setTimeout(function() {


            let timeLeft = Math.round((oldTime / 1000) - (curTime / 1000) + 59)


            if (timeLeft === 0) {

                newText.placeholder = `You may now submit`;

                button.disabled = false;
                newText.disabled = false;


                localStorage.removeItem('oldTime');


                return true;
            }
            newText.placeholder = (timeLeft >= 10) ? `Time until next message 0:${timeLeft}`: `Time until next message 0:0${timeLeft}`;

            timer();
    
        }, 1000)
    
    }

    function writeToLog(text, type) {
        document.querySelector('#log').innerHTML = `<p class='text-${type}'>${text}</p>`;
    }

    function clearLog() {
        document.querySelector('#log').innerHTML = ''
    }

    timer()


    //if (parseInt(localStorage.getItem('timer')) > d.getTime() - 86400000) {
        //button.disabled = true;
    //}
    //else {
        //button.disabled = false;
    //}

    

    document.querySelector('#newText').addEventListener('input', function() {
        if (this.value.length > 140) {
            writeToLog('Sentences cannot be longer than 140 characters', 'danger');
        }
        else {
            clearLog()
        }
    })

    const socket = io();

    socket.on('connect', () => {
        document.querySelector('#newSubmit').onsubmit = () => {


            if (newText.value.length === 0 || newText.value.length > 140) {
                return false;
            }

            let d = new Date();

            localStorage.setItem('oldTime', d.getTime())

            let tempText = newText.value;
            
            newText.value = "";
            newText.placeholder = "Time until next message 1:00";
    
            timer()

            socket.emit('new garfield', {'newText': tempText});

            return false;
        }

        socket.on('add garfield', data => {
            const div = document.querySelector('#main')

            div.append(` ${data.newText}`)
        })
    })
})