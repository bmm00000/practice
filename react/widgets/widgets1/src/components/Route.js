import { useState, useEffect } from 'react';

const Route = ({ path, children }) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};
		window.addEventListener('popstate', onLocationChange);

		return () => {
			window.removeEventListener('popstate', onLocationChange);
		};
	}, []);

	return currentPath === path ? children : null;
};

export default Route;

// to do navigation, we usually use the library React Router, but it has some issues (it changes a lot, etc, see the screenshot). we are doing it without any library, to see how it works (actually React Router works in a similar way to what we did)
