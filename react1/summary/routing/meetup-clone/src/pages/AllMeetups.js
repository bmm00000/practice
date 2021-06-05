import MeetupList from '../components/meetups/MeetupList';

const DUMMY_DATA = [
	{
		id: 'm1',
		title: 'This is a first meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
		address: 'Meetupstreet 5, 12345 Meetup City',
		description:
			'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
	},
	{
		id: 'm2',
		title: 'This is a second meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
		address: 'Meetupstreet 5, 12345 Meetup City',
		description:
			'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
	},
];

function AllMeetupsPage() {
	return (
		<section>
			<h1>All meetups</h1>
			<MeetupList meetups={DUMMY_DATA} />
		</section>
	);
}

export default AllMeetupsPage;

// arrays of JSX elements are rendered automatically by React, for example, when a component returns {[<li>Item1</li>, <li>Item2</li>, <li>Item3</li>]}, the JSX inside the array are rendered, no problem. That's why we use the built-in function map, to map arrays of objects into arrays of JSX elements, as we do in the dummy data above.
