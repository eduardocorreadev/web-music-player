if (typeof (Storage) !== 'undefined') {
    const audioElement = document.querySelector('audio') // Audio Element
    const sourceAudio = document.querySelector('source') // Source Element

    const timerScreen = document.getElementById('time-music')

    const playControll = document.getElementById('play-controll') // Play and Pause Button
    const progressBar = document.getElementById('progress-bar') // Progress bar Element
    const playIcons = ['pause_circle', 'play_circle_filled'] // Icons (Play and Pause)

    const loopControll = document.getElementById('loop-controll') // Loop
    const randomControll = document.getElementById('random-controll') // Random

    let musicTimer; // Timer for setInterval

    function setItem(key, value) {
        localStorage.setItem(key, value)
    }

    function getItem(key) {
        return localStorage.getItem(key)
    }

    if (!getItem('wmp-config')) {
        const addConfig = { currentMusic: { directory: "", time: 0, }, controls: { play: false, volume: 100, random: false, loop: false } }

        setItem('wmp-config', JSON.stringify(addConfig))
    }

    const time = {
        converter(time) {
            let m = Math.floor(time / 60)
            let s = time - m * 60

            return `${m.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${s.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`
        },
        display() {
            timerScreen.innerHTML = `${this.converter(Math.floor(audioElement.currentTime))} | ${this.converter(Math.floor(audioElement.duration))}`
        }
    }

    const getConfig = JSON.parse(getItem('wmp-config'))  // Config in LocalStorage
    const getListMusic = JSON.parse(getItem('list-music')) // List Music in LocalStorage

    function loadMusic() {
        const imageMusic = document.getElementById('image-music') // Music Image Element
        const nameMusic = document.getElementById('name-music') // Music Name Element
        const authorMusic = document.getElementById('author-music') // Music Author Element

        if (!getConfig.currentMusic.directory == "") { // se for vazio quer dizer que não existe música
            for (let prop in getListMusic) {
                if (getListMusic[prop].directory == getConfig.currentMusic.directory) {
                    sourceAudio.src = getListMusic[prop].directory // Adicionar música ao source

                    audioElement.currentTime = getConfig.currentMusic.time // Adicionar Momento onde a música parou
                    audioElement.load() // Carregar Música

                    // progressBar.max = audioElement.duration
                    // progressBar.value = getConfig.currentMusic.time

                    imageMusic.src = getListMusic[prop].image // Adicionar Imagem ao card
                    nameMusic.innerHTML = getListMusic[prop].nameMusic // Adicionar nome da Música
                    authorMusic.innerHTML = getListMusic[prop].authorMusic // Adicionar nome do author

                    loopControll.style.color = getConfig.controls.loop ? 'var(--Green)' : 'var(--Foreground)' // Carregar cor do botão
                    randomControll.style.color = getConfig.controls.random ? 'var(--Green)' : 'var(--Foreground)' // Carregar cor do botão

                    document.querySelectorAll('.music-item').forEach(item => {
                        if (getConfig.currentMusic.directory === item.firstElementChild.textContent) {
                            item.classList.add('item-selected')
                        } else {
                            item.classList.remove('item-selected')
                        }
                    });

                    break
                }
            }
        } else {
            nameMusic.innerHTML = "Nada sendo tocado no momento"
            authorMusic.innerHTML = "Nada sendo tocado no momento"
        }
    }


    loadMusic()

    const controls = {
        onPlay() {

            audioElement.play() // Iniciar o áudio
            playControll.innerHTML = playIcons[0] // Alterar icone
            this.updateProgressBar()

            getConfig.controls.play = true // Alterar o estado do play para true lá no localstorage
            setItem('wmp-config', JSON.stringify(getConfig)) // Adicionando ao localstorage a atualização
        },
        onPause() {
            audioElement.pause() // Pausar o áudio
            playControll.innerHTML = playIcons[1] // Alterar o icone
            clearInterval(musicTimer) // Limpando interval do this.updateProgressBar

            getConfig.controls.play = false // Alterar o estado do play para true lá no localstorage
            setItem('wmp-config', JSON.stringify(getConfig)) // Adicionando ao localstorage a atualização
        },
        back() {
            if (progressBar.value > 10) {
                audioElement.currentTime = 0
            } else {
                for (let prop in getListMusic) {
                    if (getListMusic[prop].directory == getConfig.currentMusic.directory) {

                        var valueList = prop === '0' ? getListMusic.length - 1 : valueList = --prop

                        getConfig.currentMusic.directory = getListMusic[valueList].directory
                        setItem('wmp-config', JSON.stringify(getConfig))

                        loadMusic()
                        controls.onPlay()
                        break
                    }
                }
            }
        },
        skip() {
            if (!getConfig.controls.random) {
                for (let prop in getListMusic) {
                    if (getListMusic[prop].directory == getConfig.currentMusic.directory) {

                        if (prop >= getListMusic.length - 1) {
                            prop = 0
                        } else {
                            ++prop
                        }

                        getConfig.currentMusic.directory = getListMusic[prop].directory

                        loadMusic()
                        controls.onPlay()
                        break
                    }
                }
            } else {
                controls.random()
            }

            setItem('wmp-config', JSON.stringify(getConfig))

        },
        loop() {
            this.onPlay()
        },
        random() {
            let countListMusic = Math.floor(Math.random() * (getListMusic.length - 0) + 0)

            getConfig.currentMusic.directory = getListMusic[countListMusic].directory
            loadMusic()

            this.onPlay()
        },
        changeState(prop) {
            getConfig.controls[`${prop}`] = !getConfig.controls[`${prop}`]
            setItem('wmp-config', JSON.stringify(getConfig))
        },
        updateProgressBar() {
            musicTimer = setInterval(() => {
                progressBar.max = audioElement.duration
                progressBar.value = audioElement.currentTime
            }, 1000);
        },
        positionAudio(value) {
            audioElement.currentTime = value
        }
    }


    /* PLAY NEW MUSIC */
    document.querySelectorAll('.music-item').forEach(item => {
        item.addEventListener('click', () => {
            getConfig.currentMusic.directory = item.querySelector('.directory-music').textContent
            loadMusic()
            controls.onPlay()
        })
    })

    /* PLAY AND PAUSE (Click and Keyboard)*/
    playControll.addEventListener('click', () => {
        if (getConfig.currentMusic.directory === "") {
            getConfig.currentMusic.directory = getListMusic[0].directory
            loadMusic()
        }

        !getConfig.controls.play ? controls.onPlay() : controls.onPause()
    })

    document.addEventListener('keydown', event => {
        if (event.code == "Space") {
            if (!getConfig.controls.play) {
                controls.onPlay()
            } else {
                controls.onPause()
            }
        }
    })

    /* SKIP AND BACK */
    document.getElementById('button-back').addEventListener('click', controls.back) // Back
    document.getElementById('button-skip').addEventListener('click', controls.skip) // Skip

    // LOOP AND RANDOM
    loopControll.addEventListener('click', () => {
        if (!getConfig.controls.loop) {
            loopControll.style.color = 'var(--Green)'
        } else {
            loopControll.style.color = 'var(--Foreground)'
        }

        controls.changeState('loop')
    })

    randomControll.addEventListener('click', () => {
        if (!getConfig.controls.random) {
            randomControll.style.color = 'var(--Green)'
        } else {
            randomControll.style.color = 'var(--Foreground)'

        }

        controls.changeState('random')
    })


    audioElement.addEventListener('ended', () => {
        !getConfig.controls.loop ? controls.skip() : controls.loop()
    })

    progressBar.addEventListener('change', () => {
        controls.positionAudio(progressBar.value)
    })

    window.addEventListener('beforeunload', () => { // Pausar quando dar reload na página
        getConfig.currentMusic.time = Math.floor(audioElement.currentTime) // Enviando o tempo atual para o localstorage
        controls.onPause() // E por conta dessa função, ele já irá enviar a atualização
    })


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
        },
        addVolume() {
            if (volumeCounter < 100) {
                volumeCounter = volumeCounter + 5
                volume.loadVolume()
            }
        },
        removeVolume() {
            if (volumeCounter > 0) {
                volumeCounter = volumeCounter - 5
                volume.loadVolume()
            }
        }
    }

    document.getElementById('add-volume').addEventListener('click', () => {
        volume.addVolume()
    })

    document.getElementById('remove-volume').addEventListener('click', () => {
        volume.removeVolume()
    })

    document.addEventListener('keydown', event => {
        if (event.code == "NumpadAdd") {
            volume.addVolume()
        }

        if (event.code == "NumpadSubtract") {
            volume.removeVolume()
        }
    })

} else {
    alert('Seu Navegador não suporta WebMP')
}


/*
    Fazer tudo que envolva o tempo do áudio
*/