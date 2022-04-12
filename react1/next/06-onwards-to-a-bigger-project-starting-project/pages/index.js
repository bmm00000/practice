// our-domain.com

import Layout from '../components/layout/Layout';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'First meetup',
		image:
			'https://commons.wikimedia.org/wiki/File:Bayerische_Staatskanzlei_Munich_2014_02.jpg',
		address: '23 Harrod St',
		description: 'Meetup in beautiful Bucharest',
	},
	{
		id: 'm2',
		title: 'Second meetup',
		image:
			'https://commons.wikimedia.org/wiki/File:Bayerische_Staatskanzlei_Munich_2014_02.jpg',
		address: '23 Harrod St',
		description: 'Meetup in beautiful Bucharest',
	},
	{
		id: 'm3',
		title: 'Third meetup',
		image:
			'https://commons.wikimedia.org/wiki/File:Bayerische_Staatskanzlei_Munich_2014_02.jpg',
		address: '23 Harrod St',
		description: 'Meetup in beautiful Bucharest',
	},
];

function HomePage() {
	return (
		<Layout>
			<MeetupList meetups={DUMMY_MEETUPS} />
		</Layout>
	);
}

export default HomePage;
