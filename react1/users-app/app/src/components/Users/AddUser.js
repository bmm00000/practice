import React, { useState, useRef } from 'react';

import Wrapper from '../Helpers/Wrapper';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
	const nameInputRef = useRef();
	// it returns a value which allow us to work with that element to which we are going to connect it.
	const ageInputRef = useRef();
	// they are initialized to be undefined because that's the default (you could add an argument to initialize the ref with). then we will let react know that we want to connect it with an html element, by adding the special prop 'ref' to that element. the first time that react reaches the render block, it will set the value stored in 'nameInputRef' and 'ageInputRef' to the native dom element that is rendered based on the JSX built-in 'input' element that we have here (eg. what will end up in 'nameInputRef' is a real dom element). specifically, it 'nameInputRef' will contain an object that has a 'current' prop, which holds the actual value that ref is connected with. by default it's undefined, but as soon as the return block runs, the 'nameInputRef' is connected to the html input element (the actual dom node, which you can now manipulate, etc.), and this is stored in the 'current' prop of the object. it is recommended that you don't manipulate that dom node, since we use react to do that. however, we can use this feature to read data (we are not changing anything by reading data. in our example, since it's an input element, we can access 'current.value' to access the data of the input). therefore, we can just read the data when the submit button is pressed, so we don't need to be updating state every time that the user presses a key.
	// however, doing this we lose our resetting logic (to make the inputs blank after user submits the form). to fix this, we have to options: go back to the approach based on state, or we can do something which we should rarely do (a bit hacky), but which is ok here in the context of an input value that we want to reset (manipulate the dom without react: we said we shouldn't do that, but if we just want to reset the value entered by a user, it's something you can consider doing (we are not adding a new element or changing a css class, etc.)): below we add: nameInputRef.current.value = '', and ageInputRef.current.value = ''
	// in a nutshell: if you have a case where you just want to read a value, and you never plan on changing anything, then you don't really need state, since it's a lot of unecessary code, so refs are probably better. but in any case either state or refs are fine as approaches, so you have to decide depending on the circumstances. in our case: refs are a bit less code, but we have the edge case of manipulating the dom to reset the input values. Or the state approch, that is a bit cleaner, but we use more code.

	// const [enteredUsername, setEnteredUsername] = useState('');
	// const [enteredAge, setEnteredAge] = useState('');
	// anything that is entered as an input is always retrieved as a string (that's how js and the dom work), that's why we initialize 'enteredAge' as an empty string
	const [error, setError] = useState();
	// initially, our error is undefined.

	// const usernameChangeHandler = (event) => {
	// 	setEnteredUsername(event.target.value);
	// };

	// const ageChangeHandler = (event) => {
	// 	setEnteredAge(event.target.value);
	// };

	const addUserHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredUserAge = ageInputRef.current.value;

		if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
			setError({
				title: 'Fill in the inputs!',
				message: 'Sorry, the inputs cannot be empty like that...',
			});
			return;
		}
		if (+enteredUserAge < 1) {
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

		props.onAddUser(enteredName, enteredUserAge);
		// setEnteredUsername('');
		// setEnteredAge('');
		nameInputRef.current.value = '';
		ageInputRef.current.value = '';
	};

	const errorHandler = () => {
		setError(null);
		// setEnteredUsername('');
		// setEnteredAge('');
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
						// value={enteredUsername}
						// we add the 'value', so we have the current state to be reflected here every time that this component is rendered. if we only wanted to change the input content via keystrokes, we would not need to do this. however, we also want to change the input content when we submit the form (we want to make it empty). that's why we need to do this.
						// onChange={usernameChangeHandler}
						ref={nameInputRef}
					/>
					<label htmlFor='age'>Age</label>
					<input
						type='number'
						id='age'
						// value={enteredAge}
						// onChange={ageChangeHandler}
						ref={ageInputRef}
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

// react portals also help us to write cleaner code. having the nested modal, apart from being not semantically correct, it can also lead to real problems, with styling or accessibility (if a screenreader has to interpret the html code, it will not see the modal as an overlay for the whole page). we can use a portal in order to keep the react code structure we have on the left side of the slide (so we can organize the components the way we want to, so we don't have any problems when passing data and so on), but render the html in a semantially correct way.

// refs allow us to get access to dom elements and work with them. for example, so far, we are updating state every time the user presses a key, but this doesn't sound like the most efficient option. refs will help us with this. refs will establish a connection between the html element that is rendered at the end, and the other js code.

// the approach of using refs to interact with dom elements, specifically with input elements, has a special name: we are talking about 'uncontrolled components' if you are accesing values with a ref. therefore, our inputs would now be uncontrolled components, because their interal state (the value reflected in them) is not controlled by react (we rely on the default behaviour of the inputs, and then we just fetch it with a react feature, but we don't feed data back into the input). (when we reset the inputs, we are not using react). so we are not controlling the state of the input element with react. you can talk about controlled and uncontrolled components in the context of any component, but usually we have this scenario when we talk about input components in a form in general, because these components usually have an interal state natively by the browser, and when we want to work with those components in a react app, we want to connect our react state to that. when we use refs, we have uncontrolled components, and when we use state we have controlled components (then, the inputs internal state is controlled by react).
