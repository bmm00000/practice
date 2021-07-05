import './ExpenseForm.css';

const ExpenseForm = () => {
	const titleChangeHandler = (event) => {
		console.log(event.target.value);
	};
	// we get an event as an argument by default when the event listener gets triggered.

	return (
		<form action=''>
			<div className='new-expense__controls'>
				<div className='new-expense__control'>
					<label htmlFor=''>Title</label>
					<input type='text' onChange={titleChangeHandler} />
					{/* we could use 'onInput', but 'onChange' will work with any type of input */}
				</div>
				<div className='new-expense__control'>
					<label htmlFor=''>Amount</label>
					<input type='number' min='0.01' step='0.01' />
				</div>
				<div className='new-expense__control'>
					<label htmlFor=''>Date</label>
					<input type='date' min='2019-01-01' max='2022-12-31' />
				</div>
			</div>
			<div className='new-expense__actions'>
				<button type='submit'>Add Expense</button>
				{/* we add the type 'submit' so when the button gets clicked the form gets submitted */}
			</div>
		</form>
	);
};

export default ExpenseForm;
