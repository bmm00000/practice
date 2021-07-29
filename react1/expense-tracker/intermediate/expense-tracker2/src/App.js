import { useState } from 'react';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const DUMMY_DATA = [
	{
		id: 'e1',
		title: 'Toilet Paper',
		amount: 94.12,
		date: new Date(2020, 7, 14),
	},
	{ id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
	{
		id: 'e3',
		title: 'Car Insurance',
		amount: 294.67,
		date: new Date(2021, 2, 28),
	},
	{
		id: 'e4',
		title: 'New Desk (Wooden)',
		amount: 450,
		date: new Date(2021, 5, 12),
	},
];

const App = () => {
	const [data, setData] = useState(DUMMY_DATA);

	const expenseAddHandler = (expense) => {
		setData((prevData) => [expense, ...prevData]);
	};

	return (
		<div>
			<NewExpense onExpenseAdd={expenseAddHandler} />
			<Expenses expenses={data} />
		</div>
	);
};

export default App;
