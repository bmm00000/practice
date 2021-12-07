import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

// we could write the code to fetch meetups in this component, but we want to make this component reusable (actually we will use this component in different pages), so we won't fetch the data here.
function MeetupList(props) {
	return (
		<ul className={classes.list}>
			{props.meetups.map((meetup) => (
				<MeetupItem
					key={meetup.id}
					id={meetup.id}
					image={meetup.image}
					title={meetup.title}
					address={meetup.address}
					description={meetup.description}
				/>
			))}
		</ul>
	);
}

export default MeetupList;
