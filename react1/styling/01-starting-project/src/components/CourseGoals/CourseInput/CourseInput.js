import React, { useState } from 'react';
// import styled from 'styled-components';

import Button from '../../UI/Button/Button';

// import './CourseInput.css';
import styles from './CourseInput.module.css';

// as we did with the Button, we can paste here the styles from CourseInput.css, get rid of the class names, and add '&' as needed.
// const FormControl = styled.div`
// 	margin: 0.5rem 0;

// 	& label {
// 		font-weight: bold;
// 		display: block;
// 		margin-bottom: 0.5rem;
// 	}

// 	& input {
// 		display: block;
// 		width: 100%;
// 		border: 1px solid #ccc;
// 		font: inherit;
// 		line-height: 1.5rem;
// 		padding: 0 0.25rem;
// 	}

// 	& input:focus {
// 		outline: none;
// 		background: #fad0ec;
// 		border-color: #8b005d;
// 	}

// 	&.invalid label {
// 		color: red;
// 	}

// 	&.invalid input {
// 		border-color: red;
// 		background: salmon;
// 	}
// `;

// can we do conditional styling inside a component from 'styled'? of course!! see what we do:
// we are using the 'invalid' prop here. we have to use a function that receives props as a parameter, and returns the text that should be written there:
// const FormControl = styled.div`
// 	margin: 0.5rem 0;

// 	& label {
// 		font-weight: bold;
// 		display: block;
// 		margin-bottom: 0.5rem;
// 		color: ${(props) => (props.invalid ? 'red' : 'black')};
// 	}

// 	& input {
// 		display: block;
// 		width: 100%;
// 		border: 1px solid ${(props) => (props.invalid ? 'red' : '#ccc')};
// 		background: ${(props) => (props.invalid ? 'salmon' : 'transparent')};
// 		font: inherit;
// 		line-height: 1.5rem;
// 		padding: 0 0.25rem;
// 	}

// 	& input:focus {
// 		outline: none;
// 		background: #fad0ec;
// 		border-color: #8b005d;
// 	}
// `;

const CourseInput = (props) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isValid, setIsValid] = useState(true);

	const goalInputChangeHandler = (event) => {
		setEnteredValue(event.target.value);
		if (enteredValue.trim().length > 0) {
			setIsValid(true);
		}
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (enteredValue.trim().length === 0) {
			setIsValid(false);
			return;
			// we use trim() to cover the case when the user enters a few blank spaces
		}
		props.onAddGoal(enteredValue);
	};

	return (
		<form onSubmit={formSubmitHandler}>
			{/* inline conditional styles: */}
			{/* <div className='form-control'>
				<label style={{ color: !isValid ? 'red' : 'black' }}>Course Goal</label>
				<input
					style={{
						borderColor: !isValid ? 'red' : '#ccc',
						background: !isValid ? 'salmon' : 'transparent',
					}}
					type='text'
					onChange={goalInputChangeHandler}
				/>
			</div> */}
			{/* note that above, when we specify '#ccc' we are duplicating the style of our css stylesheet, that's one of the reasons why we want to avoid inline dynamic styling. That's why we can set up the style with css classes dynamically, as follows: */}
			{/* <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
				<label>Course Goal</label>
				<input type='text' onChange={goalInputChangeHandler} />
			</div> */}
			{/* or, we can also use styled-components to make the div above. if we want to create a component to be used ONLY in this file, we can just write it here (otherwise, we need to write it in a separate file, as we do for every component (as we did for the Button, for example)) (you can have several components in a file, as far as these are only used in that file). look at FormControl.  */}
			{/* styled-components can take any prop and pass it to the underlying component, so we can pass any prop to FormControl and the underlying div will take it, for example, className: */}
			{/* <FormControl className={!isValid && 'invalid'}>
				<label>Course Goal</label>
				<input type='text' onChange={goalInputChangeHandler} />
			</FormControl> */}
			{/* or, you can pass your props to the component, and utilize them inside of the `` of the component, so you can change styles dyanmically. In our example, we set up an 'invalid' prop that can be either true or false: */}
			{/* <FormControl invalid={!isValid}>
				<label>Course Goal</label>
				<input type='text' onChange={goalInputChangeHandler} />
			</FormControl> */}
			<div
				// now we add dynamic classes with CSS modules:
				className={`${styles['form-control']} ${!isValid && styles.invalid}`}
			>
				{/* since we have a dash in the name of the class (form-control), it's not a valid name for the traditional syntax, that's why we use styles['form-control'], this syntax is also valid to access properties in JS */}
				<label>Course Goal</label>
				<input type='text' onChange={goalInputChangeHandler} />
			</div>
			<Button type='submit'>Add Goal</Button>
		</form>
	);
};

export default CourseInput;
