const activeUsers: [] = [];
// you are telling ts that the former type is an empty array. then, if you try to add something to that array, ts will complain:
activeUsers.push('steven');

type Point = {
	x: number;
	y: number;
};

const coords: Point[] = [];
// even though we are specifying an array of Point types, we can start with an empty array, and ts will not complain.
coords.push({ x: 1, y: 2 });

// multidymensional arrays:
const board: string[][] = [
	['x', 'z'],
	['x', 'o'],
];
// we are saying that we have a two dymensional array of strings (an array of arrays of strings)

// three dymensional array of numbers:
const demo: number[][][] = [
	[[], []],
	[[], [7]],
];
// even though you specify 'number', you can start with empty arrays.

// watch 37-array types exercise
