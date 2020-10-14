const layout = require('../layout');

module.exports = ({ req }) => {
	return layout({
		content: `
            <div>
                Your id is: ${req.session.userId}
                <form method="POST">
                    <input type="text" placeholder="Email" name="email">
                    <input type="text" placeholder="Password" name="password">
                    <input type="text" placeholder="Password Confirmation" name="passwordConfirmation">
                    <button>Sign Up</button>
                </form>
            </div>
        `
	});
};
