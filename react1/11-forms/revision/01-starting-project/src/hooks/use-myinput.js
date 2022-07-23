import { useReducer } from 'react';

const defaultInputState = { value: '', inputTouched: false };

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { value: action.value, inputTouched: state.inputTouched };
	}

	if (action.type === 'BLUR') {
		return { value: state.value, inputTouched: true };
	}

	if (action.type === 'RESET') {
		return { value: '', inputTouched: false };
	}

	return defaultInputState;
};

const useMyinput = (validateValue) => {
	const [inputState, inputDispatch] = useReducer(
		inputStateReducer,
		defaultInputState
	);

	const valueIsValid = validateValue(inputState.value);
	const valueHasError = !valueIsValid && inputState.inputTouched;

	const onValueChangeHandler = (event) => {
		inputDispatch({ type: 'INPUT', value: event.target.value });
	};

	const onValueBlur = () => {
		inputDispatch({ type: 'BLUR' });
	};

	const reset = () => {
		inputDispatch({ type: 'RESET' });
	};

	return {
		value: inputState.value,
		valueIsValid,
		valueHasError,
		onValueChangeHandler,
		onValueBlur,
		reset,
	};
};

export default useMyinput;
