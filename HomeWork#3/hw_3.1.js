// 3.1 Создать новые методы для всех массивов (и вставить туда логгер с занятия 1, для 1000 повторений, что бы показывал статистику для всех повторений):
// 1) myForEach - тот же самый forEach
// 2) myMap - тот же самый map
// 3) mySort - тот же самый sort
// 4) myFilter
// 5) myPush



let arr = ['js', 'ruby', 'c', 'python', 'a', 'b', 'm'];
arr= ['50', '8', '10', 'python', 'ruby', 'c', 'python'];
// arr= [10, 5, 8, 61];
arr= ['10', '5', '8', '61', '555'];



Array.prototype.myForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

Array.prototype.myMap = function(callback) {
    let arr = [];

    for (let i = 0; i < this.length; i++) {
        arr.push(callback(this[i], i, this));
    }

    return arr;
}

Array.prototype.mySort = function(callback) {
    let arr = this;
    let counter = 0;


    const sortStrings = function (numeric) {
        if(numeric) {
            let tmpArr = arr;
            arr = [];

            for(let a = 0; a < tmpArr.length; a++) {
                arr.push(parseFloat(tmpArr[a]));
            }

        }

        for(let i = arr.length-1; i >=0; i--) {
            for(let j = 1; j <= i; j++) {

                if(arr[j-1] > arr[j]) {
                    let tmp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = tmp;
                }

            }
        }

        return arr;
    }

    const compareFunction = function () {

        if(callback(arr[0], arr[1]) < arr[0]) {
            return sortStrings(true);
        }

        if(callback(arr[0], arr[1]) > arr[0]) {
            return sortStrings();
        }

        return sortStrings();
    }

    return compareFunction();
}

Array.prototype.myFilter = function (callback) {
    let arr = [];

    for (let i = 0; i < this.length; i++) {
        if(callback(this[i])) {
            arr.push(this[i]);
        }
    }

    return arr;
}

Array.prototype.myPush = function (...args) {
    for(let i = 0; i < args.length; i++) {
        this[this.length] = args[i];
    }
    return this;
}



arr.myForEach((item, index, that)=>{
    // console.log('foreach', item+10, index, that);
})

let arrMap = arr.myMap((item, index) => {
    return item += '5';
})

let arrSort = arr.mySort(function (a, b){
    // return a - b;
})
let sorted = arr.sort((a, b) => {
    return a - b;
});
let arrFilter = arr.myFilter(item => item.length > 2)
let arrPush = arr.myPush('scala', 'java');



console.log('my map', arrMap, arr);
console.log('my sort', arrSort, arr);
console.log('my filter', arrFilter)
console.log('my push', arrPush)