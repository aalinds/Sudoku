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
            // IF adds numbers inside to cells of last "miniGrid" div..
            if(i == miniGrid.length-1) {
                cell.textContent = j;
            }

            cell.setAttribute("class", "cell");
            cell.setAttribute("id", "cell" + cellCount)

            miniGrid[i].appendChild(cell);
        }
    }
}

appendCellDivs();

var primaryCellId = "";

// After clicking primary "cell" divs..
function primaryCellClick() {
    primaryCellId = parseInt((this.id).split("cell")[1]);
}

// After clicking secondary "cell" divs
function secondaryCellClick() {
    var secondaryCellVal = Number(this.textContent);
    
    if(primaryCellId !== "") {
        var tempCell = document.getElementById("cell" + primaryCellId);
        tempCell.textContent = secondaryCellVal;
        primaryCellId = "";
    }
}

// On double clicking a primary "cell" div reset it's value
function primaryCellDblClick() {
    if(primaryCellId !== "") {
        document.getElementById("cell" + primaryCellId).textContent = "";
    }
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

function newGame() {
    alert("new Game")
}