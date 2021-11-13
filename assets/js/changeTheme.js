

const selectTheme = document.querySelectorAll('#select-theme div')
const colors = 
[
'radial-gradient(rgb(255, 0, 51, 0.8), #000000);', 
'radial-gradient(rgba(0, 124, 41, 0.8), #000000);', 
'radial-gradient(rgba(0, 90, 163, 0.8), #000000);'
]

function setLocal(name, value) {
    localStorage.setItem(name, value)
}

function getLocal(name) {
    return localStorage.getItem(name)
}

selectTheme.forEach(theme => {

    theme.addEventListener('click', () => {

        document.querySelector('.selected').classList.remove('selected')

        theme.classList.add('selected')


        setLocal('theme-config', colors[1])
        console.log(theme)

        document.body.style.background = colors[1]

    })
})


