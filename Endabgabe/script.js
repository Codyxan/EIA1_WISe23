// Definition der Akkorde und variablen
const chordsArray = ["C", "D", "E", "F", "G", "A", "B"];
const chordSounds = {};
let currentChord;
let selectedAnswer;
let audioContext;

// Initialisiert den Audio-Kontext
function initializeAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

// Lädt die Klangsdateien der Akkorde
async function loadChordSounds() {
    const loadChord = async (chord) => {
        const response = await fetch(`AllMusicNotes/${chord}.mp3`);
        const buffer = await response.arrayBuffer();
        chordSounds[chord] = await audioContext.decodeAudioData(buffer);
    };

    return Promise.all(chordsArray.map(loadChord));
}

// Spielt einen Akkord ab
function playChord(chord) {
    const source = audioContext.createBufferSource();
    source.buffer = chordSounds[chord];
    source.connect(audioContext.destination);
    source.start(0);
}

// Startet das Spiel
function startGame() {
    initializeAudioContext();
    loadChordSounds().then(() => {
        generateRandomChord();
        enableChordButtons(true);
        document.getElementById("startButton").disabled = true;
    });
}

// Generiert einen zufaelligen Akkord und setzt die auswahl zurueck 
function generateRandomChord() {
    const randomIndex = Math.floor(Math.random() * chordsArray.length);
    currentChord = chordsArray[randomIndex];
    playChord(currentChord);
    displayChordButtons();
    selectedAnswer = null;
    document.getElementById("result").innerText = "";
}

// Erneuert die Anzeige der Akkord-Buttons
function displayChordButtons() {
    const chordContainer = document.getElementById("chordContainer");
    chordContainer.innerHTML = '';

    for (const chord of chordsArray) {
        const button = document.createElement("button");
        button.textContent = chord;
        button.onclick = () => {
            selectChord(chord);
            playChord(chord); // spielt nur ab wenn man den button dueckt 
            updateButtonColors(button); // Aktualisiert die Farben der Buttons bei der Akkordauswahl
        };
        chordContainer.appendChild(button);
    }

    const replayButton = document.createElement("button");
    replayButton.textContent = "Chord to Guess";
    replayButton.onclick = () => playChord(currentChord);
    chordContainer.appendChild(replayButton);
}
// Waehlt einen Akkord aus
function selectChord(chord) {
    selectedAnswer = chord;
}

// Aktiviert oder deaktiviert die Akkord-Buttons
function enableChordButtons(enable) {
    const buttons = document.querySelectorAll("#chordContainer button");
    buttons.forEach(button => (button.disabled = !enable));
}

// Aktualisier die Farben der Akkord-Buttons wenn ausgewaehlt 
function updateButtonColors(selectedButton) {
    const buttons = document.querySelectorAll("#chordContainer button");
    buttons.forEach(button => {
        const isChordSelected = selectedAnswer === button.textContent;
        button.style.backgroundColor = isChordSelected ? "lightblue" : "";
    });
}

// Ueberprüft die Antwort und die End Nachricht aus
function checkAnswer() {
    const resultElement = document.getElementById("result");
    if (selectedAnswer === currentChord) {
        resultElement.innerText = "Correct!";
    } else {
        resultElement.innerText = "Incorrect! Try again";
    }

    enableChordButtons(false);
    document.getElementById("startButton").disabled = false;

    setTimeout(() => {
        generateRandomChord();
        resultElement.innerText = ""; // setzt den innerText zurueck
    }, 1000);
}

// Initialisierung
document.getElementById("startButton").addEventListener("click", function () {
    initializeAudioContext();
    loadChordSounds().then(() => {
        generateRandomChord();
        enableChordButtons(true);
        document.getElementById("startButton").disabled = true;
    });
});

// Event listener zur Enter taste zur auswahl bestaetigugng 
document.addEventListener("keydown", function (event) {
    console.log ("enter pressed key")
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Startet das Spiel beim Laden der Seite
document.addEventListener("DOMContentLoaded", function () {
    loadChordSounds().then(() => {
        gameLoop();
    });
});

function handleLoaded() {

}
function handleTouch12 (){
    var startButton = document.getElementById("startButton");
var clickEvent = new Event("click");

startButton.dispatchEvent(clickEvent);
}

