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
    
    const nivelVolume = document.getElementById('nivel-volume')
    let volumeCounter = getConfig.controls.volume

    document.querySelector('.music-details h2').innerHTML = getConfig.currentMusic.title
    document.querySelector('.music-details p').innerHTML = getConfig.currentMusic.author
    
    sourceAudio.src = getConfig.currentMusic.directory
    audioElement.load()
    nivelVolume.style.height = `${volumeCounter}%`
    audioElement.volume = volumeCounter / 100

    let volume = {
        loadVolume() {
            this.displayNivel()
            this.changeLocal()
            this.changeVolumeAudio()
        },
        displayNivel() {
            nivelVolume.style.height = `${volumeCounter}%`
        },
        changeLocal() {
            getConfig.controls.volume = volumeCounter
            setLocal('wmp-config', JSON.stringify(getConfig))
        },
        changeVolumeAudio() {
            audioElement.volume = volumeCounter / 100
        }
    }

    document.getElementById('add-volume').addEventListener('click', () => {
        if (volumeCounter < 100) {
            volumeCounter = volumeCounter + 5
            volume.loadVolume()
        }
    })

    document.getElementById('remove-volume').addEventListener('click', () => {
        if (volumeCounter > 0) {
            volumeCounter = volumeCounter - 5
            volume.loadVolume()
        }
    })

    


    /* ===== */
    /* Play */
    /* === */
    const playControll = document.getElementById('play-controll') // Botão de play / pause
    let progressBar = document.getElementById('progress-bar')
    let musicTimer;

    let controls = {
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
        },
        positionAudio(value) {
            audioElement.currentTime = value
        },
        changeState(prop) {
            config.controls[`${prop}`] = !config.controls[`${prop}`]
            setLocal('wmp-config', JSON.stringify(config))
        }
    }
 
    playControll.addEventListener('click', () => {
        if (!getConfig.controls.play) {
            controls.onPlay()

            getConfig.controls.play = true
        } else {
            controls.onPause()

            getConfig.controls.play = false
        }

        setLocal('wmp-config', JSON.stringify(getConfig))
    })

    progressBar.addEventListener('change', () => {
        controls.positionAudio(progressBar.value)
    })

    /* ======= */
    /* Random */
    /* ===== */
    const randomControll = document.getElementById('random-controll')
    let stateRandom = false

    randomControll.addEventListener('click', () => {
        if (!stateRandom) {
            randomControll.style.color = 'var(--Green)'
            stateRandom = true
        } else {
            randomControll.style.color = 'var(--Foreground)'
            stateRandom = false
        }

        controls.changeState('random')
    })

    /* ===== */
    /* Loop */
    /* === */
    const loopControll = document.getElementById('loop-controll')
    let stateLoop = false

    loopControll.addEventListener('click', () => {
        if (!stateLoop) {
            loopControll.style.color = 'var(--Green)'
            stateLoop = true
        } else {
            loopControll.style.color = 'var(--Foreground)'
            stateLoop = false
        }

        controls.changeState('loop')
    })


    function loadDetails(value) {

    }


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
                    document.querySelector('.music-details p').innerHTML = musics[prop].authorMusic

                    // config.currentMusic.title = musics[prop].nameMusic
                    // config.currentMusic.author = musics[prop].authorMusic
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