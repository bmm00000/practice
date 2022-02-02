import React, { useRef, useImperativeHandle } from 'react';

import classes from '../Input/Input.module.css';

// so far, we have only used props, but the component function can take a second argument: ref (if we need to set a ref from the parent component, as we do from Login.js). however, in order to make the second argument to work, we need to export our component function in a special way (we need to wrap it in something special (React.forwardRef, a method to which we pass the component function as an argument; forwardRef returns a react component that is capable of being bound to a ref). now the Input is able to take a ref prop):
const Input = React.forwardRef((props, ref) => {
	const inputRef = useRef();

	const activate = () => {
		inputRef.current.focus();
	};

	useImperativeHandle(ref, () => {
		return { focus: activate };
	});
	// the second argument is a function that should return an object, and that object will contain all the data that you will be able to use from outside of this component (this is basically a translation object between internal functionalities and the outside world, ie. the parent component). in our case, we will use the 'focus' key from outside this component, in order to access our internal functionality, ie. the 'activate' function ('focus' is the externally avaialable name to access the 'activate' function) (you can do this not only for functions, but also for any type of value)
	// the first argument is the ref that we pass as a second argument to the component function

	return (
		<div
			className={`${classes.control} ${
				props.isValid === false ? classes.invalid : ''
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				ref={inputRef}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
});

export default Input;
