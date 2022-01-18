const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


// RECUPERO LA GRIGLIA
const button = document.getElementById("start");




const selectDifficultyEasy = document.getElementById('easy');
const selectDifficultyNormal = document.getElementById('normal');
const selectDifficultyHard = document.getElementById('hard');
const resetGame = document.getElementById('reset');
const grid = document.getElementById('grid');
const banner = document.getElementById('banner')
console.log(selectDifficultyEasy)


function start(mode) {
    // Cambio il tasto del bottone e lo chiamo ricomincia
    resetGame.innerText = 'RESTART'

    grid.innerHTML = '';
    grid.style.display = 'flex';

    // Preparo quello che mi serve per il gioco 
    let attempts = 0;
    const totalBombs = 16;

    let columns;

    switch (mode) {
        case "normal":
            columns = 9;
            break;
        case "hard":
            columns = 7;
            break;
        default:
            columns = 10;
            break;
    }

    const totalCells = columns * columns;

    const maxAttempts = totalCells - totalBombs;
    let bombs = [];

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
            cell.addEventListener('click', onCellClick);
            grid.appendChild(cell);
        }
    }

    // CREO LA CELLA
    function createCell(cellNumber, cellsPerRow) {
        const cell = document.createElement("div");
        cell.id = cellNumber;
        cell.className = "cell";
        cell.innerText = cellNumber;
        const wh = `calc(100% / ${cellsPerRow})`;
        cell.style.height = wh;
        cell.style.width = wh;
        return cell;
    }

    // Gestisco l'evento al click
    function onCellClick(event) {
        const cell = event.target;
        cell.removeEventListener("click", onCellClick);

        // Controllo se è una bomba
        let number = parseInt(cell.id);

        if (bombs.includes(number)) {
            gameOver(bombs, attempts, true);
        } else {
            cell.classList.add("safe")
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

        const message = document.createElement('h5');
        message.className = 'message m-2';

        const messageText = hasLost ? `<div class="h1">HAI PERSO, RIPROVA</div> <br> <div>Il tuo punteggio è: <span class="h1 m-3 align-sup">${attempts}</span></div>` : `HAI VINTO!!!!!!!!`
        message.innerHTML = messageText;
        banner.appendChild(message);
        banner.appendChild(message);



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

    bombs = generateBombs(totalBombs, totalCells)
    console.log(bombs);

    generateGrid(totalCells, columns, bombs);
}



// evento sul click in easy
selectDifficultyEasy.addEventListener('click', function() {
        start('easy')

        selectDifficultyEasy.classList.add('disabled');
        selectDifficultyNormal.classList.add('d-none');
        selectDifficultyHard.classList.add('d-none');

    })
    // evento sul click in medium
selectDifficultyNormal.addEventListener('click', function() {
        start('normal')
        selectDifficultyEasy.classList.add('d-none');
        selectDifficultyNormal.classList.add('disable');
        selectDifficultyHard.classList.add('d-none');
    })
    // evento sul click in hard
selectDifficultyHard.addEventListener('click', function() {
        start('hard');

        selectDifficultyEasy.classList.add('d-none');
        selectDifficultyNormal.classList.add('d-none');
        selectDifficultyHard.classList.add('disable');

    })
    // evento bottono reset
resetGame.addEventListener('click', function() {
    grid.innerHTML = "";
    banner.innerHTML = "";
    resetGame.innerHTML = "Reset";
    selectDifficultyEasy.classList.remove('disabled');
    selectDifficultyNormal.classList.remove('disabled');
    selectDifficultyHard.classList.remove('disabled');
    selectDifficultyEasy.classList.remove('d-none');
    selectDifficultyNormal.classList.remove('d-none');
    selectDifficultyHard.classList.remove('d-none');

})