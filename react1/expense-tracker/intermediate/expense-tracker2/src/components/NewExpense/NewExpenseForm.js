import { useState } from 'react';

import './NewExpenseForm.css';

const NewExpenseForm = (props) => {
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');

	const changeTitleHandler = (event) => {
		setTitle(event.target.value);
	};

	const changeAmountHandler = (event) => {
		setAmount(event.target.value);
	};

	const changeDateHandler = (event) => {
		setDate(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onExpenseSave({
			savedTitle: title,
			savedAmount: amount,
			savedDate: new Date(date),
		});
		setTitle('');
		setAmount('');
		setDate('');
	};

	return (
		<form onSubmit={submitHandler}>
			<div className='new-expense__controls'>
				<div className='new-expense__control'>
					<label htmlFor=''>Title</label>
					<input type='text' onChange={changeTitleHandler} value={title} />
				</div>
				<div className='new-expense__control'>
					<label htmlFor=''>Amount</label>
					<input
						type='number'
						min='0.01'
						step='0.01'
						onChange={changeAmountHandler}
						value={amount}
					/>
				</div>
				<div className='new-expense__control'>
					<label htmlFor=''>Date</label>
					<input
						type='date'
						min='2019-01-01'
						max='2022-12-31'
						onChange={changeDateHandler}
						value={date}
					/>
				</div>
			</div>
			<div className='new-expense__actions'>
				<button type='submit'>Add Expense</button>
			</div>
		</form>
	);
};

export default NewExpenseForm;
