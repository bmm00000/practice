const add = (a: number, b: number): number => {
	return a + b;
};

function divide(a: number, b: number): number {
	return a / b;
}

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
