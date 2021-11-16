const musicList = document.getElementById('music-list')
const musicFolder = 'musics/'
const musicElements = [
    {
        nameMusic: "7 Rings",
        authorMusic: "Ariana Grande",
        directory: musicFolder + "ariana-grande-7-rings-lyrics-2854589.mp3",
        image: 'https://s2.glbimg.com/zLApA2DHgeeRIDvqcEW0AiAw5U8=/640x413/smart/e.glbimg.com/og/ed/f/original/2019/01/18/ariana_grande_3.jpg',
        lyrics: {
            original: '',
            translate: ''
        }
    }, 
    {
        nameMusic: "Lonely",
        authorMusic: "Illenium",
        directory: musicFolder + "illenium-lonely-feat-chandler-leighton-5001645.mp3",
        image: 'https://aimg.vibbidi-vid.com/vibbidi-images/tracks/img_219BC07D366749F3B66188D5F79EE775.2019.08.27.10.26.08.jpg',
        lyrics: {
            original: '',
            translate: ''
        }
    },
    {
        nameMusic: "O Sol (VINNE, Double MZK Remix)",
        authorMusic: "Vitor Kley",
        directory: musicFolder + "Vitor Kley - O Sol (VINNE, Double MZK Remix)_160k.mp3",
        image: 'https://www.hojeemdia.com.br/polopoly_fs/1.702224.1596149878!/image/image.jpg_gen/derivatives/landscape_653/image.jpg',
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
    },
    {
        nameMusic: "Let You Down",
        authorMusic: "The Material",
        directory: musicFolder + "the-material-let-you-down-music-video-3560522.mp3",
        image: 'https://cdns-images.dzcdn.net/images/cover/0cb55964628849bcf9176f70480879bb/350x350.jpg',
        lyrics: {
            original: '',
            translate: ''
        }
    },
    {
        nameMusic: "Someone To You",
        authorMusic: "BANNERS",
        directory: musicFolder + "BANNERS - Someone To You.mp3",
        image: 'https://e.snmc.io/i/1200/s/b3b9b3cd6eb522220cd78a6cd71dc1da/8349650',
        lyrics: {
            original: '',
            translate: ''
        }
    },
    {
        nameMusic: "Afterlife feat. Echos",
        authorMusic: "Illenium",
        directory: musicFolder + "Illenium - Afterlife feat. Echos.mp3",
        image: 'https://i1.sndcdn.com/artworks-000142763435-p431rj-t500x500.jpg',
        lyrics: {
            original: '',
            translate: ''
        }
    },
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
            <span class="time-music">04:00</span>
        </div>
    `
    musicList.innerHTML += addInList
})