const inputEl = document.querySelector<HTMLInputElement>('#input-element')!;
inputEl.value = 'hacked!';

function identity<T>(item: T): T {
	return item;
}

identity(0);

function getRandomElement<T>(array: T[]): T {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

console.log(getRandomElement<number>([1, 2, 3]));
console.log(getRandomElement<string>(['s', 's', 'a']));

//

function merge<T extends object, U extends object>(obj1: T, obj2: U) {
	return { ...obj1, ...obj2 };
}

merge({ name: 'jose' }, { jj: 2 });

interface Length {
	num: number;
}

function getLength(len: Length): number {
	return len.num;
}
