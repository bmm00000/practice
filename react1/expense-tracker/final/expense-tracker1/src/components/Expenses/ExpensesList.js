import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
	// you can use jsx content as value that is stored in a variable before you return:
	// let expensesContent = <p>No expenses found</p>;
	// if (props.items.length > 0) {
	// 	expensesContent = props.items.map((expense) => (
	// 		<ExpenseItem
	// 			key={expense.id}
	// 			title={expense.title}
	// 			amount={expense.amount}
	// 			date={expense.date}
	// 		/>
	// 	));
	// }
	// BUT IF WHAT THE COMPONENT RETURNS CHANGES COMPLETELY, THEN IT'S BETTER TO USE TWO RETURN BLOCKS:
	if (props.items.length === 0) {
		return <h2 className='expenses-list__fallback'>No Expenses found</h2>;
	}

	return (
		<ul className='expenses-list'>
			{/* we cannot use blocks inside {} in the return block, that's why we cannot use if statements or loops when we are rendering conditionally. we could use a ternary expression, but long ternary expressions can be difficult to read, that's why we can restructure it as follows: */}
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
			{/* {expensesContent} */}
			{/* IF WHAT THE COMPONENT RETURNS CHANGES COMPLETELY: */}
			{props.items.map((expense) => (
				<ExpenseItem
					key={expense.id}
					title={expense.title}
					amount={expense.amount}
					date={expense.date}
				/>
			))}
		</ul>
	);
};

export default ExpensesList;
