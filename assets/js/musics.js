
const musicList = document.getElementById('music-list')
const musicFolder = 'musics/'
const musicElements = [
    {
        nameMusic: "7 Rings",
        authorMusic: "Ariana Grande",
        directory: musicFolder + "ariana-grande-7-rings-lyrics-2854589.mp3"
    }, 
    {
        nameMusic: "Lonely",
        authorMusic: "Illenium ",
        directory: musicFolder + "illenium-lonely-feat-chandler-leighton-5001645.mp3"
    },
    {
        nameMusic: "O Sol (VINNE, Double MZK Remix)",
        authorMusic: "Vitor Kley",
        directory: musicFolder + "Vitor Kley - O Sol (VINNE, Double MZK Remix)_160k.mp3"
    },
    {
        nameMusic: "Look At Me",
        authorMusic: "XXXTENTACION",
        directory: musicFolder + "XXXTENTACION - Look At Me (Audio).mp3"
    }
]

musicElements.map(music => {
    let addInList = `
        <div class="music-item">
            <div class="directory-music" style="display: none;">${music.directory}</div>
            <div class="name-music">
                <h2>${music.nameMusic}</h2>
                <span>${music.authorMusic}</span>
            </div>
            <span class="material-icons">play_circle_filled</span>
        </div>
    `
    musicList.innerHTML += addInList
})


const musicItem = document.querySelectorAll('.music-item')
let audio = document.querySelector('audio')
let sourceAudio = document.querySelector('source')

musicItem.forEach(item => {
    item.addEventListener('click', () => {
        sourceAudio.src = item.querySelector('.directory-music').textContent
        audio.load()
        
        let displayNameMusic = document.querySelector('.music-details h2')
        let displayAuthorMusic = document.querySelector('.music-details span')

        displayNameMusic.innerHTML = item.querySelector('h2').textContent
        displayAuthorMusic.innerHTML = item.querySelector('span').textContent
    })
    
})