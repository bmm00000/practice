// our-domain.com/new-meetup

import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
	const router = useRouter();

	async function addMeetupHandler(enteredMeetupData) {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// instead of using some external api (eg. 'mydomain.com/abc'), we are using the absolute path '/api/new-meetup', which is an internal api that will be hosted by the same server as is being used for serving this page (we are sending a request to the same server that is serving our page, but to a different path on this server).

		const data = await response.json();

		console.log(data);
		// { message: 'Meetup inserted' }

		router.push('/');
		// we could also use the 'replace' method to make sure that we cannot go back with the 'back' button.

		// since sending the POST request could take some time, we could also show a loading spinner or similar, but that's just client side standard react, nothing specific to next.js.
	}
	// this will send a request to the file inside of the 'api' folder, which will trigger the 'handler' function in there.

	return (
		<Fragment>
			<Head>
				<title>Add new meetup</title>

				<meta
					name='description'
					content='Create your own meetup and generate great networking opportunities!'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</Fragment>
	);
}

export default NewMeetupPage;
