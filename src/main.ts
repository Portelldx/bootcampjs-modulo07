import { Carta, partida, getValorCartaMapeado } from './model';

const dameCartaBtn = document.getElementById('damecarta') as HTMLButtonElement;
const plantarseBtn = document.getElementById('meplanto') as HTMLButtonElement;
const nuevaPartidaBtn = document.getElementById(
  'nuevapartida'
) as HTMLButtonElement;
const verFuturoBtn = document.getElementById('verfuturo') as HTMLButtonElement;

const gameoverElement = document.getElementById('gameover');
const mensajeElement = document.getElementById('mensaje');
const cartaElement = document.getElementById('carta') as HTMLImageElement;

function muestraPuntuacion(): void {
  const puntuacionElement = document.getElementById('puntuacion');
  if (puntuacionElement) {
    puntuacionElement.textContent = `Puntuación: ${partida.puntuacion}`;
  }
}

function dameCarta(): Carta {
  const carta: Carta = (Math.floor(Math.random() * 10) + 1) as Carta;
  return carta > 7 ? ((carta + 2) as Carta) : carta;
}

function mostrarCarta(carta: number): void {
  if (cartaElement) {
    switch (carta) {
      case 1:
        cartaElement.src = './images/1_as-copas.jpg';
        break;
      case 2:
        cartaElement.src = './images/2_dos-copas.jpg';
        break;
      case 3:
        cartaElement.src = './images/3_tres-copas.jpg';
        break;
      case 4:
        cartaElement.src = './images/4_cuatro-copas.jpg';
        break;
      case 5:
        cartaElement.src = './images/5_cinco-copas.jpg';
        break;
      case 6:
        cartaElement.src = './images/6_seis-copas.jpg';
        break;
      case 7:
        cartaElement.src = './images/7_siete-copas.jpg';
        break;
      case 8:
        cartaElement.src = './images/8_ocho-copas.jpg';
        break;
      case 9:
        cartaElement.src = './images/9_nueve-copas.jpg';
        break;
      case 10:
        cartaElement.src = './images/10_sota-copas.jpg';
        break;
      case 11:
        cartaElement.src = './images/11_caballo-copas.jpg';
        break;
      case 12:
        cartaElement.src = './images/12_rey-copas.jpg';
        break;
      default:
        console.error('Error al cargar imagen de la carta');
        break;
    }
  }
}

function handlePedirCartaClick(): void {
  const carta: number = dameCarta();
  mostrarCarta(carta);
  sumarPuntuacion(carta);
  console.log(`Carta obtenida: ${carta}`);
  gameOver();

  if (plantarseBtn) {
    plantarseBtn.style.display = 'block';
  }

  dameCartaBtn.blur();
}

function sumarPuntuacion(carta: number): void {
  partida.puntuacion +=
    carta === 10 || carta === 11 || carta === 12 ? 0.5 : carta;
  muestraPuntuacion();
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

function handleMePlantoClick(): void {
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
  partida.puntuacion = 0;
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

function handleMuestraFuturoClick(): void {
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

document.addEventListener('DOMContentLoaded', muestraPuntuacion);

dameCartaBtn?.addEventListener('click', handlePedirCartaClick);
plantarseBtn?.addEventListener('click', handleMePlantoClick);
verFuturoBtn?.addEventListener('click', handleMuestraFuturoClick);
