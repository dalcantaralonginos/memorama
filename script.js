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

let conceptos = [
    "Valores","Principios","Normas","Conducta Humana","Diversidad",
    "Globalización","Tolerancia","Diálogo","Avances Tecnológicos","Confianza",
    "Justicia","Política","Responsabilidad","Compromiso","Participación",
    "Respeto","Honestidad","Solidaridad","Igualdad","Empatía",

    "Valores","Principios","Normas","Conducta Humana","Diversidad",
    "Globalización","Tolerancia","Diálogo","Avances Tecnológicos","Confianza",
    "Justicia","Política","Responsabilidad","Compromiso","Participación",
    "Respeto","Honestidad","Solidaridad","Igualdad","Empatía"
];


conceptos.sort(() => Math.random() - 0.5);


conceptos.forEach(concepto => {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    carta.innerHTML = `
        <div class="carta-inner">
            <div class="frente"></div>
            <div class="atras">${concepto}</div>
        </div>
    `;

    carta.addEventListener("click", () => voltearCarta(carta, concepto));
    tablero.appendChild(carta);
});


function voltearCarta(carta, concepto) {
    if (bloqueo || carta.classList.contains("volteada")) return;

    flipSound.play();
    carta.classList.add("volteada");
    seleccionadas.push({carta, concepto});

    if (seleccionadas.length === 2) {
        bloqueo = true;
        setTimeout(verificarPar, 800);
    }
}

function verificarPar() {
    const [a, b] = seleccionadas;

    if (a.concepto === b.concepto) {
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
