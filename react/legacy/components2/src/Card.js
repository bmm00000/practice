import React from 'react';

const Card = (props) => {
	return (
		<div class='card'>
			<div class='content'>
				{props.children}
				<div class='extra content'>
					<div class='ui two buttons'>
						<div class='ui basic green button'>Approve</div>
						<div class='ui basic red button'>Decline</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
