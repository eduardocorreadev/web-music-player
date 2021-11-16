const wrapperElement = document.getElementById('wrapper')
const displayContainer = document.getElementById('display-container')

const toggleBars = document.getElementById('toggle-bars')
const btnAddLyrics = document.getElementById('add-lyrics')

const listMusic = document.getElementById('list')
const lyrics = document.getElementById('lyrics')

let stateLeftMenu = false

const leftMenu = {
    addLeftMenu() {
        displayContainer.style.left = '0px'
        wrapperElement.classList.add('on-content-left')
        stateLeftMenu = true
    },
    removeLeftMenu() {
        displayContainer.style.left = '-500px'
        wrapperElement.classList.remove('on-content-left')
        stateLeftMenu = false

        setTimeout(() => {
            listMusic.style.display = 'none'
            lyrics.style.display = 'none'
        }, 100);
    }
}

toggleBars.addEventListener('click', () => {
    listMusic.style.display = 'block'
    leftMenu.addLeftMenu()
})

btnAddLyrics.addEventListener('click', () => {
    lyrics.style.display = 'block'
    leftMenu.addLeftMenu()

    let nameAndAuthor = document.getElementById('show-name-author')
    let lyricsOriginalVersion = document.getElementById('show-lyrics-original')
    let lyricsTranslateVersion = document.getElementById('show-lyrics-translate')

    let getConfig = JSON.parse(localStorage.getItem('wmp-config'))
    let directoryCurrentMusic = getConfig.currentMusic.directory

    let getListMusics = JSON.parse(localStorage.getItem('list-music'))

    if (!directoryCurrentMusic == "") {

        for (let prop in getListMusics) {
            if (getListMusics[prop].directory == directoryCurrentMusic) {
                nameAndAuthor.innerHTML = `${getListMusics[prop].nameMusic} - ${getListMusics[prop].authorMusic}`

                lyricsOriginalVersion.innerHTML = getListMusics[prop].lyrics.original !== "" ? getListMusics[prop].lyrics.original : "Letra não disponível nesta versão"
                lyricsTranslateVersion.innerHTML = getListMusics[prop].lyrics.translate !== "" ? getListMusics[prop].lyrics.translate : "Letra não disponível nesta versão"
                break
            }
        }

    } else {
        nameAndAuthor.innerHTML = 'Nada sendo tocado!'
        lyricsOriginalVersion.innerHTML = 'Nada sendo tocado!'
        lyricsTranslateVersion.innerHTML = 'Nada sendo tocado!'
    }


    let btnVersionOriginal = document.querySelector('.select-version .lyrics-original')
    let btnVersionTranslate = document.querySelector('.select-version .lyrics-translate')

    function classListMod(elem1, elem2) {
        elem1.classList.add('current-lyrics')
        elem2.classList.remove('current-lyrics')
    }

    btnVersionOriginal.addEventListener('click', () => {
        classListMod(btnVersionOriginal, btnVersionTranslate)

        lyricsOriginalVersion.style.display = 'block'
        lyricsTranslateVersion.style.display = 'none'
    })

    btnVersionTranslate.addEventListener('click', () => {
        classListMod(btnVersionTranslate, btnVersionOriginal)

        lyricsOriginalVersion.style.display = 'none'
        lyricsTranslateVersion.style.display = 'block'
    })

})

wrapperElement.addEventListener('click', event => {
    if (event.target !== toggleBars && event.target !== btnAddLyrics && stateLeftMenu) {
        leftMenu.removeLeftMenu()
    }
})

document.addEventListener('keydown', event => {
        if (event.key == "Escape" && stateLeftMenu) {
            leftMenu.removeLeftMenu()
        }
})
