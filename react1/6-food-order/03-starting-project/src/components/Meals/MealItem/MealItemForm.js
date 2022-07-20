import { useState, useRef } from 'react';

import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
	const [formIsValid, setFormIsValid] = useState(true);

	const inputRef = useRef();

	const submitFormHandler = (event) => {
		event.preventDefault();

		const amount = inputRef.current.value;
		const amountNumber = +amount;

		if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 4) {
			setFormIsValid(false);
			return;
		}
		setFormIsValid(true);

		props.onAddMeal(amountNumber);
	};

	return (
		<form action='' className={classes.form} onSubmit={submitFormHandler}>
			<Input
				ref={inputRef}
				label='Amount'
				input={{
					type: 'number',
					id: 'amount_' + props.id,
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
			{!formIsValid && <p>The amount should be from 1 to 5!</p>}
		</form>
	);
};

export default MealItemForm;
