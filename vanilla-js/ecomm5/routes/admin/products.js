const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post(
	'/admin/products/new',
	[requireTitle, requirePrice],
	upload.single('image'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.send(productsNewTemplate({ errors }));
		}

		// if you upload an image and then console.log(req.body), you will see that we console log only the name of the image file (see screenshot). Likewise, you will only see the name of the image if you inspect the network tab of the browser when you upload the image (see screenshot). therefore, the default behaviour of a form is not useful at all!! see the comment in new.js.

		//bodyParser does not work here, since it only works with urlencoded forms (see middleware), that's why we need to use what we used before we used the bodyParser library: (don't do this with images, or you will receive so much data that your CLI will block): see the screenshot: it will send the data from the image in chuncks (multipart)
		// req.on('data', (data) => {
		// 	console.log(data.toString());
		// 	// in order to parse all these multipart chuncks, we are going to use another library: multer
		// });

		const image = req.file.buffer.toString('base64'); // see the screenshot to see what appears when we console.log this
		// we are converting the buffer into a string that can be stored in a json file.
		const { title, price } = req.body;

		await productsRepo.create({ title, price, image });

		res.send('submitted');
	}
);

module.exports = router;
