// function Greeter(): JSX.Element {
// 	return <h1>I am greeting you!</h1>;
// }

interface GreeterProps {
	person: string;
}

function Greeter({ person }: GreeterProps): JSX.Element {
	return <h1>Hello, I am {person}!</h1>;
}

export default Greeter;
