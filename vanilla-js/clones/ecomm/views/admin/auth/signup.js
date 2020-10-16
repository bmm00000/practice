const layout = require('../layout');

module.exports = ({ req }) => {
	return layout({
		content: `
        <div>
            Your id is: ${req.session.userId}
            <form action="" method="POST">
                <input type="text" name="email" placeholder="Email">
                <input type="text" name="password" placeholder="Password">
                <input type="text" name="passwordConfirmation" placeholder="Password confirmation">
                <button>Sign Up</button>
            </form>
        </div>
`
	});
};
