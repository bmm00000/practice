const fs = require('fs');

class UsersRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error('There has to be a file name!');
		}
		this.filename = filename;

		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, '[]');
		}
	}

	async getAll() {
		return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf-8' }));
	}
}

const test = async () => {
	const repo = new UsersRepository('users.json');
	const results = await repo.getAll();
	console.log(results);
};
test();
