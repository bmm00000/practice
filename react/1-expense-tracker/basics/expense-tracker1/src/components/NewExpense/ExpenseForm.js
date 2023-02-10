import { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) => {
	const [enteredTitle, setEnteredTitle] = useState('');
	const [enteredAmount, setEnteredAmount] = useState('');
	// in this situation, we initialize state with an empty string, even if we are using numbers, beause when we get event.target.value, it will get anything as a string.
	const [enteredDate, setEnteredDate] = useState('');

	// or you can also use just one state:
	// const [userInput, setUserInput] = useState({
	// 	enteredTitle: '',
	// 	enteredAmount: '',
	// 	enteredDate: '',
	// });
	// however, the most frequent approach is the first one: different states

	// we get an event as an argument by default when the event listener gets triggered.
	const titleChangeHandler = (event) => {
		setEnteredTitle(event.target.value);
		// or:
		// setUserInput({
		// 	...userInput,
		// 	enteredTitle: event.target.value,
		// });
		// however, the former approach may fail sometimes because your new state depends on a former state, and state updates are scheduled, so there's the possibility that you will be using an incorrect former state for the update. Every time our state update depends on a previous state, we use the following format to guarantee that we get the latest state: setState((prevState)=> newState)':
		// 	setUserInput((prevUserState) => {
		// 		return { ...prevUserState, enteredTitle: event.target.value };
		// });
	};

	const amountChangeHandler = (event) => {
		setEnteredAmount(event.target.value);
		// or:
		// setUserInput((prevState) => {
		// 	return { ...prevState, enteredAmount: event.target.value };
		// });
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
		// or:
		// setUserInput((prevState) => {
		// 	return { ...prevState, enteredDate: event.target.value };
		// });
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const expenseData = {
			title: enteredTitle,
			amount: enteredAmount,
			date: new Date(enteredDate),
		};

		props.onSaveExpenseData(expenseData);
		// and now we empty the inputs, that's why we are using state, and not global variables, so we can change the input when we want, for example, when we submit or just after every change in the input (that's why we use the 'value' attribute in every input, so it gets the right state when it re-renders) (this is called 'two way binding': it allows you to listen to changes in the user input, and also to pass a value to the input, so that we can re-set the input programatically):
		setEnteredTitle('');
		setEnteredAmount('');
		setEnteredDate('');
	};

	return (
		<form onSubmit={submitHandler}>
			<div className='new-expense__controls'>
				<div className='new-expense__control'>
					<label htmlFor=''>Title</label>
					<input
						type='text'
						onChange={titleChangeHandler}
						value={enteredTitle}
					/>
					{/* we could use 'onInput', but 'onChange' will work with any type of input */}
				</div>
				<div className='new-expense__control'>
					<label htmlFor=''>Amount</label>
					<input
						type='number'
						min='0.01'
						step='0.01'
						onChange={amountChangeHandler}
						value={enteredAmount}
					/>
				</div>
				<div className='new-expense__control'>
					<label htmlFor=''>Date</label>
					<input
						type='date'
						min='2019-01-01'
						max='2022-12-31'
						onChange={dateChangeHandler}
						value={enteredDate}
					/>
				</div>
			</div>
			<div className='new-expense__actions'>
				<button type='submit'>Add Expense</button>
				{/* we add the type 'submit' so when the button gets clicked the form gets submitted (it emits the submit event). but keep in mind that when you submit, the default behaviour of the browser is to send another request to the server to reload the page. that's why we use preventDefault() */}
			</div>
		</form>
	);
};

export default ExpenseForm;
