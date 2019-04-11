var scores = [0, 0];
var roundScores = 0;
var activePlayer = +false;
var playable = true;
var gameTarget;

function startGame() {
    gameTarget = document.getElementById("goalInput").value;
    document.querySelector('.warning').style.display = 'none';
}

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (playable && gameTarget) {

        //display dice with random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'assets/dice-' + dice + '.png'

        //add random number to current score 
        if (dice !== 1) {
            //add number to current scroe
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            // current score = 0 and active player change 
            diceDOM.classList.add('strike')
            setTimeout(function () {
                diceDOM.classList.remove('strike')
            }, 200)
            nextPlayer();
        }

    } else {
        document.querySelector('.warning').style.display = 'block';
    }




})


document.querySelector('.btn-hold').addEventListener('click', function () {

    if (playable) {

        // add to final score
        scores[activePlayer] += roundScores
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // check for a winner
        if (scores[activePlayer] >= gameTarget) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';

            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none'

            playable = false;

        } else {
            nextPlayer();
        }

    }




})

document.querySelector('.btn-new').addEventListener('click', function () {

    scores = [0, 0];
    roundScores = 0;
    var activePlayer = +false;
    playable = true;

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.dice').style.display = 'none'

})


function nextPlayer() {
    roundScores = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScores;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = +!activePlayer;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}