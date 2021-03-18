import React from 'react';
import './SeasonDisplay.css';

const seasonConfig = {
	summer: { text: 'It is summer!', iconName: 'sun' },
	winter: { text: 'It is winter!', iconName: 'snowflake' },
};

const getSeason = (month, lat) => {
	if (month > 2 && month < 9) {
		return lat > 0 ? 'summer' : 'winter';
	} else {
		return lat < 0 ? 'summer' : 'winter';
	}
};

const SeasonDisplay = ({ lat }) => {
	const season = getSeason(new Date().getMonth(), lat);
	const { text, iconName } = seasonConfig[season];

	return (
		<div className={`season-display ${season}`}>
			<i className={`${iconName} icon`}></i>
			<h1>{text}</h1>
			<i className={`${iconName} icon`}></i>
		</div>
	);
};

export default SeasonDisplay;
