class Vehicle {
	constructor(public color: string) {}

	protected honk(): void {
		console.log('beep!');
	}
}

class Car extends Vehicle {
	constructor(public wheels: number, color: string) {
		super(color);
	}

	private drive(): void {
		console.log('vrommm');
	}

	startDrive(): void {
		this.drive();
		this.honk();
	}
}

const ferrari = new Car(4, 'red');
ferrari.startDrive();
console.log(ferrari.color);
