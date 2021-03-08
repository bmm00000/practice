import React from 'react';

const Spinner = (props) => {
	return (
		<div>
			<div className='ui active dimmer'>
				<div className='ui text loader'>{props.message}</div>
			</div>
			<p></p>
		</div>
	);
};

Spinner.defaultProps = {
	message: 'Loading mate!',
};

export default Spinner;
