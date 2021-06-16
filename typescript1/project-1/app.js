function add(num1, num2, showResult, text) {
    if (showResult) {
        var result = num1 + num2;
        console.log(text + result);
    }
}
// const n1 = '3';
var n1 = 2;
var n2 = 3;
var printResult = true;
var intro = 'The result is: ';
add(n1, n2, printResult, intro);
