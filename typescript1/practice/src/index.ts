class Department {
	private employees: string[] = [];
	constructor(private readonly id: string, private name: string) {}

	describe(this: Department): string {
		return `This is the ${this.name} department with id: ${this.id}.`;
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

class ITDepartment extends Department {
	public admins: string[];
	constructor(id: string, admins: string[]) {
		super(id, 'IT');
		this.admins = admins;
	}

	printAdmins() {
		console.log(this.admins);
	}
}

const itDepartment1 = new ITDepartment('a2', ['Dani', 'Jose']);

itDepartment1.addEmployee('Helen');

console.log(itDepartment1);
itDepartment1.printAdmins();

// const accounting = new Department('a1', 'Accounting');
// console.log(accounting.describe());

// const accountingCopy = {
// 	name: 'AccountingCopy',
// 	describe: accounting.describe,
// };
// console.log(accountingCopy.describe());

// accounting.addEmployee('Pedro');
// accounting.addEmployee('Maxi');

// accounting.printEmployeeInformation();
