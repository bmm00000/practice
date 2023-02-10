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

// how to transform a list of data into a list of JSX elements, and to render that list of JSX elements dynamically (dynamically means the opposite of hard-coding, so components are reusable and dynamic):
// arrays of JSX elements are rendered automatically by React, for example, when a component returns {[<li>Item1</li>, <li>Item2</li>, <li>Item3</li>]}, the JSX inside the array are rendered, no problem. That's why we use the built-in function map, to transform arrays of objects into arrays of JSX elements, so we can render the latter.
// the 'key' prop that React expects in order to render efficiently arrays of jsx elements, is one of the props that is built-in in any component, including in custom components, so you can use it anywhere.
