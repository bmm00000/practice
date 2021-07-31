import './ChartBar.css';

const ChartBar = (props) => {
	let barFillHeight = '0%';
	// we do the % as a string because it will be a CSS style
	if (props.maxValue > 0) {
		barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
		// by adding the string '%', we convert the number into a string, this is basic JS.
	}

	return (
		<div className='chart-bar'>
			<div className='chart-bar__inner'>
				{/* setting the style of an element dynamically: in jsx, we need to pass an object inside the dynamic {}, in other words, style wants a JS object as a value (also, the properties are camelCased, eg. backgroundColor): */}
				<div
					className='chart-bar__fill'
					style={{ height: barFillHeight }}
				></div>
			</div>
			<div className='chart-bar__label'>{props.label}</div>
		</div>
	);
};

export default ChartBar;
