import NewExpenseForm from './NewExpenseForm';

import './NewExpense.css';

const NewExpense = (props) => {
	const expenseSaveHandler = (expense) => {
		const savedExpense = {
			...expense,
			id: Math.random().toString(),
		};
		props.onExpenseAdd(savedExpense);
	};

	return (
		<div className='new-expense'>
			<NewExpenseForm onExpenseSave={expenseSaveHandler} />
		</div>
	);
};

export default NewExpense;
