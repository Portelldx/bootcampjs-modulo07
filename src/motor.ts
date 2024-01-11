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
