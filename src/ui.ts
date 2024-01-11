import { partida } from './model';
import { getValorCartaMapeado, dameCarta, sumarPuntuacion } from './motor';

const gameoverElement = document.getElementById('gameover');
const mensajeElement = document.getElementById('mensaje');
const cartaElement = document.getElementById('carta') as HTMLImageElement;
const nuevaPartidaBtn = document.getElementById(
  'nuevapartida'
) as HTMLButtonElement;
export const verFuturoBtn = document.getElementById(
  'verfuturo'
) as HTMLButtonElement;
export const dameCartaBtn = document.getElementById(
  'damecarta'
) as HTMLButtonElement;
export const plantarseBtn = document.getElementById(
  'meplanto'
) as HTMLButtonElement;

export function eventListeners(): void {
  const dameCartaBtn = document.getElementById(
    'damecarta'
  ) as HTMLButtonElement;
  const plantarseBtn = document.getElementById('meplanto') as HTMLButtonElement;
  const verFuturoBtn = document.getElementById(
    'verfuturo'
  ) as HTMLButtonElement;

  dameCartaBtn?.addEventListener('click', handlePedirCartaClick);
  plantarseBtn?.addEventListener('click', handleMePlantoClick);
  verFuturoBtn?.addEventListener('click', handleMuestraFuturoClick);
}

function mostrarCarta(carta: number): void {
  if (cartaElement) {
    const imagenesCartas: Record<number, string> = {
      1: './images/1_as-copas.jpg',
      2: './images/2_dos-copas.jpg',
      3: './images/3_tres-copas.jpg',
      4: './images/4_cuatro-copas.jpg',
      5: './images/5_cinco-copas.jpg',
      6: './images/6_seis-copas.jpg',
      7: './images/7_siete-copas.jpg',
      8: './images/8_ocho-copas.jpg',
      9: './images/9_nueve-copas.jpg',
      10: './images/10_sota-copas.jpg',
      11: './images/11_caballo-copas.jpg',
      12: './images/12_rey-copas.jpg',
    };

    const imagenSrc = imagenesCartas[carta];
    if (imagenSrc) {
      cartaElement.src = imagenSrc;
    } else {
      console.error('Error al cargar imagen de la carta');
    }
  }
}

function muestraPuntuacion(): void {
  const puntuacionElement = document.getElementById('puntuacion');
  if (puntuacionElement) {
    puntuacionElement.textContent = `Puntuación: ${partida.puntuacion}`;
  }
}

export function handlePedirCartaClick(): void {
  const carta: number = dameCarta();
  mostrarCarta(carta);
  sumarPuntuacion(carta);
  muestraPuntuacion();
  console.log(`Carta obtenida: ${carta}`);
  gameOver();

  if (plantarseBtn) {
    plantarseBtn.style.display = 'block';
  }

  dameCartaBtn.blur();
}

function gameOver(): void {
  if (!gameoverElement) {
    console.error('No se encontró el elemento gameover');
    return;
  }

  if (partida.puntuacion === 7.5) {
    mostrarMensaje('¡Felicidades! ¡Has ganado!');
    partida.juegoGanado = true;
    deshabilitarBotones();
    muestraNuevaPartida();
  } else if (partida.puntuacion > 7.5 && dameCartaBtn && plantarseBtn) {
    mostrarMensaje('🪦 GAME OVER 🪦');
    deshabilitarBotones();
    muestraNuevaPartida();
    muestraFuturo();
    ocultarFuturoBoton();
    plantarseBtn.style.display = 'none';
  }
}

function deshabilitarBotones(): void {
  if (dameCartaBtn) {
    dameCartaBtn.style.display = 'none';
    dameCartaBtn.disabled = true;
  }
  if (plantarseBtn) {
    plantarseBtn.style.display = 'none';
    plantarseBtn.disabled = true;
  }
}

function ocultarFuturoBoton(): void {
  if (verFuturoBtn) {
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

  if (mensajeElement) {
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

  if (gameoverElement) {
    gameoverElement.textContent = '';
  }
  if (mensajeElement) {
    mensajeElement.textContent = '';
  }
  if (nuevaPartidaBtn) {
    nuevaPartidaBtn.style.display = 'none';
  }
  if (cartaElement) {
    cartaElement.src = './images/back.jpg';
  }
  partida.juegoGanado = false;
  dameCartaBtn.disabled = false;
  plantarseBtn.disabled = false;
  dameCartaBtn.style.display = 'block';
  plantarseBtn.style.display = 'block';
  if (!partida.juegoGanado) {
    verFuturoBtn.style.display = 'none';
    verFuturoBtn.disabled = false;
  }
}

function muestraNuevaPartida(): void {
  if (nuevaPartidaBtn) {
    nuevaPartidaBtn.style.display = 'block';
    nuevaPartidaBtn.addEventListener('click', handleNuevaPartidaClick);
  }
}

function muestraFuturo(): void {
  verFuturoBtn.style.display = 'block';
}

export function handleMuestraFuturoClick(): void {
  if (partida.juegoGanado) {
    return;
  }
  const cartaFutura: number = dameCarta();
  const valorMapeado: number = getValorCartaMapeado(cartaFutura);
  partida.puntuacion += valorMapeado;

  mostrarCarta(cartaFutura);
  muestraPuntuacion();

  let resultadoTexto = `Si hubieras pedido otra carta, habrías obtenido un ${
    cartaFutura > 7 ? valorMapeado : cartaFutura
  }. `;
  if (partida.puntuacion > 7.5) {
    resultadoTexto += `Tu puntuación total habría sido ${partida.puntuacion}, ¡habrías perdido!`;
    partida.juegoGanado = false;
    verFuturoBtn.disabled = true;
  } else if (partida.puntuacion === 7.5) {
    resultadoTexto += `Tu puntuación total habría sido ${partida.puntuacion}, ¡habrías ganado el juego!`;
    partida.juegoGanado = true;
    verFuturoBtn.disabled = true;
  } else {
    resultadoTexto += `Tu puntuación total habría sido ${partida.puntuacion}.`;
  }

  if (mensajeElement) {
    mensajeElement.textContent = resultadoTexto;
  }
  verFuturoBtn.disabled = true;
}

export const nuevaPartida = (): void => {
  partida.puntuacion = 0;
  partida.juegoGanado = false;
};
