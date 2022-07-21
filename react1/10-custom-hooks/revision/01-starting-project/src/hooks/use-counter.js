import { useState, useEffect } from 'react';

const useCounter = (counterFn) => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter(counterFn);
		}, 1000);

		return () => clearInterval(interval);
	}, [counterFn]);

	return counter;
};

export default useCounter;
