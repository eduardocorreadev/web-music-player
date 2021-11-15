
console.log('❤️️')

// Abrir lista de músicas
const toggleBars = document.getElementById('toggle-bars')
// const closeList = document.getElementById('close-list')
const list = document.getElementById('list')
let stateList = false

function addList() {
    list.classList.add('on')
    toggleBars.classList.add('on')
    stateList = true
}

function removeList() {
    list.classList.remove('on')
    toggleBars.classList.remove('on')
    stateList = false
}

toggleBars.addEventListener('click', addList)
// closeList.addEventListener('click', removeList)
document.addEventListener('keydown', event => {
    event.preventDefault()
    event.key == "Tab" && !stateList ? addList() : removeList()
})




const wrapperElement = document.getElementById('wrapper')
let stateLeftMenu = false

document.getElementById('lyrics').addEventListener('click', () => {
    const contentLeftArea = document.getElementById('content-left-area')

    let letra = JSON.parse(localStorage.getItem('list-music'))

    let AddlyricsElement = `
    <div class="lyrics">
        <div class="container">
            <h2>
                Letra de :
                <span id="show-name-author"> Diz Pra mim - Malta</span>
            </h2>
        
            <div class="select-version">
                <button class="lyrics-original current-lyrics" type="button">Original</button>
                <button class="lyrics-translate" type="button">Tradução</button>
            </div>
        
            <div class="show-lyrics">
                <p>
                    ${letra[2].lyrics.original}
                </p>
            </div>
            <div class="copyright">
                <p>Letras por: <a href="https://www.vagalume.com.br/" target="_blank">Vagalumes.com</a></p>
            </div>
        </div>
    </div>`

    contentLeftArea.innerHTML = AddlyricsElement
    wrapperElement.classList.add('on-content-left')
    document.body.style.overflow = 'hidden' 
    stateLeftMenu = true
})

wrapperElement.addEventListener('click', () => {
    if (stateLeftMenu) {
        contentLeftArea.innerHTML = ''
        wrapperElement.classList.remove('on-content-left')
        document.body.style.overflow = 'visible' 
        stateLeftMenu = false
    }
})