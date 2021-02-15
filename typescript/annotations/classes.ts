class Vehicle {
	protected honk(): void {
		console.log('beep!');
	}
}

class Car extends Vehicle {
	private drive(): void {
		console.log('vrommm');
	}

	startDrive(): void {
		this.drive();
		this.honk();
	}
}

const ferrari = new Car();
ferrari.startDrive();
