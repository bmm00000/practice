// interfaces allow us to describe the shape of objects, AND ONLY OBJECTS!
// nickName is an optional property
// sayHi must be a method that returns a string (it cannot be just a string, it has to be a method that returns a string)
var thomas = {
    firstName: 'Thomas',
    lastName: 'Hardy',
    id: 123,
    sayHi: function () {
        return 'hi';
    }
};
thomas.firstName = 'Tom'; // you can change the first name
thomas.id = 32323; // but you cannot change the id, ts complains!
var shoes = {
    name: 'blue shoes',
    price: 22,
    applyDiscount: function (amount) {
        var newPrice = this.price * (1 - amount);
        this.price = newPrice;
        return this.price;
    }
};
console.log(shoes.applyDiscount(0.4));
// THIS FAILS!!