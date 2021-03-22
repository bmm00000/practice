const add = (a: number, b: number): number => {
	return a + b;
};
// we get type inference for return value, but we will never use it, we always annotate the return type (or it won't tell us if we miss the 'return' keyword, for example)

function divide(a: number, b: number): number {
	return a / b;
}

// syntax for annonymous functions:
const multiply = function (a: number, b: number): number {
	return a * b;
};

const logger = (message: string): void => {
	console.log(message);
};

const throwErr = (message: string): never => {
	throw new Error(message);
};
// we only use 'never' when we expect the function to never complete, for example due to an error.
// otherwise:
const thrownErr = (message: string): string => {
	if (!message) {
		throw new Error();
	}
	return message;
};

const weatherToday = {
	date: new Date(),
	weather: 'sunny',
};

const logWeather = ({ date, weather }: { date: Date; weather: string }) => {
	console.log(date);
	console.log(weather);
};

logWeather(weatherToday);
