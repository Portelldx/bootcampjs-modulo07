import { partida, Carta } from './model';
import {
  dameCarta,
  gameOver,
  obtenerRutaImagen,
  getValorCartaMapeado,
  sumarPuntuacion,
} from './motor';
import { vi } from 'vitest';

describe('gameOver', () => {
  beforeEach(() => {
    partida.puntuacion = 0;
    partida.juegoGanado = false;
  });

  afterEach(() => {
    partida.puntuacion = 0;
    partida.juegoGanado = false;
  });

  it('Si la puntuación es igual a 7.5, juegoGanado debería de devolver true (El jugador ha ganado)', () => {
    // Arrrange
    partida.puntuacion = 7.5;
    // Act
    const resultado = gameOver();
    // Assert
    expect(resultado).toBe(true);
  });

  it('Si la puntuación es mayor a 7.5, juegoGanado debería de devolver false (El jugador ha perdido)', () => {
    // Arrrange
    partida.puntuacion = 7.6;
    // Act
    const resultado = gameOver();
    // Assert
    expect(resultado).toBe(false);
  });

  it('Si la puntuación es menor a 7.5, juegoGanado debería de seguir devolviendo false (Estado por defecto, el juego aún no ha terminado)', () => {
    // Arrrange
    partida.puntuacion = 7.4;
    // Act
    const resultado = gameOver();
    // Assert
    expect(resultado).toBe(false);
  });

  it('Comprobamos que no se produzca redondo. Si la puntuación es justo por debajo de 7.5 , juegoGanado debería de seguir devolviendo false', () => {
    // Arrrange
    partida.puntuacion = 7.49;
    // Act
    const resultado = gameOver();
    // Assert
    expect(resultado).toBe(false);
  });
});

describe('dameCarta', () => {
  it('Debería devolver un número', () => {
    // Arrange
    const carta: Carta = dameCarta();

    // Act
    const result = typeof carta;

    // Assert
    expect(result).toBe('number');
  });

  it('Si el numero es 6, debería de volver 6', () => {
    // Arrange
    vi.spyOn(global.Math, 'random').mockReturnValue(0.5);

    // Act
    const carta = dameCarta();

    // Assert
    expect(carta).toBe(6);
  });

  it('Si el numero es 7, debería de volver 10', () => {
    // Arrange
    vi.spyOn(global.Math, 'random').mockReturnValue(0.7);

    // Act
    const carta = dameCarta();

    // Assert
    expect(carta).toBe(10);
  });

  it('Si el numero es 8, debería de volver 11', () => {
    // Arrange
    vi.spyOn(global.Math, 'random').mockReturnValue(0.8);

    // Act
    const carta = dameCarta();

    // Assert
    expect(carta).toBe(11);
  });

  it('Si el numero es 9, debería de volver 12', () => {
    // Arrange
    vi.spyOn(global.Math, 'random').mockReturnValue(0.9);

    // Act
    const carta = dameCarta();

    // Assert
    expect(carta).toBe(12);
  });
});

describe('obtenerRutaImagen', () => {
  it('Debería devolver la ruta correcta para la carta AS de copas', () => {
    // Arrange
    vi.spyOn(global.Math, 'random').mockReturnValue(0.09);
    const rutaEsperada = './images/1_as-copas.jpg';

    // Act
    const carta: Carta = dameCarta();
    const result = obtenerRutaImagen(carta);

    // Assert
    expect(result).toBe(rutaEsperada);
  });
  it('Debería devolver la ruta correcta para la carta 10 Sota copas', () => {
    // Arrange
    vi.spyOn(global.Math, 'random').mockReturnValue(0.7);
    const rutaEsperada = './images/10_sota-copas.jpg';

    // Act
    const carta: Carta = dameCarta();
    const result = obtenerRutaImagen(carta);

    // Assert
    expect(result).toBe(rutaEsperada);
  });

  it('Debería devolver null para una carta inexistente', () => {
    // Arrange

    const carta: number = 13;

    // Act
    const result = obtenerRutaImagen(carta);

    // Assert
    expect(result).toBeNull();
  });
});

describe('getValorCartaMapeado', () => {
  it('Debería devolver 0.5 si la carta obtenida es 10', () => {
    // Arrange
    const carta: Carta = 10;

    // Act
    const resultado = getValorCartaMapeado(carta);
    // Assert
    expect(resultado).toBe(0.5);
  });

  it('Debería devolver 0.5 si la carta obtenida es 11', () => {
    // Arrange
    const carta: Carta = 11;

    // Act
    const resultado = getValorCartaMapeado(carta);
    // Assert
    expect(resultado).toBe(0.5);
  });

  it('Debería devolver 0.5 si la carta obtenida es 12', () => {
    // Arrange
    const carta: Carta = 12;

    // Act
    const resultado = getValorCartaMapeado(carta);
    // Assert
    expect(resultado).toBe(0.5);
  });

  it('Debería devolver 5 si la carta obtenida es 5', () => {
    // Arrange
    const carta: Carta = 5;

    // Act
    const resultado = getValorCartaMapeado(carta);

    // Assert
    expect(resultado).toBe(5);
  });
});

describe('sumarPuntuacion', () => {
  beforeEach(() => {
    partida.puntuacion = 0;
    partida.juegoGanado = false;
  });

  afterEach(() => {
    partida.puntuacion = 0;
    partida.juegoGanado = false;
  });

  it('Debería sumar 5 a la puntuación total', () => {
    // Arrange
    partida.puntuacion = 7;
    const carta: number = 5;

    // Act
    sumarPuntuacion(carta);
    const puntuacionDespues = partida.puntuacion;

    // Assert
    expect(puntuacionDespues).toBe(12);
  });
  it('Debería sumar 0.5 a la puntuación total', () => {
    // Arrange
    partida.puntuacion = 7;
    const carta: number = 10;

    // Act
    sumarPuntuacion(carta);
    const puntuacionDespues = partida.puntuacion;

    // Assert
    expect(puntuacionDespues).toBe(7.5);
  });
});
