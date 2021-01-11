import React from 'react';

const Cards = (props) => {
	return (
		<div className="ui cards">
			<div className="card">
				<div className="content">
					<img alt="avatar" src={props.image} className="right floated mini ui image" />
					<div className="header">
						{props.name} {props.lastname}
					</div>
					<div className="meta">Friends of Veronika</div>
					<div className="description">{props.name} requested permission to view your contact details</div>
					<div>{props.children}</div>
				</div>
				<div className="extra content">
					<div className="ui two buttons">
						<div className="ui basic green button">Approve</div>
						<div className="ui basic red button">Decline</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cards;
