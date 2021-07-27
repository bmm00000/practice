import { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

const Expenses = ({ expenses }) => {
	const [filteredYear, setFilteredYear] = useState('2021');

	const filterChangeHandler = (selectedYear) => {
		setFilteredYear(selectedYear);
		// if you console.log the year here, it will appear an old state because setState doesn't change the value striaghtaway, but schedules the state update
	};

	const filteredExpenses = expenses.filter(
		(expense) => expense.date.getFullYear().toString() === filteredYear
	);

	// you can use jsx content as value that is stored in a variable before you return:
	let expensesContent = <p>No expenses found</p>;
	if (filteredExpenses.length > 0) {
		expensesContent = filteredExpenses.map((expense) => (
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
				<ExpensesFilter
					selected={filteredYear}
					onChangeFilter={filterChangeHandler}
				/>
				{/* {filteredExpenses.length === 0 && <p>No expenses found</p>}
				{filteredExpenses.length > 0 &&
					filteredExpenses.map((expense) => (
						<ExpenseItem
							key={expense.id}
							title={expense.title}
							amount={expense.amount}
							date={expense.date}
						/>
					))} */}
				{/* we could do what we did just above, but it's better to have a lean jsx snippet in the return block. therefore, the following is the best approach: */}
				{expensesContent}
			</Card>
		</div>
	);
};

export default Expenses;
