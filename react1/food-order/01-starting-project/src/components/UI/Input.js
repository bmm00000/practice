import classes from './Input.module.css';

const Input = (props) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input {...props.input} />
			{/* the above insures that all key value pairs of the input object, are added as props on the input. therefore, you don't need to add id={props.input.id} in the input for the htmlFor in the label, since it's already included in the {...props.input} */}
		</div>
	);
};

export default Input;
