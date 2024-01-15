import { partida } from './model';
import {
  dameCarta,
  sumarPuntuacion,
  nuevaPartida,
  gameOver,
  verFuturo,
  obtenerRutaImagen,
} from './motor';

const gameoverElement = document.getElementById('gameover');
const mensajeElement = document.getElementById('mensaje');
const cartaElement = document.getElementById('carta');
const nuevaPartidaBtn = document.getElementById('nuevapartida');
export const verFuturoBtn = document.getElementById('verfuturo');
export const dameCartaBtn = document.getElementById('damecarta');
export const plantarseBtn = document.getElementById('meplanto');

export function eventListeners(): void {
  if (dameCartaBtn && dameCartaBtn instanceof HTMLButtonElement) {
    dameCartaBtn.addEventListener('click', handlePedirCartaClick);
  }

  if (plantarseBtn && plantarseBtn instanceof HTMLButtonElement) {
    plantarseBtn.addEventListener('click', handleMePlantoClick);
  }

  if (verFuturoBtn && verFuturoBtn instanceof HTMLButtonElement) {
    verFuturoBtn.addEventListener('click', handleMuestraFuturoClick);
  }
}

export function mostrarCarta(carta: number): void {
  const cartaElement = document.getElementById('carta');

  if (cartaElement && cartaElement instanceof HTMLImageElement) {
    const imagenSrc = obtenerRutaImagen(carta);

    if (imagenSrc) {
      cartaElement.src = imagenSrc;
    } else {
      console.error('Error al cargar imagen de la carta');
    }
  }
}

function muestraPuntuacion(): void {
  const puntuacionElement = document.getElementById('puntuacion');
  if (puntuacionElement && puntuacionElement instanceof HTMLElement) {
    puntuacionElement.textContent = `Puntuación: ${partida.puntuacion}`;
  }
}

export function handlePedirCartaClick(): void {
  const carta = dameCarta();
  mostrarCarta(carta);
  sumarPuntuacion(carta);
  muestraPuntuacion();

  if (plantarseBtn) {
    plantarseBtn.style.display = 'block';
  }

  if (dameCartaBtn) {
    dameCartaBtn.blur();
  }

  if (gameOver()) {
    mostrarMensaje('¡Felicidades! ¡Has ganado!');
    deshabilitarBotones();
    muestraNuevaPartida();
  } else if (partida.puntuacion > 7.5) {
    mostrarMensaje('🪦 GAME OVER 🪦');
    deshabilitarBotones();
    muestraNuevaPartida();
    muestraFuturo();
    ocultarFuturoBoton();
  }
}

function deshabilitarBotones(): void {
  if (dameCartaBtn && dameCartaBtn instanceof HTMLButtonElement) {
    dameCartaBtn.style.display = 'none';
    dameCartaBtn.disabled = true;
  }
  if (plantarseBtn && plantarseBtn instanceof HTMLButtonElement) {
    plantarseBtn.style.display = 'none';
    plantarseBtn.disabled = true;
  }
}

function ocultarFuturoBoton(): void {
  if (verFuturoBtn && verFuturoBtn instanceof HTMLButtonElement) {
    verFuturoBtn.style.display = 'none';
    verFuturoBtn.disabled = true;
  }
}

function mostrarMensaje(mensaje: string): void {
  if (gameoverElement) {
    gameoverElement.textContent = mensaje;
  }
}

function obtenerMensaje(puntuacion: number): void {
  let mensaje = '';

  if (puntuacion === 7.5) {
    mensaje = '¡Lo has clavado! ¡Enhorabuena!';
  } else if (puntuacion >= 6 && puntuacion <= 7) {
    mensaje = 'Casi casi...';
  } else if (puntuacion === 5 || puntuacion === 5.5) {
    mensaje = 'Te ha entrado el canguelo eh?';
  } else if (puntuacion <= 4.5) {
    mensaje = 'Has sido muy conservador.';
  } else {
    mensaje = 'Error al obtener el mensaje';
    console.error(mensaje);
  }

  if (mensajeElement && mensajeElement instanceof HTMLElement) {
    mensajeElement.textContent = mensaje;
  }
}

export function handleMePlantoClick(): void {
  if (partida.juegoGanado) {
    return;
  }
  obtenerMensaje(partida.puntuacion);
  muestraNuevaPartida();
  deshabilitarBotones();
  if (partida.puntuacion <= 7) {
    muestraFuturo();
  }
}

function handleNuevaPartidaClick(): void {
  nuevaPartida();
  muestraPuntuacion();

  if (gameoverElement && gameoverElement instanceof HTMLElement) {
    gameoverElement.textContent = '';
  }
  if (mensajeElement && mensajeElement instanceof HTMLElement) {
    mensajeElement.textContent = '';
  }
  if (nuevaPartidaBtn && nuevaPartidaBtn instanceof HTMLButtonElement) {
    nuevaPartidaBtn.style.display = 'none';
  }
  if (cartaElement && cartaElement instanceof HTMLImageElement) {
    cartaElement.src = './images/back.jpg';
  }
  partida.juegoGanado = false;
  if (dameCartaBtn && dameCartaBtn instanceof HTMLButtonElement) {
    dameCartaBtn.disabled = false;
    dameCartaBtn.style.display = 'block';
  }
  if (plantarseBtn && plantarseBtn instanceof HTMLButtonElement) {
    plantarseBtn.disabled = false;
    plantarseBtn.style.display = 'none';
  }

  if (
    !partida.juegoGanado &&
    verFuturoBtn &&
    verFuturoBtn instanceof HTMLButtonElement
  ) {
    verFuturoBtn.style.display = 'none';
    verFuturoBtn.disabled = false;
  }
}

function muestraNuevaPartida(): void {
  if (nuevaPartidaBtn && nuevaPartidaBtn instanceof HTMLButtonElement) {
    nuevaPartidaBtn.style.display = 'block';
    nuevaPartidaBtn.addEventListener('click', handleNuevaPartidaClick);
  }
}

function muestraFuturo(): void {
  if (verFuturoBtn && verFuturoBtn instanceof HTMLButtonElement) {
    verFuturoBtn.style.display = 'block';
  }
}

export function handleMuestraFuturoClick(): void {
  if (partida.juegoGanado) {
    return;
  }

  const { cartaFutura, nuevaPuntuacion, juegoTerminado } = verFuturo();

  mostrarCarta(cartaFutura);
  muestraPuntuacion();

  let resultadoTexto = `Si hubieras pedido otra carta, habrías obtenido un ${
    cartaFutura > 7 ? 0.5 : cartaFutura
  }. Tu puntuación total ahora es ${nuevaPuntuacion}`;

  resultadoTexto += juegoTerminado
    ? nuevaPuntuacion > 7.5
      ? ', ¡has perdido!'
      : ', ¡has ganado el juego!'
    : '.';

  if (mensajeElement && mensajeElement instanceof HTMLElement) {
    mensajeElement.textContent = resultadoTexto;
  }

  if (verFuturoBtn && verFuturoBtn instanceof HTMLButtonElement) {
    verFuturoBtn.disabled = true;
  }
}
