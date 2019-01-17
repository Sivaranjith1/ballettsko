let isSidenavOpen = false
$(function () {
    $("#sidenavIndicator").on("click", function sidenavOpen() {
        $("#sidenav").animate({
            width: 'toggle'
        }, 350);
        $("#sidenavIndicator").toggle();
        $("#content").toggleClass("full shade");
        isSidenavOpen = true
        $("body").toggleClass("overflowHidden");

        sidenavContent("settings")
    });
    $("#content").on("click", function sidenavOpen() {
        if ($("#content").hasClass("full shade")) {
            $("#sidenavIndicator").toggle();
            $("#sidenav").animate({
                width: 'toggle'
            }, 350);

            isSidenavOpen = false
            $("body").toggleClass("overflowHidden");
            $('#content').toggleClass('full shade');
        }
    });

    function sidenavContent(type) {
        if (type === "settings") {
            let content = `
                <div id="sidenavBanner" class="sidenavContent">
                    <h3>Handlekurv</h3>
                </div>
                <div id="sidenavBody" class="sidenavContent">
        
                </div>
                <div id="sidenavFooter" class="sidenavContent">
                    <h3>Endre valuta</h3>
                </div>`
            $("#sidenav").html(content);
        }
        if (type === "purchase") {

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
    if (isSidenavOpen) return;
    const target = evt.currentTarget

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

    const storrelse = size.map(elem =>
        `<input id="stor${elem}" class="storrelse" type="radio" name="stor"><label for="stor${elem}" class="storrelseLabel">${elem}</label>`
    ).join(' ')

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

            <div class="mellom">
            <h2 class = "mellomText"> Størrelse </h2>
                <div class="flexWrap">${storrelse}</div>
            </div>

            <div class="mellom">
                <h2 class="mellomText">Antall</h2>
                <div class = "flexWrap jc-center">
                    <div class="storrelseBtn changeAntall" data-type="-">-</div>
                    <input type="number" min="1" max="12" id="antall" value="1"/>
                    <div class = "storrelseBtn changeAntall" data-type = "+"> + </div>
                </div>
            </div>

            <div id="leggTil" class="storrelseBtn">Legg til i handlekurv</div>
            </div>
        </div>
    `

    document.querySelectorAll('.changeAntall').forEach(elem => elem.addEventListener('click', changeAntall, false))

    openModal(modal1)
}

function changeAntall(evt) {


}