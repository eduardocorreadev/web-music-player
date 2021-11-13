const audioElement = document.querySelector('audio')
const musicArea = document.getElementById('music-area')

/* ===== */
/* Play */
/* === */  
const playControll = document.getElementById('play-controll') // Botão de play / pause
let statePlay = false
let musicTimer;

function onPlay() {
    audioElement.play()
    playControll.innerHTML = 'pause_circle' 

    let progressBar = document.getElementById('progress-bar') // Input Range
    progressBar.max = audioElement.duration

    musicTimer = setInterval(() => {
        progressBar.value = audioElement.currentTime

        document.getElementById('timer-display').innerHTML = `${Math.floor(audioElement.currentTime)} / ${Math.floor(audioElement.duration)}`
        console.log(audioElement.currentTime)
    }, 1000)
}

function onPause() {
    audioElement.pause()

    playControll.innerHTML = 'play_circle_filled'
    clearInterval(musicTimer)
}

function positionAudio(value) {
    audioElement.currentTime = value
}

playControll.addEventListener('click', () => {
    if (!statePlay) {
        onPlay()
        statePlay = true
    } else {
        onPause()
        statePlay = false
    }
}) 











/* ======= */ 
/* Random */
/* ===== */ 
const randomControll = document.getElementById('random-controll')
let stateRandom = false

randomControll.addEventListener('click', () => {
    if (!stateRandom) {

        // Ativo

        randomControll.style.color = 'var(--Green)'
        stateRandom = true
    } else {
        randomControll.style.color = 'var(--Foreground)'
        stateRandom = false
    }
})

/* ===== */ 
/* Loop */
/* === */ 
const loopControll = document.getElementById('loop-controll')
let stateLoop = false

loopControll.addEventListener('click', () => {
    if (!stateLoop) {

        // Ativo

        loopControll.style.color = 'var(--Green)'
        stateLoop = true
    } else {
        loopControll.style.color = 'var(--Foreground)'
        stateLoop = false
    }
})














// const som1 = document.getElementById("audio1");

// som1.onloadeddata = function() {
//     let data = new Date(null);
//     data.setSeconds(som1.duration);
//     let duracao = data.toISOString().substr(12, 8);
//     console.log("O som tem duração " + duracao);
// };