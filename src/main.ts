// Obtener referencias a los elementos del DOM
const currentTurnDisplay = document.querySelector(".numero-turno");
const textDisplay = document.querySelector(".texto-turno");
const nextBtn = document.getElementById("siguiente");
const previousBtn = document.getElementById("anterior");
const resetBtn = document.getElementById("reset");
const changeBtn = document.getElementById("cambiar");
const turnInput = document.getElementById("turno-input") as HTMLInputElement;

// Variable del turno actual
let currentTurn: number = 1;

// Función para actualizar el display del turno
function displayTurn(): void {
  const turnoFormateado: string = currentTurn.toString().padStart(2, "0");
  if (currentTurnDisplay !== undefined && currentTurnDisplay !== null) {
    currentTurnDisplay.textContent = turnoFormateado;
  }
  if (textDisplay !== undefined && textDisplay !== null) {
    textDisplay.textContent = `Por favor, acérquese al mostrador para el turno ${turnoFormateado}`;
  }
}

// Función para avanzar turno
function nextTurn(): void {
  currentTurn++;
  displayTurn();
}

// Función para retroceder turno
function previousTurn(): void {
  if (currentTurn > 1) {
    currentTurn--;
    displayTurn();
  }
}

// Función para restear el turno
function resetTurn(): void {
  currentTurn = 0;
  displayTurn();
}

// Función para cambiar el turno a un valor específico
function changeTurn(): void {
  if (turnInput !== null && turnInput !== undefined) {
    const newTurn: number = parseInt(turnInput.value, 10);
    // Condicional para validar sólo valores numéricos
    if (!isNaN(newTurn)) {
      currentTurn = newTurn;
      displayTurn();
    }
  }
}

nextBtn?.addEventListener("click", nextTurn);
previousBtn?.addEventListener("click", previousTurn);
resetBtn?.addEventListener("click", resetTurn);
changeBtn?.addEventListener("click", changeTurn);
