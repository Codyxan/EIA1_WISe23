const chordArray = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const chordSounds = {};
let currentChord;
let selectedAnswer;
let optionsContainer;
let submitButton;

function initializeAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}
document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('gameIntro').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    initializeGame();
});


function loadChordSounds() {
    const loadChord = async (chord) => {
        const response = await fetch(`AllMusicNotes/${chord}.mp3`);
        const buffer = await response.arrayBuffer();
        chordSounds[chord] = await audioContext.decodeAudioData(buffer);
    };

    return Promise.all(chordArray.map(loadChord));
}

function generateRandomChord() {
    const randomIndex = Math.floor(Math.random() * chordArray.length);
    currentChord = chordArray[randomIndex];
    playChord(currentChord);
    displayOptions(currentChord);
    selectedAnswer = null;
}



function playChord(chord, callback) {

    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = chordSounds[chord];
    source.start(audioContext.currentTime);
    
    
    if (callback) {
        source.onended = callback;
    }
}
function displayOptions(currentChord) {
    optionsContainer.innerHTML = '';

    const incorrectOptions = chordArray.filter(chord => chord !== currentChord);
    const randomIncorrectOptions = getNRandomItemsFromArray(incorrectOptions, 2);
    const shuffledOptions = [currentChord, ...randomIncorrectOptions].sort(() => Math.random() - 0.3);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.innerText = option;
        button.onclick = () => {
            if (!selectedAnswer) {
                selectedAnswer = option;
                playChord(option); 
                disableOptionButtons();
                submitButton.disabled = false;
            }
        };
        optionsContainer.appendChild(button);
    });

    
    playChord(currentChord);
}


function disableOptionButtons() {
    const buttons = optionsContainer.querySelectorAll('.option');
    buttons.forEach(button => (button.disabled = true));
}

function enableOptionButtons() {
    const buttons = optionsContainer.querySelectorAll('.option');
    buttons.forEach(button => (button.disabled = false));
}
function submitAnswer() {
    if (selectedAnswer !== null) {
        playChord(selectedAnswer, () => {
            checkAnswer(selectedAnswer, currentChord);
            enableOptionButtons();
            submitButton.disabled = true;
            setTimeout(generateRandomChord, 1000);
        });
    } else {
        document.getElementById('result').innerText = 'Please select an answer before submitting.';
    }
}


function checkAnswer(userGuess, currentChord) {
    const resultElement = document.getElementById('result');
    if (userGuess === currentChord) {
        resultElement.innerText = 'Correct!';
    } else {
        resultElement.innerText = 'Incorrect! Try again';
    }
}

function getNRandomItemsFromArray(array, n) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, n);
}


async function initializeGame() {
    initializeAudioContext();
    await loadChordSounds();


    optionsContainer = document.getElementById('options');

    submitButton = document.getElementById('submitGuessButton');
    generateRandomChord();
}

initializeGame();


function displayOptions(currentChord) {
    optionsContainer.innerHTML = '';

    const incorrectOptions = chordArray.filter(chord => chord !== currentChord);
    const randomIncorrectOptions = getNRandomItemsFromArray(incorrectOptions, 2);
    const shuffledOptions = [currentChord, ...randomIncorrectOptions].sort(() => Math.random() - 0.3);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.innerText = option;
        button.onclick = () => {
            if (!selectedAnswer) {
                selectedAnswer = option;
                playChord(option); 
                disableOptionButtons();
                submitButton.disabled = false;
            }
        };
        optionsContainer.appendChild(button);
    });

    
    playChord(currentChord);
}
