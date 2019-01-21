//error div
const errorDiv = document.querySelector('#error')

//handlekurv
let handlekurv = [{
    name: 'sko1',
    price: 1200,
    products: [{
        size: 37,
        amount: 7
    },
    {
        size: 50,
        amount: 8
    },
    ]
},
{
    name: 'sko2',
    price: 1200,
    products: [{
        storrelse: 37,
        amount: 5
    },
    {
        storrelse: 50,
        amount: 1
    },
    ]
},
{
    name: 'sko3',
    price: 1200,
    products: [{
        size: 37,
        amount: 6
    },
    {
        size: 50,
        amount: 2
    },
    ]
}]

console.log(handlekurvPriser())

function handlekurvPriser() {
    let prisArray = [];
    handlekurv.forEach((e) => {
        let productTotal = 0;
        e.products.forEach((ev) => {
            productTotal += e.price * ev.amount;
        })
        let tempProduct = {
            navn: e.name,
            price: productTotal
        }
        prisArray.push(tempProduct);
    })
    return prisArray;
}

function handlekurvTotal() {
    let total = 0;
    handlekurv.forEach((e) => {
        e.products.forEach((ev) => {
            total += e.price * ev.amount;
        })
    })
    return total;
}
handlekurvTotal();

let isSidenavOpen = false
$(function () {
    $(window).on("swipe", function (e) { alert() })

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
        let content = `
                <div id="sidenavBanner" class="sidenavContent">
                    <h3>Handlekurv <i class="fas fa-shopping-cart"></i></h3>
                </div>
                <div id="sidenavBody" class="sidenavContent">
        
                </div>
                <div id="sidenavFooter" class="sidenavContent">
                    <h3>Endre valuta</h3>
                    <div id="valutaContainer"></div>
                </div>`
        $("#sidenav").html(content);
        let valutaContainer = document.getElementById("valutaContainer");
        valutaContainer.className = "flexWrap";
        valutaContainer.style.flexWrap = "nowrap";
        valuta.forEach((e, i) => {
            let option = document.createElement("div");
            option.id = i;
            option.addEventListener("click", (e) => {
                endreValuta(i);
            })
            option.innerHTML = `<br>${e.navn}<img src=${e.img}>`;
            valutaContainer.appendChild(option);
        })
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
        img,
        size
    } = sko[index]
    const objectFit = sko[index].objectFit ? `object-fit: ${sko[index].objectFit}` :
        ''

    const konPris = konverterPris(pris, prisIndex)

    const storrelse = size.map(elem =>
        `<input id="stor${elem}" class="storrelse" type="radio" name="stor"><label for="stor${elem}" class="storrelseLabel" data-storrelse="${elem}">${elem}</label>`
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

            <div id="leggTil" class="storrelseBtn" data-index="${index}">Legg til i handlekurv</div>
            </div>
        </div>
    `

    document.querySelectorAll('.changeAntall').forEach(elem => elem.addEventListener('click', changeAntall, false))

    document.querySelector('#leggTil').addEventListener('click', addToCart, false)

    openModal(modal1)
}

//øker eller minker antall
function changeAntall(evt) {
    const type = evt.target.getAttribute('data-type')
    const antall = document.querySelector('#antall')
    let nyVerdi

    if (type === '+') {
        nyVerdi = Number(antall.value) + 1
    } else {
        nyVerdi = Number(antall.value) - 1
    }

    if (nyVerdi <= 0) return
    if (nyVerdi > 16) return

    antall.value = nyVerdi

}

//legger til handlekurven
function addToCart(evt) {
    const storrelse = document.querySelector('.storrelse:checked')
    const antall = document.querySelector('#antall').value

    if (storrelse === null) {
        error('Du må velge størrelse')
        return
    }

    if (antall <= 0) {
        error('Antall må være større enn null')
        return
    }
    if (antall > 16) {
        error('Antall må være mindre enn 16')
        return
    }
}

//sender errormelding
function error(msg) {
    errorDiv.innerHTML = msg

    errorDiv.classList.add('showError')

    setTimeout(() => {
        errorDiv.classList.remove('showError')
    }, 4000)
}