const layout = require('../layout');

module.exports = () => {
	return layout({
		content: `
            <div>
                <form method="POST">
                    <input type="text" placeholder="Email" name="email">
                    <input type="text" placeholder="Password" name="password">
                    <button>Sign In</button>
                </form>
            </div>
        `
	});
};
