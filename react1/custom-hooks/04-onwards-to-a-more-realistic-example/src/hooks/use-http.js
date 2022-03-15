import { useState } from 'react';

const useHttp = (requestConfig, applyData) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = async () => {
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

			// we will limit this custom hook to work only with json data, not with any kind of data:
			const data = await response.json();
			applyData(data);
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	};

	// return { isLoading: isLoading, error: error, sendRequest: sendRequest };
	// we can use the following shortcut in modern js:
	return { isLoading, error, sendRequest };
};

export default useHttp;

// we want this custom hook to be reusable, not only limited to fetching tasks. this custom hook should be able to send any kind of request to any kind of url and do any kind of data transformation.
