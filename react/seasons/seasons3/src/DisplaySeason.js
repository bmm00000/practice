import React from 'react';
import './DisplaySeason.css';

const seasonConfig = {
	summer: { text: 'It is hot!', iconName: 'sun' },
	winter: { text: 'It is cold!', iconName: 'snowflake' },
};

const getSeason = (month, lat) => {
	if (month < 9 && month > 4) {
		return lat > 0 ? 'summer' : 'winter';
	} else {
		return lat > 0 ? 'winter' : 'summer';
	}
};

const DisplaySeason = (props) => {
	const season = getSeason(new Date().getMonth(), props.lat);

	const { text, iconName } = seasonConfig[season];

	return (
		<div className={`display-season ${season}`}>
			<i className={`${iconName} icon massive`}></i>
			<h1>{text}</h1>
			<i className={`${iconName} icon massive`}></i>
		</div>
	);
};

export default DisplaySeason;
