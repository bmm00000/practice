const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // upload is a middleware function. multer wants to have a place to store the file until the route handler does whatever with it.

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post(
	'/admin/products/new',
	// watch out here!! since we changed the default enctype, bodyParser will not apply and express-validator will not be able to get the values of 'name' in the form to apply the 'check' in the validators. That's why we will receive error messages in the form if we apply the validators before upload.single. so we need to change the order and apply upload.single before the validators, as follows (note that multer also parses body of the post request, so we will be able to find the values of 'name' in req.body after applying upload.single, that's why we need to place it before the validators):
	upload.single('image'),
	[requireTitle, requirePrice],
	async (req, res) => {
		const errors = validationResult(req);

		// the image is in req.file, this is an object that has properties about the file, and one of these properties is the buffer of the file (see screenshot): the raw image data is in req.file.buffer

		// if you upload an image and then console.log(req.body), you will see that we console log only the name of the image file (see screenshot). Likewise, you will only see the name of the image if you inspect the network tab of the browser when you upload the image (see screenshot). therefore, the default behaviour of a form is not useful at all!! the image data cannot be safely converted into a url. see the comment in new.js: we use multi-part enctype!!

		//bodyParser does not work here (we cannot console.log(req.body) and see the image), since it only works with urlencoded forms (see bodyParser middleware), that's why we need to use what we used before we used the bodyParser library: (don't do this with images, or you will receive so much data that your CLI will block): see the screenshot: it will send the data from the image in chuncks (multipart)
		// req.on('data', (data) => {
		// 	console.log(data.toString()); (see in the screenshot the result of this). (when we use multi-part enctype, we cannot find the data that we just consoled log now in the 'network' section  of the browser (the browser doesnot do it for performance concerns, in case the image is too large))
		// 	// in order to parse all these multipart chuncks, we are going to use another library: multer
		// });

		// HOW TO STORE THE FILE? WHAT WE ARE GOING TO DO IS NOT THE RIGHT WAY (SEE THE LONG OPTIONAL VIDEO TO FIND OUT ABOUT THE RIGHT WAY TO DO IT), but it's suitable for out small project: we are converting the image buffer into a string that can be stored in a json file.

		if (!errors.isEmpty()) {
			return res.send(productsNewTemplate({ errors }));
		}

		const image = req.file.buffer.toString('base64'); // see the screenshot to see what appears when we console.log this. this string can be stored in our products.json file. AGAIN, don't do this in a production context!!

		const { title, price } = req.body;

		await productsRepo.create({ title, price, image });

		res.send('submitted');
	}
);

module.exports = router;
