import React, { useState } from 'react';

import Wrapper from '../Helpers/Wrapper';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
	const [enteredUsername, setEnteredUsername] = useState('');
	const [enteredAge, setEnteredAge] = useState('');
	// anything that is entered as an input is always retrieved as a string (that's how js and the dom work), that's why we initialize 'enteredAge' as an empty string
	const [error, setError] = useState();
	// initially, our error is undefined.

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const ageChangeHandler = (event) => {
		setEnteredAge(event.target.value);
	};

	const addUserHandler = (event) => {
		event.preventDefault();

		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({
				title: 'Fill in the inputs!',
				message: 'Sorry, the inputs cannot be empty like that...',
			});
			return;
		}
		if (+enteredAge < 1) {
			setError({
				title: 'Negative age?',
				message: 'Sorry, the age cannot be negative like that...',
			});
			return;
		}

		// const newUser = {
		// 	name: enteredUsername,
		// 	age: +enteredAge,
		// 	id: Math.random().toString(),
		// };

		props.onAddUser(enteredUsername, enteredAge);
		setEnteredUsername('');
		setEnteredAge('');
	};

	const errorHandler = () => {
		setError(null);
		setEnteredUsername('');
		setEnteredAge('');
	};

	return (
		<Wrapper>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={classes.input}>
				<form action='' onSubmit={addUserHandler}>
					<label htmlFor='username'>User</label>
					<input
						type='text'
						id='username'
						value={enteredUsername}
						// we add the 'value', so we have the current state to be reflected here every time that this component is rendered. if we only wanted to change the input content via keystrokes, we would not need to do this. however, we also want to change the input content when we submit the form (we want to make it empty). that's why we need to do this.
						onChange={usernameChangeHandler}
					/>
					<label htmlFor='age'>Age</label>
					<input
						type='number'
						id='age'
						value={enteredAge}
						onChange={ageChangeHandler}
					/>
					<Button type='submit'>Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default AddUser;

// in the slide: solution: always wrap adjacent elements: it doesn't have to be a div, any element would do the trick. even if you put everything inside of an array (only that you would need to add the key props to every element of the array), but using an array with hardcoded keys is cumbersome, that's why we are using a wrapping div. but using a div could sometimes generate another problem: a div soup that will end up in the user's html that is rendered by the browser. this is not a good practice, since it can break styles, and it can even make the app slower, since react will need to check all these divs to see if any content needs to change, and the browser will have to render so many unnecessary divs.

// solution: creating a wrapper component in the Helpers folder.
// we are using a wrapper because the requirement is not that the root element has to render anything to the dom (our wrapper is not a div or anything, so it renders no element to the dom), the requirement is that there must be one root element that you return, or that you store in a constant or variable (in our case, we return everything in props.children)
// at the end of the day, what we are doing is working around a technical requirement by javascript, so we don't end up with a div soup.

// since this 'Wrapper' component is so convenient, we don't have to build it on our own, but it comes built-in with React: it's the Fragment component.
// in some projects, you can use the shortcut on the right of the slide, but it depends on your project's setup, because your build workflow needs to support this. But the syntax on the left of the slide will always work.

// remember, the syntax <> is not html, and it's not valid JSX in all projects (your project setup needs to support it). when you use this built-in wrapper, the divs that were previously rendered into the DOM, are not rendered anymore (so the html that will be rendered is cleaner). in any case, you can always use React.Fragment, or just Fragment (if you import {Fragment} from 'react').

// react portals also help us to write cleaner code. having the nested modal, apart from being not semantically correct, it can also lead to real problems, with styling or accessibility (if a screenreader has to interpret the html code, it will not see the modal as an overlay for the whole page). we can use a portal in order to keep the structure we have on the left side of the slide (so we can organize the components the way we want to, so we don't have any problems when passing data and so on), but render the html in a semantially correct way.
