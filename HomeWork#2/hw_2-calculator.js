
// function blinker() {
//     $('.blink-me').fadeOut(200);
//     $('.blink-me').fadeIn(200);
// }
// setInterval(blinker, 500);

// -------------------------------------


function Calculator() {

    function mapArray(data, actions) {
        let result = null;

        data.forEach((item, index) => {
            if (!result) {
                result = item;
            } else {
                result = mapValues([result, item], actions[index - 1])
            }
        })
        return result;
    }


    function mapValues(data, action) {
        let result = 0;

        data.map((item, index) => {

            console.log('swithAction', action, data)
            if (index === 0) {
                result = item;
            } else {

                switch (action) {
                    case '-':
                        result -= item;
                        break;
                    case '+':
                        result += item;
                        break;
                    case 'x':
                        result *= item;
                        break;
                    case '/':
                        result = result / item;
                        break;
                }

                console.log('switch', result);

            }
        })

        return result;
    }


    this.returnResult = (data, action) => {
        let result = 0;

        if (action.length > 1) {
            result = mapArray(data, action);
        } else {
            result = mapValues(data, action[0]);
        }

        return result;
    }

}


$(document).ready(() => {

    let calc = new Calculator();
// console.log(calc.returnResult([5, 2, 8, 10], ['-', '*', '-']))

    let operationDisplay = $('.calc-operation');
    let mainDisplay = $('.calc-typed');

    let numbersArr = $('.number');
    let actionsArr = $('.action');

    let typedNumbers = [];
    let typedActions = [];

    let currentNumber = '';
    let nextReset = false;
    let prevIsNumber = false;


    $(numbersArr).on('click', (e) => {
        if (nextReset) {
            reset();
        }
        prevIsNumber = true;
        currentNumber += $(e.target).text()
        displayOperation($(e.target).text())
    })


    $(actionsArr).on('click', (e) => {
        if (nextReset) {
            reset();
        }
        if (!prevIsNumber) {
            return;
        }

        prevIsNumber = false;
        typedNumbers.push(parseInt(currentNumber));
        typedActions.push($(e.target).text());
        displayOperation($(e.target).text());

        currentNumber = '';
    })


    $('.reset').on('click', (e) => {
        reset();
    })


    $('.equation-sign').on('click', () => {
        let data = currentNumber ? typedNumbers.push(parseInt(currentNumber)) : []

        if (typedNumbers.length === typedActions.length) {
            return
        }

        currentNumber = '';
        computeData();
        nextReset = true;
    })


    function reset() {
        currentNumber = '';
        typedNumbers = [];
        typedActions = [];
        $(operationDisplay).text('');
        $('.result').text('');
        nextReset = false;
        prevIsNumber = false;
    }


    function displayOperation(target) {

        let targetData = $(operationDisplay).text() + target;
        let operationDisplayText = $(operationDisplay).text();

        $(operationDisplay).text(targetData);
    }


    function computeData() {
        let result = calc.returnResult(typedNumbers, typedActions);
        result = Math.round(result * 10) / 10;

        $('.result').text(result);
    }

})