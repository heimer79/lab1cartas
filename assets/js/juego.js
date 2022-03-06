/* 
 * 2C = two of clubs (Tréboles)
 * 2D = two of Diamonds (Tréboles)
 * 2H = two of Heartss (Tréboles)
 * 2S = two of Spades (Tréboles) */



let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = [ 'A', 'J', 'Q', 'K' ];


let puntosJugador = 0,
    puntosComputadora = 0


// Referencias del HTML
const btnPedir = document.querySelector( '#btn-pedir' ); 
const puntosHTML = document.querySelectorAll( 'small')

// esta funciion crea una nuena baraja
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {

        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }

    // console.log(JSON.stringify(deck))

    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);


}

crearDeck();

// Esta funcion me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck'; //throw sirve para mostrar el error
    }

    const carta = deck.pop();

    // console.log(deck)
    // console.log(carta) // debe ser de la baraja
    return carta;
}

// deck = [];
// pedirCarta();


const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        puntos = parseInt(valor, 10)

    // EL siguiente codigo es muy largo el anterior con el ternario resume mas 
    // let puntos = 0;
    /* console.log({ valor });
    // 2 =2  10 = 10, 3 = 3
    if (isNaN(valor)) {
        // console.log('No es un numero')
        puntos = (valor === 'A') ? 11 : 10; // evaluar las carta que empiezan con letras el as vale 11 y los demas 10 
    } else {
        // console.log('Es un numero')
        //puntos = valor * 1; // como estas son numeros entonces convierte el string multiplicando por uno
        puntos = parseInt(valor, 10) // usando el metodo parseInt
    }

    console.log(puntos) */
}


valorCarta( pedirCarta() );


// eventos

btnPedir.addEventListener( 'click', () =>{
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[ 0 ].innerText = puntosJugador;

    

})