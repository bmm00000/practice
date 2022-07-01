// watch 24-function types EXERCISE
function twoFer(name) {
    if (name === void 0) { name = 'you'; }
    return "one for ".concat(name, ", one for me");
}
console.log(twoFer());
console.log(twoFer('Elton'));
//
var isLeapyear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    // if (year % 4 === 0 && year % 100 !== 0) {
    // 	return true;
    // } else if (year % 400 === 0) {
    // 	return true;
    // }
    // return false;
};
console.log(isLeapyear(2012));
console.log(isLeapyear(2013));
