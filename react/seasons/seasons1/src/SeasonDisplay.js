import React from 'react';
import './SeasonDisplay.css';

const seasonConfig = {
	summer: { text: 'Its very hot!', iconName: 'sun' },
	winter: { text: 'Its very cold!', iconName: 'snowflake' },
};

const getSeason = (month, lat) => {
	if (month > 2 && month < 9) {
		return lat > 0 ? 'summer' : 'winter';
	} else {
		return lat < 0 ? 'summer' : 'winter';
	}
};

const SeasonDisplay = (props) => {
	const season = getSeason(new Date().getMonth(), props.lat);

	const { text, iconName } = seasonConfig[season];

	return (
		<div className={`season-display ${season}`}>
			<i className={`left-icon massive ${iconName} icon`}></i>
			<h1>{text}</h1>
			<i className={`right-icon massive ${iconName} icon`}></i>
		</div>
	);
};

export default SeasonDisplay;
