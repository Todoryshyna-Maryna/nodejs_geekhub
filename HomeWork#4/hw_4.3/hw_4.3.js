console.clear();

// Implement pow(x, n), which calculates x raised to the power n (xn).
// Example 1:
// Input: 2.00000, 10
// Output: 1024.00000

// Example 2:
// Input: 2.10000, 3
// Output: 9.26100

// Example 3:
// Input: 2.00000, -2
// Output: 0.25000
// Explanation: 2-2 = 1/22 = 1/4 = 0.25

// Note:
// -100.0 < x < 100.0
// n is a 32-bit signed integer, within the range [−231, 231 − 1]


class MyMath {

    static pow(x, n) {
        let result = parseFloat(x.toFixed(5));

        if (n % 1 !== 0) {
            return 'n must be intenger';
        }

        if (x < 100 && x > -100 && n > -231 && n < 231) {
            for (let i = 1; i < parseFloat(n.toFixed(5)); i++) {
                result *= parseFloat(x.toFixed(5));
            }

            if (n < 0) {
                for (let i = parseFloat(n.toFixed(5)); i < -1; i++) {
                    result *= x;
                }
                result = 1 / result;
            }

            if (n === 0) {
                result = 1;
            }

            return result.toFixed(5);
        } else {
            return " x must be more than -100 and less than 100,  n must be more than -231 and less than 231";
        }
    }

}

console.log('2.00000, 10', MyMath.pow(2.00000, 10));
console.log('2.10000, 3', MyMath.pow(2.10000, 3));
console.log('2.00000, -2', MyMath.pow(2.00000, -2));
console.log('102.00000, -100', MyMath.pow(102.00000, -100));
