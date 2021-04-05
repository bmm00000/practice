import React from 'react';
import './SeasonDisplay.css';

const seasonConfig = {
	summer: { text: 'it is hot', iconName: 'sun' },
	winter: { text: 'it is cold', iconName: 'snowflake' },
};

const getSeason = (month, lat) => {
	if (month < 9 && month > 4) {
		return lat > 0 ? 'summer' : 'winter';
	}
	if (month < 5 || month > 8) {
		return lat > 0 ? 'winter' : 'summer';
	}
};

const SeasonDisplay = ({ lat }) => {
	const season = getSeason(new Date().getMonth(), lat);
	const { text, iconName } = seasonConfig[season];

	return (
		<div className={`season-display ${season}`}>
			<i className={`massive ${iconName} icon`}></i>
			<h1>{text}</h1>
			<i className={`massive ${iconName} icon`}></i>
		</div>
	);
};

export default SeasonDisplay;
