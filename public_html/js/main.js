window.addEventListener('load', () => {
  const form = document.getElementById('newPlayerForm');
  const input = document.getElementById('newPlayerName');
  const playersList = document.getElementById('playersContainer');
  const errorContainer = document.getElementById('errorContainer');
  const errorMSG = document.getElementById('errorMSG');
  const resetGameButton = document.getElementById('resetGame');
  const newGameButton = document.getElementById('newGame');
  const saveGameButton = document.getElementById('saveGame');

  let allPlayers = [];
  const startingPlayers = playersList.children.length;

  // handle all errors
  let handleError = (error) => {
    switch (error) {
      // no players added
      case 'noPlayers':
        errorMSG.innerHTML = 'Add players to begin.';
        errorContainer.style.display = 'flex';
        break;
      // name field empty
      case 'noNameEntered':
        errorMSG.innerHTML = 'Please enter a valid player name.';
        errorContainer.style.display = 'flex';
        break;
      // name exceeds 18 characters
      case 'nameTooLong':
        errorMSG.innerHTML = 'Player name cannot exceed 18 characters.';
        input.value = '';
        errorContainer.style.display = 'flex';
        break;
      // player already exists
      case 'existingPlayer':
        errorMSG.innerHTML = 'A player with that name already exists. Please try again.';
        errorContainer.style.display = 'flex';
        break;
      // failed to add new player
      case 'failedToAddPlayer':
        errorMSG.innerHTML = 'Failed to add player. Please try again.';
        input.value = '';
        errorContainer.style.display = 'flex';
        break;
      // failed to remove player
      case 'failedToRemovePlayer':
        errorMSG.innerHTML = 'Failed to remove player. Please try again.';
        errorContainer.style.display = 'flex';
        break;
      // failed to add points
      case 'failedToAddPoint':
        errorMSG.innerHTML = 'Failed to add point. Please try again.';
        errorContainer.style.display = 'flex';
        break;
      // failed to remove points
      case 'failedToSubtractPoint':
        errorMSG.innerHTML = 'Failed to remove point. Please try again.';
        errorContainer.style.display = 'flex';
        break;
      // save game in dev
      case 'saveGame':
        errorMSG.innerHTML = 'This feature is still in development. Please try again later.';
        errorContainer.style.display = 'flex';
        break;
      // no error or clear current errors
      case 'noError':
      default:
        errorMSG.innerHTML = '';
        errorContainer.style.display = 'none';
        break;
    }
  };

  // check if no players added
  if (!playersList.children.length) {
    // console.log('players list length check');
    handleError('noPlayers');
  }

  // remove player from list
  let removePlayerFromList = (p) => {
    // console.log(`remove player ${JSON.stringify(p)} from list`);
    try {
      playerToRemove = document.getElementById('player' + p.number);
      playersList.removeChild(playerToRemove);
      // console.log(allPlayers);
      allPlayers.splice(p.number - 1, 1);
      // console.log(allPlayers);

      if (!playersList.children.length) {
        // console.log('players list length check');
        handleError('noPlayers');
      }
    } catch (e) {
      console.log(e);
      handleError('failedToRemovePlayer');
      return;
    }
  };

  // remove points from player
  let subtractPoint = (p) => {
    // console.log(`subtract point from player: ${JSON.stringify(p)}`);
    try {
      inputToSubtractFrom = document.getElementById('scorePlayer' + p.number);
      inputToSubtractFrom.value = Number(inputToSubtractFrom.value) - 1;
    } catch (e) {
      console.log(e);
      handleError('failedToSubtractPoint');
      return;
    }
  };

  // add points to player
  let addPoint = (p) => {
    // console.log(`add point to player: ${JSON.stringify(p)}`);
    try {
      inputToAddTo = document.getElementById('scorePlayer' + p.number);
      inputToAddTo.value = Number(inputToAddTo.value) + 1;
    } catch (e) {
      console.log(e);
      handleError('failedToAddPoint');
      return;
    }
  };

  // handle creating and adding players and elements to DOM and array
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const playerNumber = allPlayers.length + 1;
    const playerName = input.value;
    const playerScore = 0;

    // valid name field input
    if (!playerName) {
      handleError('noNameEntered');
      return;
    }

    // valid name field length
    if (playerName.length > 18) {
      handleError('nameTooLong');
      return;
    }

    // setup player class
    class Player {
      constructor(number, name, score) {
        this.number = number;
        this.name = name;
        this.score = score;
      }
    }

    // create new player based on inputs
    const newPlayer = new Player(playerNumber, playerName, playerScore);
    // console.log(newPlayer);

    // add player to DOM and array
    let addPlayerToList = (p) => {
      try {
        handleError('noError');

        // console.log(`adding player: ${JSON.stringify(p)}`);
        const players = document.createElement('div');
        players.classList.add('players');
        players.setAttribute('id', 'player' + p.number);

        const player = document.createElement('div');
        player.classList.add('player');

        players.appendChild(player);

        const content = document.createElement('div');
        content.classList.add('content');

        player.appendChild(content);

        const text = document.createElement('input');
        text.type = 'text';
        text.classList.add('text');
        text.value = p.name;
        text.setAttribute('readonly', 'readonly');

        content.appendChild(text);

        const actions = document.createElement('div');
        actions.classList.add('actions');

        player.appendChild(actions);

        const deleteBTN = document.createElement('button');
        deleteBTN.classList.add('delete');
        deleteBTN.setAttribute('id', 'deletePlayer' + p.number);
        deleteBTN.addEventListener('click', () => removePlayerFromList(p));

        actions.appendChild(deleteBTN);

        const deleteSymbol = document.createElement('span');
        deleteSymbol.classList.add('material-symbols-outlined');
        deleteSymbol.innerHTML = 'person_remove';

        deleteBTN.appendChild(deleteSymbol);

        const score = document.createElement('div');
        score.classList.add('score');

        players.appendChild(score);

        const subtractBTN = document.createElement('button');
        subtractBTN.classList.add('subtract');
        subtractBTN.setAttribute('id', 'subtractPlayer' + p.number);
        subtractBTN.addEventListener('click', () => subtractPoint(p));

        score.appendChild(subtractBTN);

        const subtractSymbol = document.createElement('span');
        subtractSymbol.classList.add('material-symbols-outlined');
        subtractSymbol.innerHTML = 'remove';

        subtractBTN.appendChild(subtractSymbol);

        const playerScore = document.createElement('input');
        playerScore.type = 'number';
        playerScore.classList.add('playersScore');
        playerScore.value = 0;
        playerScore.setAttribute('id', 'scorePlayer' + p.number);
        playerScore.setAttribute('readonly', 'readonly');

        score.appendChild(playerScore);

        const addBTN = document.createElement('button');
        addBTN.classList.add('add');
        addBTN.setAttribute('id', 'addPlayer' + p.number);
        addBTN.addEventListener('click', () => addPoint(p));

        score.appendChild(addBTN);

        const addSymbol = document.createElement('span');
        addSymbol.classList.add('material-symbols-outlined');
        addSymbol.innerHTML = 'add';

        addBTN.appendChild(addSymbol);

        playersList.appendChild(players);

        allPlayers.push(newPlayer);
        // console.log(allPlayers);

        // clean up after successful or failure of adding a new player
        if (playersList.children.length > startingPlayers) {
          // player added to dom
          input.value = '';
          return;
        } else {
          // failed to add player to dom
          handleError('failedToAddPlayer');
          return;
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };

    // call function to add new player
    addPlayerToList(newPlayer);
  });

  // reset game
  resetGameButton.addEventListener('click', () => {
    handleError('noError');

    // cant reset when no players are there
    if (playersList.children.length < 1) {
      handleError('noPlayers');
      return;
    }

    const playerElements = document.querySelectorAll('.playersScore');

    for (i = 0; i < playerElements.length; i++) {
      playerElements[i].value = 0;
      allPlayers.map((player) => {
        if (player.score > 0) player.score = 0;
      });
    }

    return;
  });

  // start new game
  newGameButton.addEventListener('click', () => {
    handleError('noError');
    allPlayers = [];
    playersList.innerHTML = '';
    input.value = '';
    input.focus();
    handleError('noPlayers');
    return;
  });

  // save game
  saveGameButton.addEventListener('click', () => {
    console.log('save game');
    handleError('noError');

    // cant save when no players are there
    if (playersList.children.length < 1) {
      console.log('empty players list');
      handleError('noPlayers');
      return;
    }

    handleError('saveGame');
    return;
  });
});
