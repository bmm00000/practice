const { ObjectId } = require('mongodb');

const db = require('../data/database');

class Post {
	constructor(title, content, id) {
		this.title = title;
		this.content = content;
		this.id = id;
	}

	static async fetchAll() {
		const posts = await db.getDb().collection('posts').find().toArray();
		return posts;
	}

	async fetchOne() {
		if (!this.id) {
			return;
		}

		const postDocument = await db
			.getDb()
			.collection('posts')
			.findOne({ _id: new ObjectId(this.id) });
		this.title = postDocument.title;
		this.content = postDocument.content;
	}

	async save() {
		let result;
		if (this.id) {
			result = await db
				.getDb()
				.collection('posts')
				.updateOne(
					{ _id: new ObjectId(this.id) },
					{ $set: { title: this.title, content: this.content } }
				);
		} else {
			result = await db
				.getDb()
				.collection('posts')
				.insertOne({ title: this.title, content: this.content });
		}
		return result;
	}

	async delete() {
		if (!this.id) {
			return;
		}
		const result = await db
			.getDb()
			.collection('posts')
			.deleteOne({ _id: new ObjectId(this.id) });
		return result;
	}
}

module.exports = Post;
