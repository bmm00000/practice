import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

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
			<div className={`form-control ${!isValid ? 'invalid' : ''}`}>
				<label>Course Goal</label>
				<input type='text' onChange={goalInputChangeHandler} />
			</div>
			<Button type='submit'>Add Goal</Button>
		</form>
	);
};

export default CourseInput;
