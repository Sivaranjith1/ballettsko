const valuta = [{
        navn: 'Euro',
        kurs: 8,
        img: "img/valuta/euro.jpg"
    },
    {
        navn: 'NOK',
        kurs: 1,
        img: "img/valuta/nok.jpg"
    },
    {
        navn: 'USD',
        kurs: 6,
        img: "img/valuta/usa.jpg"
    },
    {
        navn: 'GBP',
        kurs: 9,
        img: "img/valuta/gb.jpg"
    },
    {
        navn: 'AUD',
        kurs: 7,
        img: "img/valuta/aud.jpg"
    },
]

//konvertere valuta
function konverterPris(nok, index) {
    //index i array valuta
    const kurs = valuta[index].kurs
    const pris = nok / kurs
    return pris
}