import React from 'react';
import './DisplaySeason.css';

const seasonConfig = {
	summer: { text: 'Its hot!', iconName: 'sun' },
	winter: { text: 'Its cold!', iconName: 'snowflake' },
};

const getSeason = (month, lat) => {
	if (month > 2 && month < 10) {
		return lat > 0 ? 'summer' : 'winter';
	} else {
		return lat < 0 ? 'summer' : 'winter';
	}
};

const DisplaySeason = (props) => {
	const season = getSeason(new Date().getMonth(), props.lat);
	const { text, iconName } = seasonConfig[season];

	return (
		<div className={`season-display ${season}`}>
			<div className='left-icon'>
				<i className={`${iconName} icon massive`}></i>
			</div>
			<h1>{text}</h1>
			<div className='right-icon'>
				<i className={`${iconName} icon massive`}></i>
			</div>
		</div>
	);
};

export default DisplaySeason;
