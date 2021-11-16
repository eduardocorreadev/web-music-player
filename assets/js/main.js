if (typeof (Storage) !== 'undefined') {
    const audioElement = document.querySelector('audio')
    const sourceAudio = document.querySelector('source')

    let addConfig = {currentMusic: {directory: "",time: 0,},controls: {play: false,volume: 100,random: false,loop: false}}

    if (!getItem('wmp-config')) {
        setItem('wmp-config', JSON.stringify(addConfig))
    }

    function setItem(key, value) {
        localStorage.setItem(key, value)
    }

    function getItem(key) {
        return localStorage.getItem(key)
    }

    const getConfig = JSON.parse(getItem('wmp-config'))
    const getListMusic = JSON.parse(getItem('list-music'))

    /* ===== */
    /* Play */
    /* === */
    const playControll = document.getElementById('play-controll') // Botão de play / pause
    const progressBar = document.getElementById('progress-bar')
    let musicTimer;

    function loadMusic() {
        const imageMusic = document.getElementById('image-music')
        const nameMusic = document.getElementById('name-music')
        const authorMusic = document.getElementById('author-music')

        if (!getConfig.currentMusic.directory == "") { // se for vazio quer dizer que não existe música
            for (let prop in getListMusic) {
                if (getListMusic[prop].directory == getConfig.currentMusic.directory) {
                    sourceAudio.src = getListMusic[prop].directory
                    imageMusic.src = getListMusic[prop].image
                    nameMusic.innerHTML = getListMusic[prop].nameMusic
                    authorMusic.innerHTML = getListMusic[prop].authorMusic
                    audioElement.load()
                    break
                }
            }
        } else {
            nameMusic.innerHTML = "Nada sendo tocado no momento"
            authorMusic.innerHTML = "Nada sendo tocado no momento"
        }
    }

    loadMusic()
    

    // Quando clicar tem que inciar a música e pa
    document.querySelectorAll('.music-item').forEach(item => {
        item.addEventListener('click', () => {
            getConfig.currentMusic.directory = item.querySelector('.directory-music').textContent
            loadMusic()
            controls.onPlay()
        })
    })

    const controls = {
        onPlay() {
            audioElement.play()
            playControll.innerHTML = 'pause_circle'
            getConfig.controls.play = true
            this.updateProgressBar()

            setItem('wmp-config', JSON.stringify(getConfig))
        },
        onPause() {
            audioElement.pause()

            playControll.innerHTML = 'play_circle_filled'
            
            getConfig.controls.play = false
            getConfig.currentMusic.time = audioElement.currentTime

            clearInterval(musicTimer)

            setItem('wmp-config', JSON.stringify(getConfig))
        },
        back() {
            if (progressBar.value > 10) {
                audioElement.currentTime = 0
            } else {
                for (let prop in getListMusic) {
                    if (getListMusic[prop].directory == getConfig.currentMusic.directory) {
                        let vl = prop - 1
                        getConfig.currentMusic.directory = getListMusic[vl].directory
                        setItem('wmp-config', JSON.stringify(getConfig))
                        // ARRUMAR
                        break
                    }
                }
                console.log('Voltei para a música anterior')
            }
        },
        skip() {
            if (!getConfig.controls.random) {
                for (let prop in getListMusic) {
                    if (getListMusic[prop].directory == getConfig.currentMusic.directory) {

                        if (prop >= getListMusic.length-1) {
                            prop = 0
                        } else {
                            ++prop
                        }

                        getConfig.currentMusic.directory = getListMusic[prop].directory
                        setItem('wmp-config', JSON.stringify(getConfig))

                        loadMusic()
                        this.onPlay()
                        break
                    }
                }
            } else {
                this.random()
                loadMusic()
                this.onPlay()
            }
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
        loop() {
            if (getConfig.controls.loop) {
                this.onPlay()
            }
        },
        random() {
            if (getConfig.controls.random && !getConfig.controls.loop) {
                let a = Math.floor(Math.random() * (getListMusic.length - 0) + 0)
                console.log(a)
                getConfig.currentMusic.directory = getListMusic[a].directory
                this.onPlay()
            }
        },
        changeState(prop) {
            getConfig.controls[`${prop}`] = !getConfig.controls[`${prop}`]
            setItem('wmp-config', JSON.stringify(getConfig))
        }
    }

    const loopControll = document.getElementById('loop-controll')
    let stateLoop = false

    loopControll.addEventListener('click', () => {
        if (!getConfig.controls.loop) {
            loopControll.style.color = 'var(--Green)'
            stateLoop = true
        } else {
            loopControll.style.color = 'var(--Foreground)'
            stateLoop = false
        }

        controls.changeState('loop')
    })

    /* Random */
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

    audioElement.addEventListener('ended', () => {
        controls.loop()
        controls.random()
    })



    playControll.addEventListener('click', () => {
        if (getConfig.currentMusic.directory === "") {
            getConfig.currentMusic.directory = getListMusic[0].directory
        }

        !getConfig.controls.play ? controls.onPlay() : controls.onPause()
    })

    // TRABALHAR MELHOR NISSO DEPOIS    

    document.addEventListener('keydown', event => {
        if (event.code == "Space") {
            if (!getConfig.controls.play) {
                controls.onPlay()
            } else {
                controls.onPause()
            }
        }
    })

    // back
    document.getElementById('button-back').addEventListener('click', controls.back)

    // skip
    document.getElementById('button-skip').addEventListener('click', () => {
        controls.skip()
    })

    progressBar.addEventListener('change', () => {
        controls.positionAudio(progressBar.value)
    })

    window.addEventListener('beforeunload', controls.onPause) // Pausar quando dar reload na página



 

    // Volume
    const nivelVolume = document.getElementById('nivel-volume')
    let volumeCounter = getConfig.controls.volume
    nivelVolume.style.height = `${volumeCounter}%`
    audioElement.volume = volumeCounter / 100

    const volume = {
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
            setItem('wmp-config', JSON.stringify(getConfig))
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

    document.addEventListener('keydown', event => {
        if (event.code == "NumpadAdd") {
            if (volumeCounter < 100) {
                volumeCounter = volumeCounter + 5
                volume.loadVolume()
            }
        }

        if (event.code == "NumpadSubtract") {
            if (volumeCounter > 0) {
                volumeCounter = volumeCounter - 5
                volume.loadVolume()
            }
        }
    })

} else {
    alert('Seu Navegador não suporta WebMP')
}


/*  
    Quando não estiver musica, pode estar com um url que não existe, então precisa verificar
*/