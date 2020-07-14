const faker = require('faker');

console.log('----------');
console.log('My Shop');
console.log('----------');
for (let i = 0; i < 11; i++) {
	console.log(faker.fake('{{commerce.product}}: {{commerce.price}}'));
}
