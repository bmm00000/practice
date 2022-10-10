const { ObjectId } = require('mongodb');

const db = require('../data/database');

class Todo {
	constructor(text, id) {
		this.text = text;
		this.id = id;
	}

	static async getAllTodos() {
		const todoDocuments = await db.getDb().collection('todos').find().toArray();

		return todoDocuments.map(function (todoDoc) {
			return new Todo(todoDoc.text, todoDoc._id);
		});
	}

	async save() {
		let result;
		if (this.id) {
			return await db
				.getDb()
				.collection('todos')
				.updateOne(
					{ _id: new ObjectId(this.id) },
					{ $set: { text: this.text } }
				);
		} else {
			result = db.getDb().collection('todos').insertOne({ text: this.text });
			return result;
		}
	}

	delete() {
		if (!this.id) {
			throw new Error('Trying to delete todo without id...');
		}

		return db
			.getDb()
			.collection('todos')
			.deleteOne({ _id: new ObjectId(this.id) });
	}
}

module.exports = {
	Todo,
};
