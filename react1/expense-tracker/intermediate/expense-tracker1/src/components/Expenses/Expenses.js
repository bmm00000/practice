import { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

const Expenses = ({ expenses }) => {
	const [filteredYear, setFilteredYear] = useState('2021');

	const [filteredExpenses, setFilteredExpenses] = useState(expenses);

	const filterChangeHandler = (selectedYear) => {
		setFilteredYear(selectedYear);
		// if you console.log the year here, it will appear an old state because setState doesn't change the value striaghtaway, but schedules the state update
		setFilteredExpenses((prevExpenses) => {
			return prevExpenses.filter(
				(expense) => expense.date.getFullYear() === filteredYear
			);
		});
	};

	return (
		<div>
			<Card className='expenses'>
				<ExpensesFilter
					selected={filteredYear}
					onChangeFilter={filterChangeHandler}
				/>
				{filteredExpenses.map((expense) => (
					<ExpenseItem
						key={expense.id}
						title={expense.title}
						amount={expense.amount}
						date={expense.date}
					/>
				))}
			</Card>
		</div>
	);
};

export default Expenses;
