import { useState, useEffect } from 'react';

const useCounter = (forward = true) => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (forward) {
				setCounter((prevCounter) => prevCounter + 1);
			} else {
				setCounter((prevCounter) => prevCounter - 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [forward]);

	return counter;
};

export default useCounter;

// the name of the function has to start with 'use'. this signals to react that it will be a custom hook, and it gives react the guarantee that you are using that function while respecting the rules of hooks, and that you will use it the same way that you are using other built-in hooks. react needs this guarantee to make sure that hooks are not used in the wrong place. note that for the file name storing a custom hook, you can name it whatever you want.
