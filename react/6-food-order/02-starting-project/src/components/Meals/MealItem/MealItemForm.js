import { useState, useRef } from 'react';

import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
	const [inputIsValid, setInputIsValid] = useState(true);

	const amountInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const amountInput = amountInputRef.current.value;
		const amountInputNumber = +amountInput;

		if (
			amountInput.trim().length === 0 ||
			amountInputNumber < 0 ||
			amountInputNumber > 4
		) {
			setInputIsValid(false);
			return;
		}

		props.onAddItem(amountInputNumber);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
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
			{!inputIsValid && <p>The amount must be from 1 to 4!</p>}
		</form>
	);
};

export default MealItemForm;
