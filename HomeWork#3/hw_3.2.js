// 3.2 https://docs.google.com/spreadsheets/d/1ew5KhvXAhaB-CxWpYDd_OBYz4yKnaW9k25aCGP0gDG4/edit?usp=sharing
//     Some more cases:
// [2, 5, 1, 3, 1, 2, 1, 7, 7, 6]; // 17
// [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0]; // 10
// [7, 0, 1, 3, 4, 1, 2, 1] // 9
// [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0] // 10
// [2, 2, 1, 2, 2, 3, 0, 1, 2] // 4
// [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 8] // 24
// [2, 2, 2, 2, 2] // 0


let rocksHeight1 = [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0], // 10
    rocksHeight2 = [2, 5, 1, 3, 1, 2, 1, 7, 7, 6], // 17
    rocksHeight3 = [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0], // 10
    rocksHeight4 = [7, 0, 1, 3, 4, 1, 2, 1], // 9
    rocksHeight5 = [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0], // 10
    rocksHeight6 = [2, 2, 1, 2, 2, 3, 0, 1, 2], // 4
    rocksHeight7 = [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 8], // 24
    rocksHeight8 = [2, 2, 2, 2, 2]; // 0


function findCountOfWater(rocksHeight) {
    let result = 0;
    let water = 0;
    let tmp = 0;
    let maxHeight = Math.max.apply(null, rocksHeight);
    let reverse = false;


    for (let i = 0; i < rocksHeight.length; i++) {
        if(rocksHeight[i] === maxHeight && i < Math.round(rocksHeight.length/2)){
            reverse = true;
        }
    }

    const removeRocks = function () {
        if (rocksHeight[0] < rocksHeight[1] || rocksHeight[0] === rocksHeight[1]) {
            rocksHeight.shift();
        }

        if (rocksHeight[rocksHeight.length - 2] > rocksHeight[rocksHeight.length - 1] ||
            rocksHeight[rocksHeight.length - 2] === rocksHeight[rocksHeight.length - 1]) {

            rocksHeight.pop();
        } else {
            return;
        }

        removeRocks();
    }

    const waterCounter = function () {

        for (let i = 0; i < maxHeight; i++) {
            rocksHeight.forEach((item, index) => {
                if (item > rocksHeight[index + 1] && rocksHeight[index + 1] !== maxHeight) {

                    tmp = item;
                    while (item > rocksHeight[index + 1]) {
                        rocksHeight[index + 1] += 1;
                        water += 1;
                        removeRocks();
                    }
                } else if (tmp > item) {
                    while (tmp > item) {
                        rocksHeight[index] += 1;
                        water += 1;
                        removeRocks();
                    }
                }

            });
        }
        return water;
    }

    const waterCounterReverse = function () {
        rocksHeight = rocksHeight.reverse();

        for (let i = 0; i < maxHeight; i++) {
            rocksHeight.forEach((item, index) => {
                if (item > rocksHeight[index + 1] && rocksHeight[index + 1] !== maxHeight) {

                    tmp = item;
                    while (item > rocksHeight[index + 1]) {
                        rocksHeight[index + 1] += 1;
                        water += 1;
                        removeRocks();
                    }
                } else if (tmp > item) {
                    while (tmp > item) {
                        rocksHeight[index] += 1;
                        water += 1;
                        removeRocks();
                    }
                }

            });
        }
        return water;
    }


    // console.log('rocksHeight', rocksHeight);

    removeRocks();

    if(reverse) {
        result = waterCounterReverse();
    } else {
        result = waterCounter();
    }

    return result;
}


console.log('waterCount1: ', findCountOfWater(rocksHeight1));
console.log('waterCount2: ', findCountOfWater(rocksHeight2));
console.log('waterCount3: ', findCountOfWater(rocksHeight3));
console.log('waterCount4: ', findCountOfWater(rocksHeight4));
console.log('waterCount5: ', findCountOfWater(rocksHeight5));
console.log('waterCount6: ', findCountOfWater(rocksHeight6));
console.log('waterCount7: ', findCountOfWater(rocksHeight7));
console.log('waterCount8: ', findCountOfWater(rocksHeight8));

