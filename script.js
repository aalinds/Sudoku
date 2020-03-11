let sudokuMatrix;
let gameMatrix;
let compareMatrix;

function randomMatrix(firstMatrix, secondMatrix) {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 9; j++) {
      var iRand = Math.floor(Math.random() * 9);
      var jRand = Math.floor(Math.random() * 9);
      firstMatrix[iRand][jRand] = secondMatrix[iRand][jRand];
      //   firstMatrix[i][j] = secondMatrix[i][j];
    }
  }
  return firstMatrix;
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

function solve(matrix) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (matrix[x][y] == '') {
        for (let n = 1; n < 10; n++) {
          if (possible(matrix, x, y, n)) {
            matrix[x][y] = n;
            solve(matrix);
            matrix[x][y] = '';
          }
        }
        return;
      }
    }
  }
  //   compareMatrix = matrix.map(res => res.slice());
}

function sudoku_generator() {
  sudokuMatrix = [
    [4, 3, 5, 2, 6, 9, 7, 8, 1],
    [6, 8, 2, 5, 7, 1, 4, 9, 3],
    [1, 9, 7, 8, 3, 4, 5, 6, 2],
    [8, 2, 6, 1, 9, 5, 3, 4, 7],
    [3, 7, 4, 6, 8, 2, 9, 1, 5],
    [9, 5, 1, 7, 4, 3, 6, 2, 8],
    [5, 1, 9, 3, 2, 6, 8, 7, 4],
    [2, 4, 8, 9, 5, 7, 1, 3, 6],
    [7, 6, 3, 4, 1, 8, 2, 5, 9]
  ];
}

function removeListener() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var cellDiv = document.getElementById('cell' + i + j);
      if (gameMatrix[i][j] !== '') {
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
      cellDiv.textContent = gameMatrix[i][j];
    }
  }
}

function showFinalSudoku() {
  var finalAnsDiv = document.createElement('div');
  finalAnsDiv.setAttribute('id', 'finalAnsDiv');

  document.querySelector('body').appendChild(finalAnsDiv);
  var finalAns = document.getElementById('finalAnsDiv');

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var cellDiv = document.createElement('div');
      cellDiv.setAttribute('class', 'cell');
      cellDiv.textContent = sudokuMatrix[i][j];
      finalAns.appendChild(cellDiv);
    }
  }
}

function submitGame() {
  //   solve(gameMatrix);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (gameMatrix[i][j] !== sudokuMatrix[i][j]) {
        alert('You Lose');
        showFinalSudoku();
        return;
      }
    }
  }

  alert('Hurray! You Win!');
  showFinalSudoku();
  console.log('hi');
}

function newGame() {
  var finalAnsDiv = document.getElementById('finalAnsDiv');
  if (finalAnsDiv !== null) {
    document.querySelector('body').removeChild(finalAnsDiv);
  }
  console.log('game start');
  sudoku_generator();
  gameMatrix = [
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
  gameMatrix = randomMatrix(gameMatrix, sudokuMatrix);
  removeListener();
  //   compareMatrix = gameMatrix.map(res => res.slice());
}

appendMiniGridDivs();
appendCellDivs();
addClickToCell();
newGame();
