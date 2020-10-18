const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
	return layout({
		content: `
    <div>
        <form action="" method="POST">
            <input type="text" name="email" placeholder="Email">
            ${getError(errors, 'email')}
            <input type="text" name="password" placeholder="Password">
            ${getError(errors, 'password')}
            <button>Sign In</button>
        </form>
    </div>
`,
	});
};
