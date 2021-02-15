const layout = require('../layout');

module.exports = ({ products }) => {
	const renderedProducts = products
		.map((product) => {
			return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
          <a href="/admin/products/${product.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
        <form method="POST" action="/admin/products/${product.id}/delete">
          <button class="button is-danger">Delete</button>
        </form>
        </td>
      </tr>
    `;
		})
		.join('');
	// we use join to have one single string, and not an array of strings

	// we wrap the delete button in a post request, because we want to change data and post it. action refers to the url that we want to make the post request to. the default action is whatever the current url is.

	return layout({
		content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `,
	});
};
