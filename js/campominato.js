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


// funzioni
// calcolo un numero casuale 
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// funzione per creare le celle
function getCells(index) {
    const cell = document.createElement('div');
    cell.className = 'col-auto align-items-center justify-content-center';
    grid.appendChild(cell);
    cell.setAttribute('id', index + 1);
    cell.innerHTML = "<span class=cursor>" + cell.id + "</span>";


    return cell;
}



// cella selezionata
function getColoredCells(totalCells, mode) {
    for (let i = 0; i < totalCells; i++) {
        const cell = getCells(i);
        cell.classList.add(mode);
        cell.addEventListener('click', function() {
            cell.classList.toggle('bg-lightblue');
        })
    }
}

// VARIABILI
const selectDifficultyEasy = document.getElementById('easy');
const selectDifficultyNormal = document.getElementById('normal');
const selectDifficultyHard = document.getElementById('hard');
const resetGame = document.getElementById('reset');
const grid = document.getElementById('grid')

// dichiaro numeri per difficoltà
const numberEasy = getRandomNumber(1, 100);
const numberNormal = getRandomNumber(1, 81);
const numberHard = getRandomNumber(1, 49);


// evento sul click in easy
selectDifficultyEasy.addEventListener('click', function() {
        grid.innerHTML = '';
        getColoredCells(100, 'celleasy');

        selectDifficultyEasy.classList.add('disabled');
        selectDifficultyNormal.classList.add('d-none');
        selectDifficultyHard.classList.add('d-none');

    })
    // evento sul click in medium
selectDifficultyNormal.addEventListener('click', function() {
        grid.innerHTML = '';
        getColoredCells(81, 'cellnormal');
        selectDifficultyEasy.classList.add('d-none');
        selectDifficultyNormal.classList.add('disable');
        selectDifficultyHard.classList.add('d-none');
    })
    // evento sul click in hard
selectDifficultyHard.addEventListener('click', function() {
        grid.innerHTML = '';
        getColoredCells(49, 'cellhard');

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