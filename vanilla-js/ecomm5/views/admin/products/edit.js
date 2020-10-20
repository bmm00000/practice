const layout = require('../layout');

module.exports = ({ product }) => {
	return layout({
		content: `
            <form method="POST">
                <input name="title" value="${product.title}">
                <input name="price" value="${product.price}">
                <input name="image" type="file">
                <button>Submit</button>
            </form>
        `,
	});
};
// we are leaving the image input empty: if the user wants to change the image, we will upload the new one, if not, we will keep the old one.
