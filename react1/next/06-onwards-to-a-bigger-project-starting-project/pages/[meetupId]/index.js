import { Fragment } from 'react';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
	return (
		<MeetupDetail
			image='https://commons.wikimedia.org/wiki/File:Bayerische_Staatskanzlei_Munich_2014_02.jpg'
			title='First Meetup'
			address='Old Street, 5'
			description='The meetup description'
		/>
	);
}

export default MeetupDetails;
