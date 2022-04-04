// we don't need to useReducer in out form, but we are going to use it just as practice:

import { useReducer } from 'react';

const initialInputState = { value: '', isTouched: false };

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { value: action.value, isTouched: state.isTouched };
	}

	if (action.type === 'BLUR') {
		return { isTouched: true, value: state.value };
	}

	if (action.type === 'RESET') {
		return { value: '', isTouched: false };
	}

	return initialInputState;
};

const useInputUseReducer = (validateValue) => {
	const [state, dispatch] = useReducer(inputStateReducer, initialInputState);

	const valueIsValid = validateValue(state.value);
	const hasError = !valueIsValid && state.isTouched;

	const valueChangeHandler = (event) => {
		dispatch({ type: 'INPUT', value: event.target.value });
	};

	const inputBlurHandler = (event) => {
		dispatch({ type: 'BLUR' });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	return {
		value: state.value,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInputUseReducer;
