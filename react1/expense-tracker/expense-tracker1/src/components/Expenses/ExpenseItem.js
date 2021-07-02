import { useState } from 'react';
import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
	const [title, setTitle] = useState(props.title);

	const clickHandler = () => {
		setTitle('UPdated!');
		console.log(title);
		// the console.log is still the old title, becuase setTitle doesn't change the value striaghtaway, but schedules the state update
	};

	return (
		<Card className='expense-item'>
			<ExpenseDate date={props.date} />
			<div className='expense-item__description'>
				<h2>{title}</h2>
				<div className='expense-item__price'>${props.amount}</div>
				<button onClick={clickHandler}>Change title</button>
			</div>
		</Card>
	);
};

export default ExpenseItem;
