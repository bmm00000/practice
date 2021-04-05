import React from 'react';

const Link = ({ href, className, children }) => {
	const onClick = (event) => {
		if (event.metaKey || event.ctrlKey) {
			return;
		}
		// metaKey for mac and ctrlKey for pc: if the user right-clicked to open the link in a new tab, any of those will return true.
		// we return because we want a full page load if the user opens the link in a new tab.

		event.preventDefault(); // to prevent full page re-load
		window.history.pushState({}, '', href); // to change the url without changing the page content (so there is no network request)

		const navEvent = new PopStateEvent('popstate');
		window.dispatchEvent(navEvent);
		// to communicate to the route components that the url has changed.
	};

	return (
		<a onClick={onClick} href={href} className={className}>
			{children}
		</a>
	);
};

export default Link;
