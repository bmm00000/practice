const layout = require('../layout');

const getError = (errors, prop) => {
	// we want to find the errors that refer to either the email, password or passwordConfirmation, that's why we need to add the 'prop':
	// prop === 'email' || 'password' || 'passwordConfirmation'
	// if (errors) {
	// 	return errors.mapped()[prop].msg;
	// }
	// errors.mapped() will convert the array of errors into an object, and then we will only be interested in [prop].msg, for example:
	// errors.mapped() === {
	//     email: {
	//         msg: 'Invalid email'
	//     },
	//     password: {
	//         msg: 'Password too short'
	//     },
	//     passwordConfirmation: {
	//         msg: 'Passwords must match
	//     }
	// }

	// but if there is no error with, for example, the email, the 'email' property will not appear the the object above, and if we look for it, it will give us an error (cannot find property of undefined). how to solve this?:
	try {
		return errors.mapped()[prop].msg;
		// this statement can blow up either if there are no errors, or if there is no error for a particular property that we are looking for (for example, 'email'): that means that we are looking for an error message that doesn't even exist. therefore, we return an empty string in 'catch':
	} catch (err) {
		return '';
	}
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
                    ${getError(errors, 'email')}
                    <input name='password' placeholder='password' />
                    ${getError(errors, 'password')}
                    <input name='passwordConfirmation' placeholder='password confirmation' />
                    ${getError(errors, 'passwordConfirmation')}
                    <button>Sign Up</button>
                </form>
            </div> 
        `
	});
};
// if we send only this div, the browser will add the doctype, header, etc. of a typical html document, but this is not that great, that's why we will add all those elemnents using the 'layout' function.
