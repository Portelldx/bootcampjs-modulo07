let puntuacion: number = 0;
const dameCartaBtn = document.getElementById("damecarta") as HTMLButtonElement;
const plantarseBtn = document.getElementById("meplanto") as HTMLButtonElement;
const nuevaPartidaBtn = document.getElementById(
  "nuevapartida"
) as HTMLButtonElement;
const verFuturoBtn = document.getElementById("verfuturo") as HTMLButtonElement;

const gameoverElement = document.getElementById("gameover");
const mensajeElement = document.getElementById("mensaje");
const cartaElement = document.getElementById("carta") as HTMLImageElement;
let juegoGanado: boolean = false;
let puntuacionFutura: number = 0;

type Carta = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

function muestraPuntuacion(): void {
  const puntuacionElement = document.getElementById("puntuacion");
  if (puntuacionElement) {
    puntuacionElement.textContent = `Puntuación: ${puntuacion}`;
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
        cartaElement.src = "./images/1_as-copas.jpg";
        break;
      case 2:
        cartaElement.src = "./images/2_dos-copas.jpg";
        break;
      case 3:
        cartaElement.src = "./images/3_tres-copas.jpg";
        break;
      case 4:
        cartaElement.src = "./images/4_cuatro-copas.jpg";
        break;
      case 5:
        cartaElement.src = "./images/5_cinco-copas.jpg";
        break;
      case 6:
        cartaElement.src = "./images/6_seis-copas.jpg";
        break;
      case 7:
        cartaElement.src = "./images/7_siete-copas.jpg";
        break;
      case 8:
        cartaElement.src = "./images/8_ocho-copas.jpg";
        break;
      case 9:
        cartaElement.src = "./images/9_nueve-copas.jpg";
        break;
      case 10:
        cartaElement.src = "./images/10_sota-copas.jpg";
        break;
      case 11:
        cartaElement.src = "./images/11_caballo-copas.jpg";
        break;
      case 12:
        cartaElement.src = "./images/12_rey-copas.jpg";
        break;
      default:
        console.error("Error al cargar imagen de la carta");
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
  dameCartaBtn.blur();
}

function sumarPuntuacion(carta: number): void {
  puntuacion += carta === 10 || carta === 11 || carta === 12 ? 0.5 : carta;
  muestraPuntuacion();
}

function gameOver(): void {
  if (!gameoverElement) {
    console.error("No se encontró el elemento gameover");
    return;
  }

  if (puntuacion > 7.5 && dameCartaBtn && plantarseBtn) {
    deshabilitarBotones();
    mostrarMensaje("🪦 GAME OVER 🪦");
    muestraNuevaPartida();
    muestraFuturo();
    plantarseBtn.style.display = "none";
  }
}

function deshabilitarBotones(): void {
  if (dameCartaBtn) {
    dameCartaBtn.style.display = "none";
    dameCartaBtn.disabled = true;
  }
  if (plantarseBtn) {
    plantarseBtn.style.display = "none";
    plantarseBtn.disabled = true;
  }
}

function mostrarMensaje(mensaje: string): void {
  if (gameoverElement) {
    gameoverElement.textContent = mensaje;
  }
}

function obtenerMensaje(puntuacion: number): void {
  let mensaje = "";

  if (puntuacion === 7.5) {
    mensaje = "¡Lo has clavado! ¡Enhorabuena!";
  } else if (puntuacion >= 6 && puntuacion <= 7) {
    mensaje = "Casi casi...";
  } else if (puntuacion === 5 || puntuacion === 5.5) {
    mensaje = "Te ha entrado el canguelo eh?";
  } else if (puntuacion <= 4.5) {
    mensaje = "Has sido muy conservador.";
  } else {
    mensaje = "Error al obtener el mensaje";
    console.error(mensaje);
  }

  if (mensajeElement) {
    mensajeElement.textContent = mensaje;
  }
}

function handleMePlantoClick(): void {
  obtenerMensaje(puntuacion);
  muestraNuevaPartida();
  dameCartaBtn.style.display = "none";
  plantarseBtn.style.display = "none";
  if (puntuacion <= 7) {
    muestraFuturo();
  }
}

function handleNuevaPartidaClick(): void {
  puntuacion = 0;
  puntuacionFutura = 0;
  muestraPuntuacion();

  if (gameoverElement) {
    gameoverElement.textContent = "";
  }
  if (mensajeElement) {
    mensajeElement.textContent = "";
  }
  if (nuevaPartidaBtn) {
    nuevaPartidaBtn.style.display = "none";
  }
  if (cartaElement) {
    cartaElement.src = "./images/back.jpg";
  }
  juegoGanado = false;
  dameCartaBtn.disabled = false;
  plantarseBtn.disabled = false;
  dameCartaBtn.style.display = "block";
  plantarseBtn.style.display = "block";
  if (!juegoGanado) {
    verFuturoBtn.style.display = "none";
    verFuturoBtn.disabled = false;
  }
}

function muestraNuevaPartida(): void {
  if (nuevaPartidaBtn) {
    nuevaPartidaBtn.style.display = "block";
    nuevaPartidaBtn.addEventListener("click", handleNuevaPartidaClick);
  }
}

function muestraFuturo(): void {
  verFuturoBtn.style.display = "block";
}

function handleMuestraFuturoClick(): void {
  if (juegoGanado) {
    return;
  }

  const cartaFutura: number = dameCarta();
  puntuacionFutura +=
    cartaFutura === 10 || cartaFutura === 11 || cartaFutura === 12
      ? 0.5
      : cartaFutura;

  mostrarCarta(cartaFutura);

  let resultadoTexto = `Si hubieras pedido otra carta, habrías obtenido un ${cartaFutura}. `;
  if (puntuacionFutura > 7.5) {
    resultadoTexto += `Tu puntuación total habría sido ${puntuacionFutura}, ¡habrías perdido!`;
    juegoGanado = false;
    verFuturoBtn.disabled = true;
  } else if (puntuacionFutura === 7.5) {
    resultadoTexto += `Tu puntuación total habría sido ${puntuacionFutura}, ¡habrías ganado el juego!`;
    juegoGanado = true;
    verFuturoBtn.disabled = true;
  } else {
    resultadoTexto += `Tu puntuación total habría sido ${puntuacionFutura}.`;
  }

  if (mensajeElement) {
    mensajeElement.textContent = resultadoTexto;
  }
  verFuturoBtn.blur();
}

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

dameCartaBtn?.addEventListener("click", handlePedirCartaClick);
plantarseBtn?.addEventListener("click", handleMePlantoClick);
verFuturoBtn?.addEventListener("click", handleMuestraFuturoClick);
