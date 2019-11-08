console.clear();

function PhoneActionsHandler() {
    let buttonsValues = {
        arr1: ['a', 'b', 'c'],
        arr2: ['d', 'e', 'f'],
        arr3: ['g', 'h', 'i']
    }

    let display = document.getElementById('display');
    let counter = 0;
    let timer = null;
    let interval = null;
    let resetBtnData = false;
    let currentText = '';
    let currentTextIndex = '';
    let prevCase;
    let currentCase;
    let resetBtn = document.getElementById('reset');


    const keydownReset = function () {
        let count = 0;

        interval = setInterval(() => {
            removeLastCharacter();

            if (count === 6) {
                removeAllDataFromDisplay();
                clearInterval(interval);
            }

            count++;
        }, 500);
    }

    const keyupReset = function () {
        clearInterval(interval);
    }


    resetBtn.addEventListener('mouseup', keyupReset);
    resetBtn.addEventListener('mousedown', keydownReset);


    this.numBtnClick = function (btn) {

        if (counter > 2) {
            counter = 0;
        }

        currentCase = btn;

        for (let i = 1; i < 4; i++) {
            if (btn === parseInt(i)) {
                let arr = buttonsValues['arr' + i]
                switchCharacter(arr);
                prevCase = btn;
                return;
            }
        }

    }


    this.charBtnClick = function (btn) {

        switch (btn) {
            case 'star':
                switchCharacter('*');
                prevCase = btn;
                break;
            case 'space':
                switchCharacter('&nbsp;');
                prevCase = btn;
                break;
            case 'sharp':
                switchCharacter('#');
                prevCase = btn;
                break;
        }

    }


    this.actionBtnClick = function (btn) {
        switch (btn) {
            case 'reset':
                removeLastCharacter();
                prevCase = btn;
                break;
        }
    }


    const removeLastCharacter = function () {
        let text = display.innerText;
        let textLength = text.length;

        if (textLength < 1) {
            return;
        }
        resetBtnState();
        console.log('action');

        text = text.substring(0, textLength - 1);
        display.innerText = text;
    }


    const resetBtnState = function () {
        counter = 0;
        resetBtnData = true;
    }


    const setTime = function (time) {
        timer = setTimeout(() => {
            console.log('timer');
            resetBtnState();
        }, time)
    }


    const switchCharacter = function (arr) {
        let character = arr;

        clearTimeout(timer);
        if (prevCase && currentCase !== prevCase) {
            resetBtnState();
        }

        if (typeof arr === 'string') {
            resetBtnState();
            switchAnotherCharacter(character);
            return;
        }

        console.log(typeof arr)

        setTime(3000);

        if (!resetBtnData) {

            if (display.innerText.length > 0) {
                currentText = display.innerText;
                display.innerText = '';
                display.innerText += currentText.substring(0, currentText.length - 1) + arr[counter];
            } else {
                display.innerText += arr[counter];
            }

        } else {
            display.innerText += arr[counter];
            resetBtnData = false;
            currentText = display.innerText;
            currentTextIndex = currentText.length - 1;
        }

        counter++;
    }


    const switchAnotherCharacter = function (str) {
        display.innerHTML += str;

        resetBtnData = false;
        currentText = display.innerText;
    }


    const removeAllDataFromDisplay = function () {
        display.innerText = '';
    }

}


let phone = new PhoneActionsHandler();
