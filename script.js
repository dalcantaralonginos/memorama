// ======================
// VARIABLES
// ======================
const tablero = document.getElementById("tablero");
const turnoTexto = document.getElementById("turno");
const tiempoTexto = document.getElementById("tiempo");
const p1Texto = document.getElementById("p1");
const p2Texto = document.getElementById("p2");

const flipSound = document.getElementById("flipSound");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

let turno = 1;
let tiempo = 10;
let timer;
let seleccionadas = [];
let bloqueo = false;
let puntos = {1: 0, 2: 0};

// ======================
// VALORES ÉTICOS (20 PARES)
// ======================
let valores = [
    "Respeto","Honestidad","Justicia","Solidaridad","Responsabilidad",
    "Tolerancia","Igualdad","Empatía","Cooperación","Paz",
    "Libertad","Dignidad","Compromiso","Lealtad","Diálogo",
    "Equidad","Inclusión","Integridad","Civismo","Ética",
    "Respeto","Honestidad","Justicia","Solidaridad","Responsabilidad",
    "Tolerancia","Igualdad","Empatía","Cooperación","Paz",
    "Libertad","Dignidad","Compromiso","Lealtad","Diálogo",
    "Equidad","Inclusión","Integridad","Civismo","Ética"
];

// Mezclar cartas
valores.sort(() => Math.random() - 0.5);

// ======================
// CREAR TABLERO
// ======================
valores.forEach(valor => {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    carta.innerHTML = `
        <div class="carta-inner">
            <div class="frente"></div>
            <div class="atras">${valor}</div>
        </div>
    `;

    carta.addEventListener("click", () => voltearCarta(carta, valor));
    tablero.appendChild(carta);
});

// ======================
// FUNCIONES
// ======================
function voltearCarta(carta, valor) {
    if (bloqueo || carta.classList.contains("volteada")) return;

    flipSound.play();
    carta.classList.add("volteada");
    seleccionadas.push({carta, valor});

    if (seleccionadas.length === 2) {
        bloqueo = true;
        setTimeout(verificarPar, 800);
    }
}

function verificarPar() {
    const [a, b] = seleccionadas;

    if (a.valor === b.valor) {
        correctSound.play();
        puntos[turno]++;
        actualizarPuntaje();
        bloqueo = false;
    } else {
        wrongSound.play();
        setTimeout(() => {
            a.carta.classList.remove("volteada");
            b.carta.classList.remove("volteada");
            cambiarTurno();
        }, 600);
    }
    seleccionadas = [];
}

function cambiarTurno() {
    turno = turno === 1 ? 2 : 1;
    turnoTexto.textContent = `Jugador ${turno}`;
    reiniciarTiempo();
    bloqueo = false;
}

function actualizarPuntaje() {
    p1Texto.textContent = puntos[1];
    p2Texto.textContent = puntos[2];
}

// ======================
// TEMPORIZADOR
// ======================
function iniciarTiempo() {
    timer = setInterval(() => {
        tiempo--;
        tiempoTexto.textContent = tiempo;

        if (tiempo === 0) {
            cambiarTurno();
        }
    }, 1000);
}

function reiniciarTiempo() {
    clearInterval(timer);
    tiempo = 10;
    tiempoTexto.textContent = tiempo;
    iniciarTiempo();
}

iniciarTiempo();
