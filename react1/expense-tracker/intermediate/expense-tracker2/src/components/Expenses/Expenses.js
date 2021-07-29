import { useState } from 'react';

import Card from '../UI/Card/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

const Expenses = ({ expenses }) => {
	const [year, setYear] = useState('2021');

	const selectYearHandler = (chosenYear) => {
		setYear(chosenYear);
	};

	const filteredExpenses = expenses.filter(
		(expense) => expense.date.getFullYear().toString() === year
	);

	let content = <p>No expenses</p>;
	if (filteredExpenses.length > 0) {
		content = filteredExpenses.map((expense) => (
			<ExpenseItem
				key={expense.id}
				title={expense.title}
				amount={expense.amount}
				date={expense.date}
			/>
		));
	}
	return (
		<div>
			<Card className='expenses'>
				<ExpenseFilter selectedYear={year} onSelectYear={selectYearHandler} />
				{content}
			</Card>
		</div>
	);
};

export default Expenses;
