const audioElement = document.querySelector('audio')

const playControll = document.querySelector('.play-controll')

const musicArea = document.getElementById('music-area')

console.log(audioElement)

playControll.addEventListener('click', event => {
    audioElement.play()
    musicArea.classList.add('on')
}) 