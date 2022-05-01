// if a request is sent to this url: '/api/new-meetup', it will then trigger the function that we define in this file (often, this function is named 'handler' but the name is up to you) (this function will receive 'req' and 'res' objects as arguments; 'req' contains data about the incoming request, and 'res' will be needed in order to send back a response):
// in this case, we only want to trigger 'handler' if we receive a POST request:

function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;

		const { title, image, address, description } = data;

		// now we store this data from the incoming request in a database:
		// COPY THIS ENTIRE FILE!
	}
}

export default handler;
