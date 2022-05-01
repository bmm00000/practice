// if a request is sent to this url: '/api/new-meetup', it will then trigger the function that we define in this file (often, this function is named 'handler' but the name is up to you) (this function will receive 'req' and 'res' objects as arguments; 'req' contains data about the incoming request, and 'res' will be needed in order to send back a response):
// in this case, we only want to trigger 'handler' if we receive a POST request:

import { MongoClient } from 'mongodb';
// this is the object from the driver that we installed, that allows us to connect to the mongodb cluster.

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;

		// now we store this data from the incoming request in a database:
		const client = await MongoClient.connect(
			'mongodb+srv://jose_boix:1234567890L9l9.@cluster0.nduop.mongodb.net/meetups?retryWrites=true&w=majority'
		);
		// this is code that you NEVER want to run on the client side, because you would expose your credentials to your visitors, which is a security problem (this file is a secure place, since it will never run on the client).
		// the 'connect' method will return a promise, therefore you use async/await.
		const db = client.db();
		// on the client object we call the 'db' method, to get hold of the database that we are connecting to (if that database doesn't exist, it will be created on the fly)

		// mongodb is a non-sql database that works with collections (equivalent to tables in relational dbs) full of documents (equivalent to entries in relational dbs). a collection will hold multiple meetups, ie. multiple meetup documents:
		const meetupsCollection = db.collection('meetups');
		// you get hold of a collection by using the 'collection' method. if the collection doesn't exist, it will be generated on the fly.

		const result = await meetupsCollection.insertOne(data);
		// we use the 'insertOne' query command (it's also an async operation) to insert one new document in the collection. the good thing about mongodb is that a document is a js object. here we insert our 'data' object from line 9

		// we could also add error handling with try/catch, but in order to keep the demo brief, we will assume that this will always work.

		console.log(result);

		client.close();
		// we close the database connection once we are done.

		res.status(201).json({ message: 'Meetup inserted' });
		// we insert the status code 201 to indicate that something was inserted successfully, and then we prepare the json data that will be added to the outgoing response
	}
}

export default handler;
