const musicList = document.getElementById('music-list')
const musicFolder = 'musics/'
const musicElements = [
    {
        nameMusic: "Diz Pra Mim",
        authorMusic: "Malta",
        directory: musicFolder + "ariana-grande-7-rings-lyrics-2854589.mp3",
        image: '',
        lyrics: {
            original: '',
            translate: ''
        }
    }, 
    {
        nameMusic: "Lonely",
        authorMusic: "Illenium",
        directory: musicFolder + "illenium-lonely-feat-chandler-leighton-5001645.mp3",
        image: '',
        lyrics: {
            original: '',
            translate: ''
        }
    },
    {
        nameMusic: "O Sol (VINNE, Double MZK Remix)",
        authorMusic: "Vitor Kley",
        directory: musicFolder + "Vitor Kley - O Sol (VINNE, Double MZK Remix)_160k.mp3",
        image: '',
        lyrics: {
            original: '',
            translate: ''
        }
    },
    {
        nameMusic: "Look At Me",
        authorMusic: "XXXTENTACION",
        directory: musicFolder + "XXXTENTACION - Look At Me (Audio).mp3",
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Xxxtentacion_%28cropped%29.jpg',
        lyrics: {
            original: '',
            translate: ''
        }
    }
]

localStorage.setItem('list-music', JSON.stringify(musicElements))

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