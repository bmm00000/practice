type Point = {
	x: number;
	y: number;
};

type Loc = {
	lat: number;
	long: number;
};

let coordinates: Point | Loc = { x: 1, y: 2 };
coordinates = { lat: 4, long: 88 };
