console.log('js ok')

// Consegna
// L'utente indica TRAMITE DOM un livello di difficoltà in base al quale viene generata una griglia di 
// gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
// Consigli del giorno: :
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.


// VARIABILI
const selectDifficultyEasy = document.getElementById('easy');
const selectDifficultyNormal = document.getElementById('normal');
const selectDifficultyHard = document.getElementById('hard');
const resetGame = document.getElementById('reset');
const grid = document.getElementById('grid')
let attemps = 0;
const TOTAL_BOMBS = 16;
totalBombs = 16;
// dichiaro numeri per difficoltà
const numberEasy = getRandomNumber(1, 100);
const numberNormal = getRandomNumber(1, 81);
const numberHard = getRandomNumber(1, 49);

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


// RECUPERO LA GRIGLIA
const selectDifficultyEasy = document.getElementById('easy');
const selectDifficultyNormal = document.getElementById('normal');
const selectDifficultyHard = document.getElementById('hard');

function start() {
    // Cambio il tasto del bottone e lo chiamo ricomincia
    button.innerText = 'RESTART'

    grid.innerHTML = '';
    grid.style.display = 'flex';

    // Preparo quello che mi serve per il gioco 
    let attempts = 0;
    const totalBombs = 16;

    let columns;

    switch (select.value) {
        case "2":
            columns = 9;
            break;
        case "3":
            columns = 7;
            break;
        default:
            columns = 10;
            break;
    }

    const totalCells = columns * columns;

    const maxAttempts = totalCells - totalBombs;


    // GENERO UNA BOMBA
    const generateBombs = (totalBombs, totalNumber) => {
        const bombs = [];
        while (bombs.length < totalBombs) { // il numero di bombe è inferiore a 16
            const randNumber = getRandomNumber(1, totalNumber);
            if (!bombs.includes(randNumber)) { // Controllo se c'è nell'array di bombe
                bombs.push(randNumber);
            }
        }
        return bombs;
    }

    // GENERO LA GRIGLIA
    const generateGrid = (cellsNumber, cellsPerRow, bombs) => {
        for (let i = 1; i <= cellsNumber; i++) {
            const cell = createCell(i, cellsPerRow);
            cell.addEventListener('click', (event) => onCellClick(event.target, bombs, i));
            grid.appendChild(cell);
        }
    }

    // CREO LA CELLA
    function createCell(cellNumber, cellsPerRow) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerText = cellNumber;
        const wh = `calc(100% / ${cellsPerRow})`;
        cell.style.height = wh;
        cell.style.width = wh;
        return cell;
    }

    // Gestisco l'evento al click
    function onCellClick(clickedCell, bombs, number) {
        clickedCell.removeEventListener("click", onCellClick);
        console.log('ciao');

        // Controllo se è una bomba
        if (bombs.includes(number)) {
            gameOver(bombs, attempts, true);
        } else {
            clickedCell.classList.add("safe")
            attempts++;
            if (attempts === maxAttempts) {
                gameOver(bombs, attempts, false);
            }
        }
    }

    // FINE PARTITA
    const gameOver = (bombs, attempts, hasLost) => {
        const allCells = grid.querySelectorAll('.cell');

        for (let i = 0; i < allCells.length; i++) {
            allCells[i].removeEventListener('click', onCellClick);
        }

        showBoms(bombs);

        const message = document.createElement('h2');
        message.className = 'message';

        const messageText = hasLost ? `HAI PERSO, RIPROVA (questo è il tuo punteggio ${attempts})` : `HAI VINTO!!!!!!!!`
        message.innerText = messageText;
        grid.appendChild(message);



    }

    const showBoms = (bombs) => {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < totalCells; i++) {
            const cell = cells[i];
            const cellNumber = parseInt(cell.innerText);
            if (bombs.includes(cellNumber)) {
                cell.classList.add('bomb');
            }
        }
    }


    // Esecuzione

    const bombs = generateBombs(totalBombs, totalCells)
    console.log(bombs);

    generateGrid(totalCells, columns, bombs);
}

button.addEventListener("click", () => start());

// evento sul click in easy
selectDifficultyEasy.addEventListener('click', function() {
        start()

        selectDifficultyEasy.classList.add('disabled');
        selectDifficultyNormal.classList.add('d-none');
        selectDifficultyHard.classList.add('d-none');

    })
    // evento sul click in medium
selectDifficultyNormal.addEventListener('click', function() {
        start()
        selectDifficultyEasy.classList.add('d-none');
        selectDifficultyNormal.classList.add('disable');
        selectDifficultyHard.classList.add('d-none');
    })
    // evento sul click in hard
selectDifficultyHard.addEventListener('click', function() {
        start()

        selectDifficultyEasy.classList.add('d-none');
        selectDifficultyNormal.classList.add('d-none');
        selectDifficultyHard.classList.add('disable');

    })
    // evento bottono reset
resetGame.addEventListener('click', function() {
    grid.innerHTML = "";
    selectDifficultyEasy.classList.remove('disabled');
    selectDifficultyNormal.classList.remove('disabled');
    selectDifficultyHard.classList.remove('disabled');
    selectDifficultyEasy.classList.remove('d-none');
    selectDifficultyNormal.classList.remove('d-none');
    selectDifficultyHard.classList.remove('d-none');

})