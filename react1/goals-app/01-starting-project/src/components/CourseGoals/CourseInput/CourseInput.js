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

// now, in order to apply conditional styling, we are using the 'invalid' prop here. we have to use a function that receives props as a parameter, and returns the text that should be written there:
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
	// the following state is about whether or not the user entered a valid input (or just left it empty, or with blank spaces, etc.):
	const [isValid, setIsValid] = useState(true);

	const goalInputChangeHandler = (event) => {
		// we do the following to reset default styles when input becomes valid:
		if (event.target.value.trim().length > 0) {
			setIsValid(true);
		}
		setEnteredValue(event.target.value);
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();
		// we do the following to avoid that a new goal is entered when the goal is empty:
		if (enteredValue.trim().length === 0) {
			setIsValid(false);
			return;
			// we use trim() to cover the case when the user enters a few blank spaces
		}
		props.onAddGoal(enteredValue);
	};

	return (
		<form onSubmit={formSubmitHandler}>
			{/* INLINE CONDITIONAL STYLES: */}
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
			{/* note that above, when we set up INLINE STYLES, it has the highest priority in css, which we don't want, since you would override all other default styles with any values you put in there. also, even if you hard coded the default style '#ccc' above, we are duplicating the style of our css stylesheet, that's one of the reasons why we want to avoid inline dynamic styling. That's why we can set up the style with CSS CLASSES DYNAMICALLY, as follows: */}
			{/* <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
				<label>Course Goal</label>
				<input type='text' onChange={goalInputChangeHandler} />
			</div> */}
			{/* 
			with the former approach, we just use regular css, but the problem with larger projects is that any other developer can use, for example, a class name that has already been used, so styles will get messed up. we have two solutions for this problem: STYLED COMPONENTS package, or CSS MODULES.
			STYLED COMPONENTS helps you build components that have certain styles attached to them, where the styles only affect the components that they were attached to. as first step, go to the website, copy the link and install the package through npm. (look at Button.js, and then look at FormControl component in this file).
			
			if we want to create a component to be used ONLY in this file, we can just write it here (otherwise, we need to write it in a separate file, as we do for every component (as we did for the Button, for example)) (you can have several components in a file, as far as these are only used in that file). look at FormControl.  */}
			{/* styled-components can take any prop and pass it to the underlying component, so we can pass any prop to FormControl and the underlying div will take it. IF the prop is a keyword in the underling component, for example, className, then className will be taken as a keyword and directly used by the div, NOT AS THE FOLLOWING: props.className!!): */}
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
				// now we add dynamic classes conditionally with CSS modules:
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
