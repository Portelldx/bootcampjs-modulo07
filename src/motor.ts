import { Carta, partida } from './model';

export function dameCarta(): Carta {
  const carta: Carta = (Math.floor(Math.random() * 10) + 1) as Carta;
  return carta > 7 ? ((carta + 2) as Carta) : carta;
}

export function sumarPuntuacion(carta: number): void {
  partida.puntuacion +=
    carta === 10 || carta === 11 || carta === 12 ? 0.5 : carta;
}

export function getValorCartaMapeado(carta: number): number {
  return carta === 10 || carta === 11 || carta === 12 ? 0.5 : carta;
}

export const nuevaPartida = (): void => {
  partida.puntuacion = 0;
  partida.juegoGanado = false;
};

export function gameOver(): boolean {
  if (partida.puntuacion === 7.5) {
    partida.juegoGanado = true;
  } else if (partida.puntuacion > 7.5) {
    partida.juegoGanado = false;
  }
  return partida.juegoGanado;
}

export function verFuturo(): {
  cartaFutura: number;
  nuevaPuntuacion: number;
  juegoTerminado: boolean;
} {
  const cartaFutura: number = dameCarta();
  const valorMapeado: number = getValorCartaMapeado(cartaFutura);
  partida.puntuacion += valorMapeado; // Actualiza la puntuación en la partida
  const juegoTerminado = partida.puntuacion > 7.5 || partida.puntuacion === 7.5;

  return { cartaFutura, nuevaPuntuacion: partida.puntuacion, juegoTerminado };
}
