//konvertere valuta
function konverterPris(nok, index) {
    //index i array valuta
    const kurs = valuta[index].kurs
    const pris = nok / kurs
    return pris
}

$(function () {

})