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

	return (
		<div>
			<Card className='expenses'>
				<ExpenseFilter selectedYear={year} onSelectYear={selectYearHandler} />
				{expenses.map((expense) => (
					<ExpenseItem
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
