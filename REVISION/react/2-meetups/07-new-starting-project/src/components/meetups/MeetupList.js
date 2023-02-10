import Meetup from './Meetup';

import classes from './MeetupList.module.css';

const MeetupList = (props) => {
	return (
		<ul className={classes.list}>
			{props.meetups.map((meetup) => {
				return (
					<Meetup
						key={meetup.id}
						id={meetup.id}
						title={meetup.title}
						image={meetup.image}
						address={meetup.address}
						description={meetup.description}
					/>
				);
			})}
		</ul>
	);
};

export default MeetupList;
