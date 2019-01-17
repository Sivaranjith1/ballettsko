$(function () {
    $("#sidenavIndicator").on("click", function sidenavOpen() {
        $("#sidenav").animate({
            width: 'toggle'
        }, 350);
        $("#sidenavIndicator").toggle();
        $("#content").toggleClass("full shade");
        $("body").toggleClass("overflowHidden");

        sidenavContent("settings")
    });
    $("#content").on("click", function sidenavOpen() {
        if ($("#content").hasClass("full shade")) {
            $("#sidenavIndicator").toggle();
            $("#sidenav").animate({
                width: 'toggle'
            }, 350);
            $("body").toggleClass("overflowHidden");
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
const modal1 = document.querySelector('#modal1')

let prisIndex = 0

//kalling av functions
initModal()
leggTilsko()

//konvertere valuta
function konverterPris(nok, index) {
    //index i array valuta
    const kurs = valuta[index].kurs
    const pris = Math.round((nok / kurs) * 100) / 100
    return pris + ' ' + valuta[index].navn
}

//kall denne når man endrer valuta
function endreValuta(index) {
    //index til den nye valutaen i valuta arrayet
    prisIndex = index
    leggTilsko()
}

//legg til sko
function leggTilsko() {
    main.innerHTML = ''
    sko.forEach((elem, index) => {
        const pris = konverterPris(elem.pris, prisIndex)
        const objectFit = elem.objectFit ? `object-fit: ${elem.objectFit}` :
            ''
        main.innerHTML += `
        <div class = "character" data-index="${index}">
            <div class = "card-img">
            <img style="${objectFit}" src = "${elem.img}"
        alt = "SKO">
            <h2> ${elem.navn} </h2>
            <div class = "space"> 
            </div>
            <div id='cardBottom'><div id='pris'><div>${pris}</div></div>
            </div></div>
            `
    })

    skoEvt()
}

//legger til eventlistner på sko elementer
function skoEvt() {
    const skoElems = document.querySelectorAll('.character')
    skoElems.forEach(elem => elem.addEventListener('click', changeModal, false))
}

//opner modal
function changeModal(evt) {
    const target = evt.currentTarget
    console.log(target.id)

    const index = target.getAttribute('data-index')

    const content = modal1.querySelector('.modal-content')

    const {
        navn,
        pris,
        img
    } = sko[index]
    const objectFit = sko[index].objectFit ? `object-fit: ${sko[index].objectFit}` :
        ''

    const konPris = konverterPris(pris, prisIndex)

    content.innerHTML = `
        <h1 class="center">${navn}</h1>
        <div class="space"></div>
        <div class="flex">
            <div class="card-img">
               <img style = "${objectFit}"
               src = "${img}"
               alt = "SKO">
            </div>

            <div class="innhold">
            <div id="modalPris">
            ${konPris}
            </div>
            <br>
            <div id="kjøpOuter">
                <div id="kjøpInner">
                    Kjøp
                </div>
            </div>
            </div>
        </div>
    `

    openModal(modal1)
}