// Find in array: sum, min and max, replace min and max - create custom functions

// Create function which will return function with callback in arguments

// Create a function that will replace all number dividing three with ‘foo’,
// dividing seven with ‘bar’ and dividing three and seven with ‘foobar’. Function with n params.

// Create function with 2 string params. It must check if letters in the
// first correspond to the number of matches in second and return %.


let arr = [6, 9, 4, 18, 3, 10, 21, 7, null, Infinity, '656', undefined];

// ------------------Find in array: sum, min and max, replace min and max - create custom functions
function MathFind() {

    this.findSum = function (arr) {

        let sum = 0;

        arr.map((item) => {

            if (item && Number.isFinite(item)) {
                sum += item;
            } else {
                console.log('not a number: ', item)
            }

        })

        return sum;
    }

    this.findSum2 = function (arr) {
        return arr.reduce(function (sum, current) {
            return sum += current;
        }, 0)
    }


    this.findMinMax = function (arr, arg) {
        let result = arr[0];

        arr.forEach((item) => {
            if (item > result && arg === 'max') {
                result = item;
            }
            if (item < result && arg === 'min') {
                result = item;
            }
        })

        return result;
    }


    this.replaceMinAndMax = function (arr) {
        let min = this.findMinMax(arr, 'min');
        let max = this.findMinMax(arr, 'max');

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
function replaceDivider(n) {
    let result = n;

    if (n % 3 === 0) {
        if (n % 7 !== 0) {
            result = 'foo';
        } else if (n % 7 === 0) {
            result = 'foobar';
        }
    } else if (n % 7 === 0) {
        result = 'bar';
    }

    return result;
}


// ------------------Create function with 2 string params. It must check if letters in the first correspond to the number of matches in second and return %.
function compareStrings(str1, str2) {
    let coincidence = 0;
    let maxStringLength = str1.length >= str2.length ? str1.length : str2.length;
    let minStringLength = str1.length <= str2.length ? str1.length : str2.length;

    let arr1 = str1.split('').sort().join('');
    let arr2 = str2.split('').sort().join('');


    for (let i = 0; i < minStringLength; i++) {

        if (arr1[i] === arr2[i]) {
            coincidence++;
        }

    }

    coincidence = Math.round((coincidence * 100) / (maxStringLength)) + '%';

    return coincidence;
}


let mf = new MathFind();

console.log('findSum');
console.log(mf.findSum(arr));


console.log('findMinMax, min');
console.log(mf.findMinMax(arr, 'min'));
console.log('findMinMax, max');
console.log(mf.findMinMax(arr, 'max'));


console.log('replaceMinAndMax');
console.log(mf.replaceMinAndMax(arr));

console.log('returnFunction');
console.log(returnData('callback'));

console.log('replaceDivider');
console.log(replaceDivider(21));

console.log('compareStrings');
console.log('aaa, yay :', compareStrings('aaa', 'yay'));
console.log('yay, yay :', compareStrings('yay', 'yay'));
console.log('aaaw, wad :', compareStrings('aaaw', 'wad'));
console.log('doawdaawd, wad:', compareStrings('doawdaawd', 'wad'));
console.log('aaaa, aaa:', compareStrings('aaaa', 'aaa'));
