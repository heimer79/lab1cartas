// funciones anonimas autoinvocadas tiene su propio scope y no podran ser llamadas por su nombre (patron modulo)
//(() => {})(); con funciones flecha

/* (function () {})(); version antigua de funcion */

const miModulo = (() => {
	'use strict'; // use strict because linting and error checking are not required

	let deck = [];
	const tipos = ['C', 'D', 'H', 'S'],
		especiales = ['A', 'J', 'Q', 'K'];

	let puntosJugadores = [];

	// Referencias del HTML
	const btnPedir = document.querySelector('#btn-pedir'),
		btnDetener = document.querySelector('#btn-detener'),
		btnNuevo = document.querySelector('#btn-nuevo');

	const divCartasJugadores = document.querySelectorAll('.divCartas'),
		puntosHTML = document.querySelectorAll('small');

	// esta funcion inicializa el juego
	const inicializarJuego = (numJugadores = 2) => {
		deck = crearDeck();
		puntosJugadores = [];
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0);
		}

		puntosHTML.forEach((elem) => (elem.innerText = 0));
		divCartasJugadores.forEach((elem) => (elem.innerHTML = ''));

		btnPedir.disabled = false;
		btnDetener.disabled = false;
	};

	// esta funciion crea una nuena baraja
	const crearDeck = () => {
		deck = []; // inicializo el deck para que construya de nuevo todo

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
		return _.shuffle(deck); // es lo que retorno del deck
		// console.log(deck);
	};

	// Esta funcion me permite tomar una carta

	const pedirCarta = () => {
		if (deck.length === 0) {
			throw 'No hay cartas en el deck'; //throw sirve para mostrar el error
		}

		// console.log(deck)
		// console.log(carta) // debe ser de la baraja
		return deck.pop();
	};

	// deck = [];
	// pedirCarta();

	const valorCarta = (carta) => {
		const valor = carta.substring(0, carta.length - 1);

		return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;

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

	// Turno: 0 = primer jugador y el último será la computadora
	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		puntosHTML[turno].innerText = puntosJugadores[turno];

		return puntosJugadores[turno];
	};

	const crearCarta = (carta, turno) => {
		const imgCarta = document.createElement('img');
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add('carta');
		divCartasJugadores[turno].append(imgCarta);
	};

	const determinarGanador = () => {
		const [puntosMinimos, puntosComputadora] = puntosJugadores;

		setTimeout(() => {
			if (puntosComputadora === puntosMinimos) {
				alert('Nadie gana :(');
			} else if (puntosMinimos > 21) {
				alert('Computadora gana');
			} else if (puntosComputadora > 21) {
				alert('Jugador Gana');
			} else {
				alert('Computadora Gana');
			}
		}, 100);
	};

	// turno de la computadora

	const turnoComputadora = (puntosMinimos) => {
		let puntosComputadora = 0;
		do {
			const carta = pedirCarta();
			puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
			// puntosComputadora = puntosComputadora + valorCarta(carta);
			// puntosHTML[1].innerText = puntosComputadora;
			// crear mi imagen de la carta
			crearCarta(carta, puntosJugadores.length - 1);
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

		// se ejecuta despues de 10 ms para qeu alcance a mostrar todas las cartas ya que js no es multihilo
		determinarGanador();
	};

	// eventos

	btnPedir.addEventListener('click', () => {
		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(carta, 0);

		// puntosJugador = puntosJugador + valorCarta(carta);

		// puntosHTML[0].innerText = puntosJugador;

		// crear mi imagen de la carta
		crearCarta(carta, 0);

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

		turnoComputadora(puntosJugadores[0]);
	});

	/* btnNuevo.addEventListener('click', () => {
		inicializarJuego();
		
	} ); */

	return {
		nuevoJuego: inicializarJuego,
	};
})();
