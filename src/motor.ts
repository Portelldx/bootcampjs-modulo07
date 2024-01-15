import { Carta, partida } from './model';

export function dameCarta(): Carta {
  const carta: Carta = (Math.floor(Math.random() * 10) + 1) as Carta;
  return carta > 7 ? ((carta + 2) as Carta) : carta;
}

export function sumarPuntuacion(carta: number): void {
  if (carta === 10 || carta === 11 || carta === 12) {
    partida.puntuacion += 0.5;
  } else {
    partida.puntuacion += carta;
  }
}

export function getValorCartaMapeado(carta: Carta): number {
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
  const valorMapeado: number = getValorCartaMapeado(cartaFutura as Carta);
  partida.puntuacion += valorMapeado;
  const juegoTerminado = partida.puntuacion > 7.5 || partida.puntuacion === 7.5;

  return { cartaFutura, nuevaPuntuacion: partida.puntuacion, juegoTerminado };
}

export function obtenerRutaImagen(carta: number): string | null {
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

  return imagenesCartas[carta] || null;
}
