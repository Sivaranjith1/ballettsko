//error div
const errorDiv = document.querySelector("#error");

const main = document.querySelector("main");
const modal1 = document.querySelector("#modal1");

//velger indexen til valuta i valuta array
let prisIndex = 0;
//handlekurv
let handlekurv = [];

//kalling av functions
initModal();
leggTilsko();
getCart();

let isSidenavOpen = false;
// $(document).on("pagecreate", "#content", function () {
//     $(document).on("swipeleft swiperight", "#content", function (e) {
//         // We check if there is no open panel on the page because otherwise
//         // a swipe to close the left panel would also open the right panel (and v.v.).
//         // We do this by checking the data that the framework stores on the page element (panel: open).
//         if ($(".ui-page-active").jqmData("panel") !== "open") {
//             // panel is closed
//             if (e.type === "swipeleft") {
//                 $("#right-panel").panel("open");
//             } else if (e.type === "swiperight") {
//                 $("#left-panel").panel("open");
//             }
//         }
//     });
// });
function sidenavOpen() {
  $("#sidenav").animate(
    {
      width: "toggle"
    },
    350
  );
  $("#sidenavIndicator").toggle();
  $("#content").toggleClass("full shade");
  isSidenavOpen = true;
  $("body").toggleClass("overflowHidden");

  sidenavContent("settings");

  closeModal(modal1);
}

function sidenavContent(type) {
  let content = `
                <div id="sidenavBanner" class="sidenavContent">
                    <h3>Handlekurv <i class="fas fa-shopping-cart"></i></h3>
                </div>
                <div id="sidenavBody" class="sidenavContent">
        
                </div>
                <div id="sidenavBtn" class="sidenavContent">
                <div id="kjopKnapp" class="disabled">Kjøp</div>
                </div>
                <div id="sidenavFooter" class="sidenavContent">
                    <h3>Endre valuta</h3>
                    <div id="valutaContainer"></div>
                </div>`;

  $("#sidenav").html(content);
  let valutaContainer = document.getElementById("valutaContainer");
  valutaContainer.className = "flexWrap";
  valutaContainer.style.flexWrap = "nowrap";
  valuta.forEach((e, i) => {
    let option = document.createElement("div");
    option.id = i;
    option.style.cursor = "pointer";
    option.addEventListener("click", e => {
      endreValuta(i);
    });
    option.innerHTML = `<br>${e.navn}<img src=${e.img}>`;
    valutaContainer.appendChild(option);
  });
  leggTilHandlekurv();
}

function sidenavClose() {
  if ($("#content").hasClass("full shade")) {
    $("#sidenavIndicator").toggle();
    $("#sidenav").animate(
      {
        width: "toggle"
      },
      350
    );
    isSidenavOpen = false;
    $("body").toggleClass("overflowHidden");
    $("#content").toggleClass("full shade");
  }
}

$(function() {
  $("#sidenavIndicator").on("click", sidenavOpen);
  $("#content").on("click", sidenavClose);
});

//lukke sidenav når man swiper
const sidenav = document.querySelector("#sidenav");
let swipeX;
sidenav.addEventListener("touchstart", evt => {
  const x = evt.touches[0].clientX;
  swipeX = x;
});
sidenav.addEventListener("touchmove", evt => {
  const x = evt.touches[0].clientX;
  if (swipeX - 50 > x) {
    sidenavClose();
  }
});

//konvertere valuta
function konverterPris(nok, index) {
  //index i array valuta
  const kurs = valuta[index].kurs;
  const pris = Math.round((nok / kurs) * 100) / 100;
  return pris + " " + valuta[index].navn;
}

//konvertere valuta bare tell
function konverterPrisTall(nok, index) {
  const kurs = valuta[index].kurs;
  const pris = Math.round((nok / kurs) * 100) / 100;
  return pris;
}

//kall denne når man endrer valuta
function endreValuta(index) {
  //index til den nye valutaen i valuta arrayet
  prisIndex = index;
  leggTilsko();
  endreHandlekurvValuta();
  leggTilHandlekurv();
}

//endrer valuta i handlekurv
function endreHandlekurvValuta() {
  handlekurv.forEach(e => {
    e.price = konverterPrisTall(sko[e.index].pris, prisIndex);
  });
}

//legg til sko
function leggTilsko() {
  main.innerHTML = "";
  sko.forEach((elem, index) => {
    const pris = konverterPris(elem.pris, prisIndex);
    const objectFit = elem.objectFit ? `object-fit: ${elem.objectFit}` : "";
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
            `;
  });

  skoEvt();
}

//legger til eventlistner på sko elementer
function skoEvt() {
  const skoElems = document.querySelectorAll(".character");
  skoElems.forEach(elem => elem.addEventListener("click", changeModal, false));
}

//opner modal
function changeModal(evt) {
  if (isSidenavOpen) return;
  const target = evt.currentTarget;

  const index = target.getAttribute("data-index");

  const content = modal1.querySelector(".modal-content");

  const { navn, pris, img, size } = sko[index];
  const objectFit = sko[index].objectFit
    ? `object-fit: ${sko[index].objectFit}`
    : "";

  const konPris = konverterPris(pris, prisIndex);

  const storrelse = size
    .map(
      elem =>
        `<input  data-storrelse="${elem}" id="stor${elem}" class="storrelse" type="radio" name="stor"><label for="stor${elem}" class="storrelseLabel" data-storrelse="${elem}">${elem}</label>`
    )
    .join(" ");

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
    `;

  document
    .querySelectorAll(".changeAntall")
    .forEach(elem => elem.addEventListener("click", changeAntall, false));

  document
    .querySelector("#leggTil")
    .addEventListener("click", addToCart, false);

  openModal(modal1);
}

//øker eller minker antall
function changeAntall(evt) {
  const type = evt.target.getAttribute("data-type");
  const antall = document.querySelector("#antall");
  let nyVerdi;

  if (type === "+") {
    nyVerdi = Number(antall.value) + 1;
  } else {
    nyVerdi = Number(antall.value) - 1;
  }

  if (nyVerdi <= 0) return;
  if (nyVerdi > 16) return;

  antall.value = nyVerdi;
}

//legger til handlekurven
function addToCart(evt) {
  const storrelse = document.querySelector(".storrelse:checked");
  const antall = Number(document.querySelector("#antall").value);
  const index = evt.target.getAttribute("data-index");
  const valgtSko = sko[index];

  if (storrelse === null) {
    error("Du må velge størrelse");
    return;
  }

  if (antall <= 0) {
    error("Antall må være større enn null");
    return;
  }
  if (antall > 16) {
    error("Antall må være mindre enn 16");
    return;
  }

  const valgtStor = storrelse.getAttribute("data-storrelse");

  //finner
  const find = handlekurv.find(elem => elem.index === index);
  if (find) {
    const findProducts = find.products;

    const findSize = findProducts.find(elem => elem.size === valgtStor);
    if (findSize) {
      findSize.amount += antall;
    } else {
      findProducts.push({
        size: valgtStor,
        amount: antall
      });
    }
  } else {
    let product = {
      index: index,
      name: valgtSko.navn,
      price: Number(valgtSko.pris),
      products: [
        {
          size: valgtStor,
          amount: antall
        }
      ]
    };
    handlekurv.push(product);
  }

  saveCart();
  leggTilHandlekurv();
  onHandleKurv();
}

function onHandleKurv() {
  //kjører når handlekurven endres
  closeModal(modal1);

  sidenavOpen();
}

//legger til Handlekurv
function leggTilHandlekurv() {
  buyBtn();
  sidenavBody = document.querySelector("#sidenavBody");
  sidenavBody.innerHTML = "";
  const pris = handlekurvPriser();

  handlekurv.forEach((elem, i) => {
    const { products } = elem;

    const productField = products
      .map(
        elm => `
      <div class="product">
      <div class="product-elem">Str: ${elm.size}</div>
      <div class="product-elem">Antall: ${elm.amount}</div>
      </div>
      `
      )
      .join(" ");

    const selSko = sko[elem.index];
    sidenavBody.innerHTML += `
            <div class="cartContent">
            <div class="flex" style="flex-wrap: nowrap;">
                <i class="fas fa-trash" data-index="${i}"></i>
                <h2 class="center text-ellipsis weight jc-around">
                ${elem.name}</h2>
            </div>
            <div class="flex">
                <div class = "card-img" style="height: auto;">
                    <img src="${selSko.img}" style="object-fit: contain;">
                </div>
                <div class="innhold">
                    <p class="padding1">pris: ${pris[i].price} ${
      valuta[prisIndex].navn
    }</p>
                    ${productField}
                </div>
            </div>
            </div>
        `;
  });

  document
    .querySelectorAll(".fa-trash")
    .forEach(tr => tr.addEventListener("click", trash, false));
}

//sletter fra handlekurven
function trash(evt) {
  const index = evt.target.getAttribute("data-index");
  handlekurv.splice(index, 1);

  saveCart();
  leggTilHandlekurv();
}

//regner totalprisen for handlekurven
function handlekurvTotal() {
  let total = 0;
  handlekurv.forEach(e => {
    e.products.forEach(ev => {
      total += e.price * ev.amount;
    });
  });
  return total;
}

//prisen for hvert element i handlekurven
function handlekurvPriser() {
  let prisArray = [];
  handlekurv.forEach(e => {
    let productTotal = 0;
    e.products.forEach(ev => {
      productTotal += e.price * ev.amount;
    });
    let tempProduct = {
      navn: e.name,
      price: productTotal
    };
    prisArray.push(tempProduct);
  });
  return prisArray;
}

//lagrer handlekurven
function saveCart() {
  localStorage.setItem("handlekurv", JSON.stringify(handlekurv));
}

//henter handlekurven
function getCart() {
  const tempCart = localStorage.getItem("handlekurv");
  if (tempCart) {
    handlekurv = JSON.parse(tempCart);
  }
}

//sender errormelding
function error(msg) {
  errorDiv.innerHTML = msg;

  errorDiv.classList.add("showError");

  setTimeout(() => {
    errorDiv.classList.remove("showError");
  }, 4000);
}

//kjøp knappen
function buyBtn() {
  const kjopKnapp = document.querySelector("#kjopKnapp");
  if (handlekurv.length === 0) {
    disableBuy(kjopKnapp);
  } else {
    enableBuy(kjopKnapp);
  }
}

//setter på disabled
function disableBuy(btn) {
  btn.classList.add("disabled");

  btn.removeEventListener("click", buy, false);
}

//fjerner disabled
function enableBuy(btn) {
  try {
    btn.classList.remove("disabled");
    btn.addEventListener("click", buy, false);
  } catch (err) {
    return;
  }
}

//når kjøpknappen trykkes
function buy() {
  console.log("buy");
  sidenavClose();
  openModal(modal1);
}
