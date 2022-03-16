// funciones anonimas autoinvocadas tiene su propio scope y no podran ser llamadas por su nombre (patron modulo)
//(() => {})(); con funciones flecha

/* (function () {})(); version antigua de funcion */

(() => {
	'use strict'; // use strict because linting and error checking are not required

	let deck = [];
	const tipos = ['C', 'D', 'H', 'S'];
	const especiales = ['A', 'J', 'Q', 'K'];

	let puntosJugador = 0,
		puntosComputadora = 0;

	// Referencias del HTML
	const btnPedir = document.querySelector('#btn-pedir');
	const btnDetener = document.querySelector('#btn-detener');
	const btnNuevo = document.querySelector('#btn-nuevo');

	const divCartasJugador = document.querySelector('#jugador-cartas');
	const divCartasComputadora = document.querySelector('#computadora-cartas');
	const puntosHTML = document.querySelectorAll('small');

	// esta funciion crea una nuena baraja
	const crearDeck = () => {
		for (let i = 2; i <= 10; i++) {
			for (let tipo of tipos) {
				deck.push(i + tipo);
			}
		}

		for (let tipo of tipos) {
			for (let esp of especiales) {
				deck.push(esp + tipo);
			}
		}

		// console.log(JSON.stringify(deck))

		// console.log(deck);
		deck = _.shuffle(deck);
		// console.log(deck);
	};

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
	};

	// deck = [];
	// pedirCarta();

	const valorCarta = (carta) => {
		let puntos = 0;
		const valor = carta.substring(0, carta.length - 1);

		return isNaN(valor) ? (valor === 'A' ? 11 : 10) : (puntos = valor * 1);

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
	};

	//valorCarta(pedirCarta());

	// turno de la computadora

	const turnoComputadora = (puntosMinimos) => {
		do {
			const carta = pedirCarta();
			puntosComputadora = puntosComputadora + valorCarta(carta);
			puntosHTML[1].innerText = puntosComputadora;

			// crear mi imagen de la carta
			const imgCarta = document.createElement('img');
			imgCarta.src = `assets/cartas/${carta}.png`;
			imgCarta.classList.add('carta');
			divCartasComputadora.append(imgCarta);

			if (puntosMinimos > 21) {
				break;
			}
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

		// se ejecuta despues de 10 ms para qeu alcance a mostrar todas las cartas ya que js no es multihilo
		setTimeout(() => {
			if (puntosComputadora === puntosMinimos) {
				alert('Nadie Gana :(');
			} else if (puntosMinimos > 21) {
				alert('Computadora gana :(');
			} else if (puntosComputadora > 21) {
				alert('Jugador gana :(');
			} else {
				alert('Computadora gana :(');
			}
		}, 10);
	};

	// eventos

	btnPedir.addEventListener('click', () => {
		const carta = pedirCarta();

		puntosJugador = puntosJugador + valorCarta(carta);

		puntosHTML[0].innerText = puntosJugador;

		// crear mi imagen de la carta
		const imgCarta = document.createElement('img');
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add('carta');
		divCartasJugador.append(imgCarta);

		if (puntosJugador > 21) {
			console.warn('lo siento, perdiste');
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		} else if (puntosJugador === 21) {
			console.warn('21 vas bien');
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		}
	});

	/* turnoComputadora(12); */

	btnDetener.addEventListener('click', () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;

		turnoComputadora(puntosJugador);
	});

	btnNuevo.addEventListener('click', () => {
		console.clear();

		deck = [];

		crearDeck();

		puntosJugador = 0;
		puntosComputadora = 0;

		puntosHTML[0].innerText = 0;
		puntosHTML[1].innerText = 0;

		divCartasComputadora.innerHTML = '';
		divCartasJugador.innerHTML = '';

		btnPedir.disabled = false;
		btnDetener.disabled = false;
	});
})();
