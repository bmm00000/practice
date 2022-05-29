import { useCallback, useState } from 'react';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			// we are assuming that we will always receive json data, so we will not make this hook super generic to work with any kind of data.
			applyData(data);
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, []);
	// watch out! requestConfig is an object, and applyData, as a function, is also an object. therefore, in the App component we have to make sure that these objects are not recreated every time App is re-evaluated. that's why we have to useCallback in the App component as well.

	// return { isLoading: isLoading, error: error, sendRequest: sendRequest };
	// the former is the same as:
	return { isLoading, error, sendRequest };
};

export default useHttp;

// this custom hook should not only be dealing with fetching tasks, because in that case this hook would not be very re-usable. instead, this hook should be able to send any kind of request to any kind of url, and to do any kind of data transformation.
