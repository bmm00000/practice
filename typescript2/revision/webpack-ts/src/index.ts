import { sum, multiply, divide } from './utils';
import Dog from './Dog';
import ShelterDog from './ShelterDog';

console.log('from index file');

const myDog = new Dog('Elton', 'Shepherd', 2);
myDog.bark();

console.log(sum(2, 2));
console.log(multiply(2, 2));
console.log(divide(4, 2));

const myShelterDog = new ShelterDog('Tom', 'Chihuahua', 3, 'Gatwick Shelter');
