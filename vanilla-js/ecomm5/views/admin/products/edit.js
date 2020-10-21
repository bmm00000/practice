const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ product, errors }) => {
	return layout({
		content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
								product.title
							}" class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input value="${
								product.price
							}" class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `,
	});
};

// for the image, we cannot use the same approach as for title and price, because we stored a string with the image data, so it will not work.
// what we will do is: we are leaving the image input empty: if the user wants to change the image, we will upload the new one, if not, we will keep the old one.
