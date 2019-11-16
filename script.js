
var sudokuMatrix = [
    [4,3,5,2,6,9,7,8,1],
    [6,8,2,5,7,1,4,9,3],
    [1,9,7,8,3,4,5,6,2],
    [8,2,6,1,9,5,3,4,7],
    [3,7,4,6,8,2,9,1,5],
    [9,5,1,7,4,3,6,2,8],
    [5,1,9,3,2,6,8,7,4],
    [2,4,8,9,5,7,1,3,6],
    [7,6,3,4,1,8,2,5,9]
];
var gameMatrix;

// Inserting 9 child div with class "miniGrid" into "sudokuGrid" Div
function appendMiniGridDivs() {
    for(var i = 1; i <= 9; i++) {
        var sudokuGrid = document.getElementById("sudokuGrid");
        var miniGrid = document.createElement("div");

        miniGrid.setAttribute("class", "miniGrid");
        sudokuGrid.appendChild(miniGrid);
    }
}

appendMiniGridDivs();

// Inserting 9 child div with class "cell" into each "miniGrid" div
function appendCellDivs() {
    var miniGrid = document.getElementsByClassName('miniGrid');
    var cellCount = 0;
    for(var i = 0; i < miniGrid.length; i++) {
        for(var j = 0; j < 9; j++) {
            cellCount++;
            var cell = document.createElement("div");

            if(j == 3 || j == 4 || j == 5 || i == 3 || i == 4 || i == 5) {
                cell.setAttribute("class", "cell grey");
            } else {
                cell.setAttribute("class", "cell lightGrey");
            }
            cell.setAttribute("id", "cell" + i + j);          

            miniGrid[i].appendChild(cell);
        }
    }
}

appendCellDivs();

var primaryCellId = "";

// After clicking primary "cell" divs..
function primaryCellClick() {
    primaryCellId = (this.id).split("cell")[1];
    console.log("primary Cell: " + this.id);
}

// After clicking secondary "cell" divs
function secondaryCellClick() {
    var secondaryCellVal = Number(this.textContent);
    
    if(primaryCellId !== "") {
        var tempCell = document.getElementById("cell" + primaryCellId);
        tempCell.textContent = secondaryCellVal;
        // console.log(typeof(primaryCellId));
        gameMatrix[Number(primaryCellId[0])][Number(primaryCellId[1])] = secondaryCellVal;
        primaryCellId = "";
    }
    console.log("Secondary Cell");
}

// On double clicking a primary "cell" div reset it's value
function primaryCellDblClick() {
    if(primaryCellId !== "") {
        document.getElementById("cell" + primaryCellId).textContent = "";
        gameMatrix[Number(primaryCellId[0])][Number(primaryCellId[1])] = "";
    }
    console.log("Double Click")
}

// Adding click listener on each "cell" div
function addClickToCell() {
    var cellDivs = document.querySelectorAll(".cell");

    for(var i = 0; i < cellDivs.length; i++) {
        if(i < 81) {
            cellDivs[i].addEventListener("click", primaryCellClick);
            cellDivs[i].addEventListener("dblclick", primaryCellDblClick);
        } else {
            cellDivs[i].addEventListener("click", secondaryCellClick);
        }
        
    }
}

addClickToCell();

function random(number){
  return Math.floor(Math.random() * number);
}

function randomMatrix() {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            var iRand = random(9);
            var jRand = random(9);
            gameMatrix[iRand][jRand] = sudokuMatrix[iRand][jRand];
        }
    }
}

function newGame() {
    var finalAnsDiv = document.getElementById("finalAnsDiv");
    if(finalAnsDiv !== null) {
        document.querySelector("body").removeChild(finalAnsDiv);
    }
    console.log("game start");
    gameMatrix = [
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
    ];

    randomMatrix();

    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            var cellDiv = document.getElementById("cell" + i + j);
            if(gameMatrix[i][j] !== "") {
                cellDiv.removeEventListener("click", primaryCellClick);
                cellDiv.removeEventListener("dblclick", primaryCellDblClick);

                cellDiv.style.color = "black";
                cellDiv.style.fontWeight = "normal";
                // cellDiv.style.fontSize = "17px";
            } else {
                cellDiv.addEventListener("click", primaryCellClick);
                cellDiv.addEventListener("dblclick", primaryCellDblClick);

                cellDiv.style.color = "blue";
                cellDiv.style.fontWeight = "bold";
            }
            cellDiv.textContent = gameMatrix[i][j];
        }
    }
}
newGame();

function findDuplicates(arr) {
  var arrObj = {};

  for(var i = 0; i < arr.length; i++) {
    if(arrObj[arr[i]] !== undefined || arr[i] === "") {
      return true
    } else {
        arrObj[arr[i]] = 1;
    }
  }
  
  return false;
}

function showFinalSudoku() {
    var finalAnsDiv = document.createElement("div");
    finalAnsDiv.setAttribute("id", "finalAnsDiv");

    document.querySelector("body").appendChild(finalAnsDiv);
    var finalAns = document.getElementById("finalAnsDiv");

    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            var cellDiv = document.createElement("div");
            cellDiv.setAttribute("class", "cell");
            cellDiv.textContent = sudokuMatrix[i][j];
            finalAns.appendChild(cellDiv)
        }
    }
}

function submitGame() {
    console.log("Submit");

    for(var i = 0; i < 9; i++) {
        if(findDuplicates(gameMatrix[i])) {
            alert("You Lose");
            showFinalSudoku();
            return;
        }
    }

    for(var j = 0; j < 9; j++) {
        var arrObj = {}
        for(var i = 0; i < 9; i++) {
            // if(findDuplicates(gameMatrix[i][j])) {
            //     alert("You lose");
            //     return;
            // }
            if(arrObj[gameMatrix[i][j]] !== undefined || arrObj[gameMatrix[i][j]] === "") {
                alert("You Lose!");
                showFinalSudoku();
                return
            } else {
                arrObj[gameMatrix[i][j]] = 1;
            }
        }
    }

    var j = 0;
    for(var k = 1; k <= 9; k++) {
      var l, m;
      var checkObj = {};
      
      if(k < 4) {
        l = 0;
      } else if(k < 7) {
        l = 3
      } else {
        l = 6
      }
      if(k == 1 || k == 4 || k == 7) {
        m = 0;
      }
      
      for(i = l; i < l+3; i++) {
        for(j = m; j < m+3; j++) {
            if(checkObj[gameMatrix[i][j]] !== undefined || checkObj[gameMatrix[i][j]] === "") {
                alert("You Lose!");
                showFinalSudoku();
                return;
            } else {
                checkObj[gameMatrix[i][j]] = 1;
            }
        }
      }
      m = j;
    }

    alert("Hurray! You Win!");
    showFinalSudoku();
    return;
}