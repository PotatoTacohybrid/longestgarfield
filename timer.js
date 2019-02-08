function timer(oldTime, length, OGlength) {

    let d = new Date()

    curTime = d.getTime()

    setTimeout(function() {
        if (Math.round((curTime / 1000) - (oldTime / 1000) - OGlength) === 0) {
            console.log(length)
            return true;
        }

        console.log(length)
        length--;

        timer(oldTime, length, OGlength)

    }, 1000)

}
let d = new Date()


timer(d.getTime(), 6, 6)