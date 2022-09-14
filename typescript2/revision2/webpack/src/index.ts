import Dog from './Dog';
import ShelterDog from './ShelterDog';
import { add, multiply } from './utils';

console.log('hello');
console.log(add(1, 2));
console.log(multiply(2, 4));

const dog1 = new Dog('george', 'german shepherd', 10);
console.log(dog1.bark());

const shelterDog1 = new ShelterDog('helen', 'aussy', 12, 'shelter1');
console.log(shelterDog1.bark());
