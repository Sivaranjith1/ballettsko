$(function () {
    $(document).on("click", function () {
        $("#sidenav").animate({
            width: 'toggle'
        }, 350);
        $('#content').toggleClass('full shade');
        sidenavContent("settings")

    });
    function sidenavContent(type) {
        if (type === "settings") {
            let content = "<div></div>"
            $("#sidenavContent").html(content);
        }
    }
});

const main = document.querySelector('main');

let prisIndex = 0

//kalling av functions
leggTilsko()

//konvertere valuta
function konverterPris(nok, index) {
    //index i array valuta
    const kurs = valuta[index].kurs
    const pris = Math.round((nok / kurs) * 100) / 100
    return pris + ' ' + valuta[index].navn
}

//legg til sko
function leggTilsko() {
    main.innerHTML = ''
    sko.forEach(elem => {
        const pris = konverterPris(elem.pris, prisIndex)
        const objectFit = elem.objectFit ? elem.objectFit : ''
        main.innerHTML += `
        <div class = "character">
            <div class = "card-img">
            <img style="object-fit: ${objectFit}" src = "${elem.img}"
        alt = "SKO">
            </div> <div class = "space"> </div> <div>
            <h2> ${elem.navn} </h2>
            <div class = "space"> 
            </div>
            <h2>${pris}</h2>
            </div></div>
            `
    })
}