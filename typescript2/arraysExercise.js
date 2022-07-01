var ages = [];
var gameBoard = [];
function getTotal(products) {
    var total = 0;
    for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
        var prod = products_1[_i];
        total += prod.price;
    }
    return total;
}
console.log(getTotal([
    { name: 'glass', price: 2 },
    { name: 'window', price: 3 },
]));
