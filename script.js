let generatedMatrix;
let userMatrix;

const changeDifficultyHandler = event => {
  newGame();
};

function removeListener() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var cellDiv = document.getElementById('cell' + i + j);
      if (userMatrix[i][j] !== '') {
        cellDiv.removeEventListener('click', primaryCellClick);
        cellDiv.removeEventListener('dblclick', primaryCellDblClick);

        cellDiv.style.color = 'black';
        cellDiv.style.fontWeight = 'normal';
      } else {
        cellDiv.addEventListener('click', primaryCellClick);
        cellDiv.addEventListener('dblclick', primaryCellDblClick);

        cellDiv.style.color = 'blue';
        cellDiv.style.fontWeight = 'bold';
      }
      cellDiv.textContent = userMatrix[i][j];
    }
  }
}

function showFinalSudoku() {
  let finalAnsDiv = document.getElementById('finalAnsDiv');

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var cellDiv = document.createElement('div');
      cellDiv.setAttribute('class', 'cell');
      cellDiv.textContent = generatedMatrix[i][j];
      finalAnsDiv.appendChild(cellDiv);
    }
  }
}

function shuffle(arr) {
  var currIndex = arr.length,
    tempVal,
    randomIndex;

  while (0 !== currIndex) {
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;

    tempVal = arr[currIndex];
    arr[currIndex] = arr[randomIndex];
    arr[randomIndex] = tempVal;
  }

  return arr;
}

function possible(matrix, x, y, n) {
  for (let i = 0; i < 9; i++) {
    if (matrix[i][y] == n) return false;
  }

  for (let j = 0; j < 9; j++) {
    if (matrix[x][j] == n) return false;
  }

  let x0 = Math.floor(x / 3) * 3;
  let y0 = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[x0 + i][y0 + j] == n) return false;
    }
  }

  return true;
}

function fillSudokuDiagonal() {
  nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 9; i += 3) {
    nums = shuffle(nums);
    let x0 = Math.floor(i / 3) * 3;
    let y0 = Math.floor(i / 3) * 3;
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        generatedMatrix[x0 + i][y0 + j] = nums[count];
        count++;
      }
    }
  }
}

function submitGame() {
  event.path[0].disabled = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (userMatrix[i][j] !== generatedMatrix[i][j]) {
        alert('You Lose');
        showFinalSudoku();
        return;
      }
    }
  }

  alert('Hurray! You Win!');
  showFinalSudoku();
}

function solve(matrix, possibilities) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (matrix[x][y] == '') {
        for (let n = 1; n < 10; n++) {
          if (possible(matrix, x, y, n)) {
            matrix[x][y] = n;
            solve(matrix, possibilities);
            matrix[x][y] = '';
          }
        }
        return;
      }
    }
  }
  possibilities[0] = possibilities[0] + 1;
  return;
}

function generator_solver(matrix) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (matrix[x][y] == '') {
        for (let n = 1; n < 10; n++) {
          if (possible(matrix, x, y, n)) {
            matrix[x][y] = n;
            returned_val = generator_solver(matrix);
            if (returned_val == 'GENERATED') {
              return 'GENERATED';
            }
            matrix[x][y] = '';
          }
        }
        return;
      }
    }
  }
  return 'GENERATED';
}

function removeRandomNums(arr) {
  let difficulty = document.getElementById('difficulty').value;
  let count;
  if (difficulty === 'easy') {
    count = 20;
  } else if (difficulty === 'medium') {
    count = 30;
  } else if (difficulty === 'hard') {
    count = 40;
  }
  while (count >= 0) {
    let possibilities = [0];
    let i = Math.floor(Math.random() * 9);
    let j = Math.floor(Math.random() * 9);

    if (arr[i][j] !== '') {
      let tempArr = arr.map(row => [...row]);
      tempArr[i][j] = '';
      solve(tempArr, possibilities);
      if (possibilities[0] === 1) {
        arr[i][j] = '';
        count--;
      }
    }
  }
}

function sudokuGenerator() {
  fillSudokuDiagonal();
  generator_solver(generatedMatrix);
  userMatrix = generatedMatrix.map(row => [...row]);
  removeRandomNums(userMatrix);
}

function newGame() {
  document.getElementById('finalAnsDiv').innerHTML = '';
  document.getElementById('submitBtn').disabled = false;

  generatedMatrix = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
  ];
  sudokuGenerator();
  removeListener();
}

appendMiniGridDivs();
appendCellDivs();
addClickToCell();
newGame();
