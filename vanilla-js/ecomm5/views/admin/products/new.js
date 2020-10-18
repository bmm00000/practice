const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
	return layout({
		content: `
            <form action="" method="POST" enctype="multipart/form-data">
                <input name="title" placeholder="Title" />
                ${getError(errors, 'title')}
                <input name="price" placeholder="Price" />
                ${getError(errors, 'price')}
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `,
	});
};

// in a form, the method is about HOW to send the information that has a name property to the backend server. on the other hand, enctype is about how to get the information from the form and get it ready to be transmitted (how to bundle it to be transmitted safely). the deafult value of enctype is in the screenshot (it puts together the info in a query string kind of format: you can see that in the browser, in 'form data' (see screenshot)). the problem is that when we are trying to send an image, it contains info that cannot be safely encoded in a string (url format). that's why the image is not sent (only the name is sent). The reason is the default enctype. that's why we will change it (see above)
