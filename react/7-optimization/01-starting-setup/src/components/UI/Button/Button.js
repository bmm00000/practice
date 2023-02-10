import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
	console.log('button re-evaluated');

	return (
		<button
			type={props.type || 'button'}
			className={`${classes.button} ${props.className}`}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default React.memo(Button);
// but we still see 'button re-evaluated' being console.loged, why??
// because the function that we pass as a prop is re-created and passed every time that App is re-executed. this would also happen if we passed a boolean to a component, for example: DemoOutput show={false}, because the 'false' is being re-created every time. however, in this latter case, react.memo would still work, becuase booleans are primitive values, and when react.memo compares the former prop (false) with the current prop (false), it would consider it as the same prop. however, this would not work if you compare reference values (objects, arrays (and functions are objects in js)). therefore, it doesn't work if we pass a function as a prop.

// but we can make react.memo work for prop values that are objects as well, we just need to tweak the way we create and store those objects: useCallback hook (it allows us to store a function across component executions; it tells react that we want to save a function and that it should not be re-created over component re-executions). therefore, the comparison by react.memo will work (see App component), since the function that we pass as a prop will always be the same object stored in memory.
