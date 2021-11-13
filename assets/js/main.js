

// (function() {
//     if (!localStorage.getItem('wmp-config')) {

//         let configPlayer = {
//             currentMusic: {
//                 titleMusic: '',
//                 currentTime: 0,
//             },
//             controls: {
//                 random: false,
//                 loop: false,
//             }
//         }

//     }
// })

console.log('❤️️')

// Abrir lista de músicas
const toggleBars = document.getElementById('toggle-bars')
// const closeList = document.getElementById('close-list')
const list = document.getElementById('list')
let stateList = false

function addList() {
    list.classList.add('on')
    stateList = true
}

function removeList() {
    list.classList.remove('on')
    stateList = false
}

toggleBars.addEventListener('click', addList)
// closeList.addEventListener('click', removeList)
document.addEventListener('keydown', event => {
    event.preventDefault()
    event.key == "Tab" && !stateList ? addList() : removeList()
})