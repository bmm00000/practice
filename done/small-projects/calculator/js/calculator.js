let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function clickOnButton(value) {
    if (isNaN(value)) {
        manageSymbol(value);
    } else {
        manageNumber(value);
    }
    screen.innerText = buffer;
}

function manageSymbol(symbol) {
    // if (symbol === "C") {
    //     buffer = "0";
    //     runningTotal = 0;
    // }
    switch(symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            intermOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            doMath(symbol);
            break;
    }
}

function doMath(symbol) {
    if (buffer === "0") {
        return; // don't execute the rest of the function
    }

    const numBuffer = parseInt(buffer); // it's the same as: const numBuffer = +buffer;

    if (runningTotal === 0) {
        runningTotal = numBuffer;
    } else {
        intermOperation(numBuffer);
    }
    previousOperator = symbol;

    buffer = "0";
}

function intermOperation(numBuffer) {
    if (previousOperator === "+") {
        runningTotal += numBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= numBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= numBuffer;
    } else {
        runningTotal /= numBuffer;
    }
}

function manageNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector(".buttons")
        .addEventListener("click", function(event) {
            clickOnButton(event.target.innerText);
        })
}

init();