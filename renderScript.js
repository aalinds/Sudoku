// Inserting 9 child rows with class "miniGrid" into "sudokuGrid" Div
function appendMiniGridDivs() {
  let sudokuGrid = document.getElementById('sudokuGrid');

  for (let i = 1; i <= 9; i++) {
    let miniGrid = document.createElement('div');
    miniGrid.setAttribute('class', 'miniGrid');
    sudokuGrid.appendChild(miniGrid);
  }
}

// Inserting 9 child cell with class "cell" into each "miniGrid" row
function appendCellDivs() {
  let miniGrid = document.getElementsByClassName('miniGrid');

  for (let i = 0; i < miniGrid.length; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.createElement('div');

      if (j == 3 || j == 4 || j == 5 || i == 3 || i == 4 || i == 5) {
        cell.setAttribute('class', 'cell');
        cell.style.background = 'white';
      } else {
        cell.setAttribute('class', 'cell');
        cell.style.background = 'darkgrey';
      }
      cell.setAttribute('id', 'cell' + i + j);

      miniGrid[i].appendChild(cell);
    }
  }
}

let primaryCellId = '';

// After clicking primary "cell" divs..
function primaryCellClick() {
  primaryCellId = this.id.split('cell')[1];
  console.log('primary Cell: ' + this.id);
}

// After clicking secondary "cell" divs
function secondaryCellClick() {
  let secondaryCellVal = Number(this.textContent);

  if (primaryCellId !== '') {
    let tempCell = document.getElementById('cell' + primaryCellId);
    tempCell.textContent = secondaryCellVal;
    // console.log(typeof(primaryCellId));
    userMatrix[Number(primaryCellId[0])][
      Number(primaryCellId[1])
    ] = secondaryCellVal;
    primaryCellId = '';
  }
  console.log('Secondary Cell');
}

// On double clicking a primary "cell" div reset it's value
function primaryCellDblClick() {
  if (primaryCellId !== '') {
    document.getElementById('cell' + primaryCellId).textContent = '';
    userMatrix[Number(primaryCellId[0])][Number(primaryCellId[1])] = '';
  }
  console.log('Double Click');
}

// Adding click listener on each "cell" div
function addClickToCell() {
  let cellDivs = document.querySelectorAll('.cell');

  for (let i = 0; i < cellDivs.length; i++) {
    if (i < 81) {
      cellDivs[i].addEventListener('click', primaryCellClick);
      cellDivs[i].addEventListener('dblclick', primaryCellDblClick);
    } else {
      cellDivs[i].addEventListener('click', secondaryCellClick);
    }
  }
}
