interface Partida {
  puntuacion: number;
  juegoGanado: boolean;
}

export const partida: Partida = {
  puntuacion: 0,
  juegoGanado: false,
};

export type Carta = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
