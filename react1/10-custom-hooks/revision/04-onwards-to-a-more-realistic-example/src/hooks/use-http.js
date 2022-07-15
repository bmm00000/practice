import { useState, useCallback } from 'react';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (reqConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(reqConfig.url, {
				method: reqConfig.method ? reqConfig.method : 'GET',
				body: reqConfig.body ? JSON.stringify(reqConfig.body) : {},
				headers: reqConfig.headers ? reqConfig.headers : null,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			applyData(data);
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, []);

	return { isLoading, error, sendRequest };
};

export default useHttp;
