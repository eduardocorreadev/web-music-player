window.onload = function() {
    let listMusic = JSON.parse(localStorage.getItem('list-music'))

    for (let item in listMusic) {
        let xml = new XMLHttpRequest()

        if (listMusic[item].lyrics.original == '' && listMusic[item].lyrics.translate == '') {
            let urlVagalume = `https://api.vagalume.com.br/search.php?art=${listMusic[item].authorMusic}&mus=${listMusic[item].nameMusic}`

            xml.open('GET', urlVagalume, true)
            xml.send(null)

            xml.onload = function(e) {
                if (xml.readyState == 4 && (xml.status >= 200 && xml.status < 400)) {
                    let resultLyrics = JSON.parse(xml.responseText)

                    listMusic[item].lyrics.original = resultLyrics.mus[0].text || ''
                    listMusic[item].lyrics.translate = resultLyrics.mus[0].translate[0].text || ''
                    localStorage.setItem('list-music', JSON.stringify(listMusic))
                }
            }

        }
    }
}