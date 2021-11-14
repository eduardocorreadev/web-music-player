const audioElement = document.querySelector('audio')
const sourceAudio = document.querySelector('source')
const musicArea = document.getElementById('music-area')
let config;

if (typeof (Storage) !== 'undefined') {

    function setLocal(key, value) {
        localStorage.setItem(key, value)
    }

    function getLocal(key) {
        return localStorage.getItem(key)
    }

    config = {
        currentMusic: {
            title: "Nada sendo tocado",
            author: "Não informado",
            directory: "",
            time: 0,
        },
        controls: {
            play: false,
            volume: 100,
            random: false,
            loop: false
        }
    }

    if (!getLocal('wmp-config')) {
        setLocal('wmp-config', JSON.stringify(config))
    }


    const getConfig = JSON.parse(getLocal('wmp-config'))

    document.querySelector('.music-details h2').innerHTML = getConfig.currentMusic.title
    document.querySelector('.music-details span').innerHTML = getConfig.currentMusic.author
    sourceAudio.src = getConfig.currentMusic.directory
    audioElement.load()

    /* ===== */
    /* Play */
    /* === */
    const playControll = document.getElementById('play-controll') // Botão de play / pause
    let progressBar = document.getElementById('progress-bar')
    let musicTimer;

    let controlsMain = {
        onPlay() {
            audioElement.play()
            playControll.innerHTML = 'pause_circle'
            this.updateProgressBar()
        },
        onPause() {
            audioElement.pause()
            playControll.innerHTML = 'play_circle_filled'
            clearInterval(musicTimer)
        },
        updateProgressBar() {
            musicTimer = setInterval(() => {
                progressBar.max = audioElement.duration
                progressBar.value = audioElement.currentTime
            }, 1000);
        }
    }

    function positionAudio(value) {
        audioElement.currentTime = value 
    }

    playControll.addEventListener('click', () => {
        if (!getConfig.controls.play) {
            controlsMain.onPlay()

            getConfig.controls.play = true
        } else {
            controlsMain.onPause()

            getConfig.controls.play = false
        }

        setLocal('wmp-config', JSON.stringify(getConfig))
    })

    



    function changeControls(prop) {
        config.controls[`${prop}`] = !config.controls[`${prop}`]
        setLocal('wmp-config', JSON.stringify(config))
    }

    /* ======= */
    /* Random */
    /* ===== */
    const randomControll = document.getElementById('random-controll')
    let stateRandom = false

    randomControll.addEventListener('click', () => {
        if (!stateRandom) {
            changeControls('random')

            randomControll.style.color = 'var(--Green)'
            stateRandom = true
        } else {
            changeControls('random')

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
            changeControls('loop')

            loopControll.style.color = 'var(--Green)'
            stateLoop = true
        } else {
            changeControls('loop')

            loopControll.style.color = 'var(--Foreground)'
            stateLoop = false
        }
    })


    const musicItem = document.querySelectorAll('.music-item')

    musicItem.forEach(item => {
        item.addEventListener('click', () => {
            const directoryMusic = item.querySelector('.directory-music').textContent
            sourceAudio.src = directoryMusic
            audioElement.load()

            controlsMain.onPlay()

            const musics = JSON.parse(getLocal('list-music'))

            for (let prop in musics) {
                if (musics[prop].directory === directoryMusic) {
                    document.querySelector('.music-details h2').innerHTML = musics[prop].nameMusic
                    document.querySelector('.music-details span').innerHTML = musics[prop].authorMusic

                    config.currentMusic.title = musics[prop].nameMusic
                    config.currentMusic.author = musics[prop].authorMusic
                    config.currentMusic.directory = musics[prop].directory

                    setLocal('wmp-config', JSON.stringify(config))
                    break
                }
            }
        })

    })


} else {
    alert('Seu Navegador não suporta WebMP')
}

// const som1 = document.getElementById("audio1");

// som1.onloadeddata = function() {
//     let data = new Date(null);
//     data.setSeconds(som1.duration);
//     let duracao = data.toISOString().substr(12, 8);
//     console.log("O som tem duração " + duracao);
// };