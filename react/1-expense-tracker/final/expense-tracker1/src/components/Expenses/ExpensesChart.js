import Chart from '../Chart/Chart';

const ExpensesChart = (props) => {
	const chartDataPoints = [
		{ label: 'Jan', value: 0 },
		{ label: 'Feb', value: 0 },
		{ label: 'Mar', value: 0 },
		{ label: 'Apr', value: 0 },
		{ label: 'May', value: 0 },
		{ label: 'Jun', value: 0 },
		{ label: 'Jul', value: 0 },
		{ label: 'Aug', value: 0 },
		{ label: 'Sep', value: 0 },
		{ label: 'Oct', value: 0 },
		{ label: 'Nov', value: 0 },
		{ label: 'Dec', value: 0 },
	];

	for (let expense of props.expenses) {
		const expenseMonth = expense.date.getMonth(); // getMonth() starts at 0 for Jan. This will be useful since we can use it as index to access the right month in our 'chartDataPoints' array.
		chartDataPoints[expenseMonth].value += expense.amount;
	}
	// after this loop, you can pass the array to the 'Chart' component and it will have all the right values:

	return (
		<div>
			<Chart dataPoints={chartDataPoints} />
		</div>
	);
};

export default ExpensesChart;
