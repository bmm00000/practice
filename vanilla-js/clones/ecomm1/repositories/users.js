const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

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

	// we have to do the 'create' method in such a way that we can add as many new properties as we want, not only email and password, but also username, etc. if we want.
	async create(attrs) {
		attrs.id = this.randomId();

		const salt = crypto.randomBytes(8).toString('hex');
		const buf = await scrypt(attrs.password, salt, 64); // this returns a buffer, raw data of the hash, so we will have to convert it.

		const records = await this.getAll();

		const record = {
			// now we are going to replace the password from the attrs:
			...attrs,
			password: `${buf.toString('hex')}.${salt}`
		};

		records.push(record);

		this.writeAll(records);

		return record;
	}

	async writeAll(records) {
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
	}

	randomId() {
		return crypto.randomBytes(4).toString('hex');
	}

	async getOne(id) {
		const records = await this.getAll();
		return records.find((record) => record.id === id);
	}

	async delete(id) {
		const records = await this.getAll();
		const filteredRecords = records.filter((record) => record.id !== id);
		await this.writeAll(filteredRecords);
	}

	async update(id, attrs) {
		const records = await this.getAll();
		const record = records.find((record) => record.id === id);

		if (!record) {
			throw new Error(`Record with id ${id} was not found!`);
		}

		Object.assign(record, attrs);
		await this.writeAll(records);
	}

	async getOneBy(filters) {
		const records = await this.getAll();
		for (let record of records) {
			let found = true;
			for (let key in filters) {
				if (record[key] !== filters[key]) {
					found = false;
				}
			}
			if (found) {
				return record;
			}
		}
	}
}

module.exports = new UsersRepository('users.json');
