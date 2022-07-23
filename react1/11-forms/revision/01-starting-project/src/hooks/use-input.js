import { useState } from 'react';

const useInput = (validateInput) => {
	const [inputValue, setInputValue] = useState('');
	const [inputTouched, setInputTouched] = useState(false);

	const inputContentValid = validateInput(inputValue);
	const inputHasError = !inputContentValid && inputTouched;

	const onInputChangeHandler = (event) => {
		setInputValue(event.target.value);
	};

	const onInputBlurHandler = (event) => {
		setInputTouched(true);
	};

	const reset = () => {
		setInputValue('');
		setInputTouched(false);
	};

	return {
		inputValue,
		inputContentValid,
		inputHasError,
		onInputChangeHandler,
		onInputBlurHandler,
		reset,
	};
};

export default useInput;
