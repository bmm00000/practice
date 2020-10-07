const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
	constructor(filename) {
		// we make sure that a filename for the repo was provided (the file where we store all the info):
		if (!filename) {
			throw new Error('Creating a repository requires a filename');
		}

		// we store the filename in an instance variable, and then check to see if the file exists in the hard drive (otherwise, we will create it). in node standard library, we go to the file system module, and look for a function called 'access'. we have different version of this function: with callback, promised based, and sync (it executes syncronously, so no callback involved, so with 'sync' we are going to sit and wait until node checks that the file exists). from a performance standpoint, we don't want to use the 'sync' version, but in this case we are only going to create one instance of the UsersRepository. the other reason is that we are going to use 'assess' in the constructor function, and constructor functions are not allowed to be async. so we use the 'sync' version
		this.filename = filename;
		try {
			fs.accessSync(this.filename);
			// if the file does not exist, we are going to catch the error, and create the file, and we also use the 'sync' version here (same reasons as above):
		} catch (err) {
			// we will be working with an array or records, that's why we start with an empty array:
			fs.writeFileSync(this.filename, '[]');
		}
	}

	async getAll() {
		// // we want to open and read the file this.filename (in this case we use the promised based 'readFile' function because in general we always prefer to use promised based functions):
		// const contents = await fs.promises.readFile(this.filename, { encoding: 'utf8' });

		// // parse its contents (from json to a normal array of js objects):
		// const data = JSON.parse(contents);

		// // and return the parsed data:
		// return data;

		// or we can refactor all the above, as follows:
		return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
	}

	async create(attrs) {
		// attrs is an object like this, for example: {email: 'jlsjf@jls.com', password: 'jlkfdsjflsd'}, so we have to add a new user with these attributes in our users.json file

		// in order to do this, we need to load up first our users.json file, so we have the most recent collection of data available, then add our new user, and then add the file to our hard drive.

		// we generate an id when we create a record:
		attrs.id = this.randomId();

		const salt = crypto.randomBytes(8).toString('hex');
		const buf = await scrypt(attrs.password, salt, 64);

		// we load up our users.json file:
		const records = await this.getAll();
		const record = {
			...attrs,
			password: `${buf.toString('hex')}.${salt}`
		};
		// we push the new user:
		records.push(record);

		await this.writeAll(records);

		return record;
	}

	async comparePasswords(saved, supplied) {
		// Saved : password saved in our database.
		// Supplied : password given to us by a user trying to sign in.
		const [ hashed, salt ] = saved.split('.');
		const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

		return hashed === hashedSuppliedBuf.toString('hex');
	}

	// we write the updated 'records' array back to this.filename:
	async writeAll(records) {
		// the second argument of 'JSON.stringify' is to add indentation to the string, otherwise it will be all the same line.
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
	}

	randomId() {
		// we need to generate an id for our users/products, since they may have similar names...
		// we use this method to generate a random string of characters that we are going to store as our id (see the screenshot to see how it works (screenshot showing node REPL mode)):
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
		// it looks the same as getOne, so we don't we use it here? because we need to save the whole 'records', that's why we are going to use getAll anyways here as well, so we don't use getOne here.

		if (!record) {
			throw new Error(`Record with id ${id} not found`);
		}

		// now we update:
		Object.assign(record, attrs);
		await this.writeAll(records);
	}

	// now we are going to find THE FIRST record that has all the specified attributes (see exmple below in the 'test' function) (it can be many attributes or just one):
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

// we are testing our functions. in order to do so, we have to wrap them in an async function (test), because node does not let us run await functions on their own, they have to be wrapped up in an async function:
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	// // await repo.create({ email: 'test@test.com', password: 'password' });
// 	// // const users = await repo.getAll();
// 	// // console.log(users);
// 	// repo.getOne('16dbd717');
// 	// console.log(user);
// 	// await repo.delete('16dbd717');
// 	const user = await repo.getOneBy({ id: '1234', email: 'test@test.com', password: 'mypassword' });
// 	console.log(user);
// };

// test();

// // you could export it as follows, but if you make a typo, then you will create two different data files, that's why the following approach is not so good:
// module.export = UsersRepository;
// // ANOTHER FILE:
// const UsersRepository = require('./users');
// const repo = new UsersRepository('users.json');
// // YET ANOTHER FILE:
// const UsersRepository = require('./users');
// const repo = new UsersRepository('user.json');
// // THERE IS A TYPO!

// this is the best way to export it:
module.exports = new UsersRepository('users.json');
// // ANOTHER FILE:
// const repo = require('./users');
// // and we can start calling methods straightaway:
// repo.getAll();

// remember that 'users.json' is created in the directory where we create the instance of the class. We are going to do it all from the main directory ('ecomm')
