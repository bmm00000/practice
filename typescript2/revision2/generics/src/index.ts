const input = document.querySelector<HTMLInputElement>('#myinput')!;
input.value = 'hello';

function identity<T>(item: T): T[] {
	return [item];
}

function getRandomElement<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

console.log(getRandomElement<number>([1, 2, 3, 4, 5]));

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
	return {
		...obj1,
		...obj2,
	};
}

const mergedObj = merge({ name: 'jose' }, { age: 22 });

interface Video {
	actor: string;
}

interface Song {
	singer: string;
}

class Playlist<T> {
	public list: T[] = [];

	add(el: T): void {
		this.list.push(el);
	}
}

const videoPlaylist1 = new Playlist<Video>();

videoPlaylist1.add({ actor: 'hshs' });

function printArtist(media: Playlist<Video> | null) {
	if (media instanceof Playlist) {
		console.log(media.list);
	} else {
		console.log('we have nothing!');
	}
}

printArtist(videoPlaylist1);

interface Cat {
	catSound: string;
}

interface Dog {
	dogSound: string;
}

const isDog = (pet: Cat | Dog): pet is Dog => {
	// return (pet as Dog).dogSound !== undefined;
	return 'dogSound' in pet;
};

const pet1: Cat = { catSound: 'miauu' };
const pet2: Dog = { dogSound: 'guaff' };

console.log(isDog(pet1)); // false
console.log(isDog(pet2)); // true

interface Horse {
	name: string;
	kind: 'horse';
}

interface Cow {
	name: string;
	kind: 'cow';
}

type FarmAnimal = Horse | Cow;

const getAnimalSound = (animal: FarmAnimal): string => {
	switch (animal.kind) {
		case 'horse':
			return 'heheheh';
		case 'cow':
			return 'muuuu';
	}
};

const george: Horse = { name: 'George', kind: 'horse' };
console.log(getAnimalSound(george));
