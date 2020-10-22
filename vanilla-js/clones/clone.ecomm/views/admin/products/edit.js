const { getError } = require('../../helpers');
const layout = require('../layout');

module.exports = ({ errors, product }) => {
	layout({
		content: `
            <form method="POST">
                <input name="title" value="${product.title}" />
                ${getError(errors, 'title')}
                <input name="price" value="${product.price}" />
                ${getError(errors, 'price')}
                <input name="image" type="file" /> 
                <button>Submit</button>
            </form>
        `,
	});
};
