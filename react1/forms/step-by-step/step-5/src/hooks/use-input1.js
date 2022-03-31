import { useState } from 'react';

const useInput1 = (validate) => {
	const [value, setValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validate(value);
	const inputIsInvalid = !valueIsValid && isTouched;

	const onInputChange = (event) => {
		setValue(event.target.value);
	};

	const onInputBlur = (event) => {
		setIsTouched(true);
	};

	const onReset = () => {
		setValue('');
		setIsTouched(false);
	};

	return {
		value,
		valueIsValid,
		inputIsInvalid,
		onInputChange,
		onInputBlur,
		onReset,
	};
};

export default useInput1;
