const layout = require('../layout');

// we are using an object as a parameter, because we will need many arguments to display in our html, that's why it's convenient to group them all in an object:
module.exports = ({ req, errors }) => {
	return layout({
		content: `
            <div>
            Your id is: ${req.session.userId}
                <form method='POST'>
                    <input name='email' placeholder='email' />
                    <input name='password' placeholder='password' />
                    <input name='passwordConfirmation' placeholder='password confirmation' />
                    <button>Sign Up</button>
                </form>
            </div> 
        `
	});
};
