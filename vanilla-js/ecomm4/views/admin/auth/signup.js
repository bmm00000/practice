const layout = require('../layout');

const getError = (errors, prop) => {
	// we want to find the errors that refer to either the email, password or passwordConfirmation, that's why we need to add the 'prop':
	// prop === 'email' || 'password' || 'passwordConfirmation'
};

// we are using an object as a parameter, because we will need many arguments to display in our html, that's why it's convenient to group them all in an object:
module.exports = ({ req, errors }) => {
	// 'errors' may be undefined (in case we hit the signup GET route), that's why we have to write some code here defensively, to make sure we cover this possibility, that's why we are using the helper function above 'getError':
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
// if we send only this div, the browser will add the doctype, header, etc. of a typical html document, but this is not that great, that's why we will add all those elemnents using the 'layout' function.
