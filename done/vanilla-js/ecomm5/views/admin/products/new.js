const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
	return layout({
		content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `,
	});
};

// in a form, the method is about HOW to send the information that has a name property to the backend server. on the other hand, enctype (encoding type) is about how to get the information from the form and get it ready to be transmitted (how to bundle it to be transmitted safely). the deafult value of enctype is in the screenshot (it puts together the info in a query string kind of format: you can see that in the browser, in 'form data' (see screenshot)). the problem is that when we are trying to send an image, it contains info that cannot be safely encoded in a string (url format). that's why the image is not sent (only the name is sent). The reason is the default enctype. that's why we will change it (see above)
