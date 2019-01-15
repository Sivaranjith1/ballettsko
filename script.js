$(function () {
    $("#sidenavIndicator").on("click", function sidenavOpen() {
        $("#sidenav").animate({
            width: 'toggle'
        }, 350);
        $("#sidenavIndicator").toggle();
        $("#content").toggleClass("full shade");

        sidenavContent("settings")
    });
    $("#content").on("click", function sidenavOpen() {
        if ($("#content").hasClass("full shade")) {
            $("#sidenavIndicator").toggle();
            $("#sidenav").animate({
                width: 'toggle'
            }, 350);

            $('#content').toggleClass('full shade');
        }
    });
    function sidenavContent(type) {
        if (type === "settings") {
            let content = "<div>Ludvig er homo</div>"
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
            <h2> ${elem.navn} </h2>
            <div class = "space"> 
            </div>
            <div id='cardBottom'><div id='pris'><div>${pris}</div></div><div id='kjøp'><div>Kjøp</div></div></div>
            </div></div>
            `
    })
}