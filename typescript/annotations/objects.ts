const profile = {
	name: 'Alex',
	age: 55,
	coords: {
		lat: 44,
		lng: 55,
	},
	setAge(age: number): void {
		this.age = age;
	},
};

// destructuring:
const { name, age }: { name: string; age: number } = profile;

const {
	coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;
