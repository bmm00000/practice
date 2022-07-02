// watch 42-union types exercise

let highScore: number | boolean;

const stuff: number[] | string[] = [];

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

type SkiSchoolStudent = {
	name: string;
	age: number;
	sport: 'ski' | 'snowboard';
	level: SkillLevel;
};

type RGBColor = {
	r: number;
	g: number;
	b: number;
};

type HSLColor = {
	h: number;
	s: number;
	l: number;
};

const colors: (RGBColor | HSLColor)[] = [];

const greet = (names: string | string[]): void => {
	if (typeof names === 'object') {
		for (const n of names) {
			console.log(`Hello ${n}`);
		}
	} else {
		console.log(`Hello ${names}`);
	}
};

console.log(greet('Ana'));
console.log(greet(['Pedro', 'Aroa']));
