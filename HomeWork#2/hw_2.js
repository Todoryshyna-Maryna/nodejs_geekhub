// Find in array: sum, min and max, replace min and max - create custom functions

// Create function which will return function with callback in arguments

// Create a function that will replace all number dividing three with ‘foo’,
// dividing seven with ‘bar’ and dividing three and seven with ‘foobar’. Function with n params.

// Create function with 2 string params. It must check if letters in the
// first correspond to the number of matches in second and return %.



let arr = [6, 9, 4, 18, 3, 10, 21, 7];

// ------------------Find in array: sum, min and max, replace min and max - create custom functions
function MathFind() {

    this.findSum = function (arr) {
        let sum = 0;

        arr.map((item) => {
            sum += item;
        })

        return sum;
    }

    this.findSum2 = function (arr) {
        return arr.reduce(function (sum, current) {
            return sum += current;
        }, 0)
    }


    this.findMin = function (arr) {
        let min = arr[0];

        arr.forEach((item) => {
            if (item < min) {
                min = item;
            }
            return min;
        })

        return min;
    }

    this.findMin2 = function findMin2(arr) {
        let min = Math.min.apply(null, arr);
        return min;
    }


    this.findMax = function findMax(arr) {
        let max = arr[0];

        arr.forEach((item) => {
            if (item > max) {
                max = item;
            }
            return max;
        })

        return max;
    }

    this.findMax2 = function (arr) {
        let min = Math.max.apply(null, arr);
        return min;
    }


    this.replaceMinAndMax = function (arr) {
        let min = this.findMin(arr);
        let max = this.findMax(arr);

        arr.forEach((item, index) => {
            if (min === item) {
                arr[index] = max;
            } else if (max === item) {
                arr[index] = min;
            }
        })

        return arr;
    }
}


// ------------------Create function which will return function with callback in arguments
function returnData(param) {
    console.log(param);

    function handleData(callback) {
        let result = 0;
        result = callback('callback: ', result);
        console.log(result)
    }

    return handleData;
}


const func = returnData('Hello world');

console.log(func)
console.log(func(function (param) {
    return param += 2;
}));


// ------------------Create a function that will replace all number dividing three with ‘foo’, dividing seven with ‘bar’ and dividing three and seven with ‘foobar’. Function with n params.
function replaceDivider(arr) {
    let divide3 = 3;
    let divide7 = 7;
    let foo = 'foo';
    let bar = 'bar';
    let foobar = 'foobar';

    arr.forEach((item, index) => {

        if (item % divide3 === 0 && item % divide7 !== 0) {
            arr[index] = foo;
        }

        if (item % divide7 === 0 && item % divide3 !== 0) {
            arr[index] = bar;
        }

        if (item % divide3 === 0 && item % divide7 === 0) {
            arr[index] = foobar;
        }

    })

    return arr;
}


// ------------------Create function with 2 string params. It must check if letters in the first correspond to the number of matches in second and return %.
function compareStrings(str1, str2) {
    let coincidence = 0;
    let maxStringLength = str1.length;

    if (str1.length < str2.length) {
        maxStringLength = str2.length;
    }


    for (let i = 0; i < maxStringLength; i++) {
        if (str1[i] === str2[i]) {
            coincidence++;
        }
    }


    coincidence = Math.round((coincidence * 100) / maxStringLength) + '%';

    console.log(coincidence);
}


let mf = new MathFind();

console.log('findSum');
console.log(mf.findSum(arr));

console.log('findMin');
console.log(mf.findMin(arr));

console.log('findMax');
console.log(mf.findMax(arr));


console.log('replaceMinAndMax');
console.log(mf.replaceMinAndMax(arr));

console.log('returnFunction');
console.log(returnFunction('callback'));

console.log('replaceDivider');
console.log(replaceDivider(arr));

console.log('compareStrings');
console.log(compareStrings('nodejs', 'comparedString'));
