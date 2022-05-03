// our-domain.com/[meetupId]

import { MongoClient, ObjectId } from 'mongodb';
// since in mongodb the ids are kind of object id things, we import 'ObjectId', so we can convert the id that we got from 'context.params' (a string) into that kind of object id thing.

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
	return (
		<MeetupDetail
			image={props.meetupData.image}
			title={props.meetupData.title}
			address={props.meetupData.address}
			description={props.meetupData.description}
		/>
	);
}

export async function getStaticPaths() {
	// we fetch our supported ids from a database or an api:
	// await fetch(...)

	const client = await MongoClient.connect(
		'mongodb+srv://jose_boix:1234567890L9l9.@cluster0.nduop.mongodb.net/meetups?retryWrites=true&w=majority'
	);

	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, {}).toArray();
	// since we are only interested in the ids, we pass an empty object as the first argument (we could define our filter criteria there if we woulnd't want to find all documents, but filter for certain field values, but we want to find all documents, so we don't have filter criteria, so we leave the object empty), and in the second argument we define which fields we want to extract for every document (by default, all fields will be returned, but if we are only interested in the id, then we add {_id: 1}, which means that we only want to include the id, but no other field values (each document will only contain the id))

	client.close();

	return {
		fallback: false,
		// the 'fallback' key tells next.js whether your paths array contains all supported parameter values ('false', in which case, if the user enters a non-supported value, eg. 'm4', the user will get a 404 error) or just some of them ('true', in which case, next.js will try to generate a page for 'm4' dynamically in this server for the incoming request). 'fallback' is a nice feature because it allows you to pre-generate some of your pages for specific meetupId values (for example, the pages that are visited most frequently), and then pre-generate the missing ones dynamically when requests for them are coming in.
		// paths: [
		// 	{ params: { meetupId: 'm1' } },
		// 	{ params: { meetupId: 'm2' } },
		// 	{ params: { meetupId: 'm3' } },
		// ],
		// in the array, we should have one object for each version of this dynamic page (ie. each meetupId). in each object, the 'params' key is a must have, which then again itself is another object with all the key-value pairs that might lead to your dynamic page (for example, if we had multiple dynamic segments, we would have multiple keys in this object; in our case, we only have 'meetupId', as a single dynamic segment, but we could have more keys. in our case, under 'meetupId', we enter the specific value for which this page should be pre-generated)

		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
	// in reality, you would not hard code 'm1', etc., but you would fetch your supported ids from a database or an api, and generate this array dynamically. but for the moment, we will hard code it.
}

// you will need to export getStaticPaths in a page component file only if it's a dynamic page and you are using getStaticProps. remember that with getStaticProps, a page is pre-generated during the build process, which means that next.js needs to pre-generate all versions of this dynamic page in advance (for all the supported ids, ie. for all the urls or meetupId values that users might be entering at runtime; if a user enters an id for which we haven't pre-generated a page, the user will receive a 404 error). therefore, in getStaticPaths, we return an object where we describe all the dynamic segment values (all the meetupIds) for which this page should be pre-generated. therefore, you need getStaticPaths in dynamic pages in order to tell next.js for which dynamic parameter values this page should be pre-generated. and then getStaticProps executes for every page (ie, for every meetupId value, it allows you to fetch data for that meetup, and allows you to return props for that meetup)

// since data doesn't change very often (we can only add meetups, and it definitely doesn't happen several times every second), we use getStaticProps:
export async function getStaticProps(context) {
	// fetch data for a single meetup:
	// await fetch('...')
	// but we have a problem: since this is a dynamic page, when we reach out to an api, we need to identify the meetup that we want to render. therefore, we need, for example, the id of the meetup that we want to render. in this case, we are lucky that the id is encoded in the url, so maybe we think that we can use the useRouter hook to find out about it, BUT the useRouter hook can only be used in the component function, NOT in the getStaticProps function! but thankfully we can also use the 'context' parameter in getStaticProps. in getStaticProps, 'context' will not hold 'req' and 'res', but we will have a 'params' key, which is an object where the identifiers between the [] (ie. 'meetupId' in [meetupId]) will be properties, and the values will be the actual values encoded in the url:

	const meetupId = context.params.meetupId;

	// console.log(meetupId)
	// if we console log anything here, you will see it printed in our terminal that we have as developers, not in the console of the browser, because the code in getStaticProps is run during build time, AND when running in the development server it does run for every incoming request!, but only on the developer's server side.

	const client = await MongoClient.connect(
		'mongodb+srv://jose_boix:1234567890L9l9.@cluster0.nduop.mongodb.net/meetups?retryWrites=true&w=majority'
	);

	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});
	// we pass an object as an argument to 'findOne' to define how to search for the document that we are looking for (we can pass any key value pair (title, image, etc. but in our case we are going to use '_id')).

	return {
		props: {
			// meetupData: {
			// 	image:
			// 		'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
			// 	id: meetupId,
			// 	title: 'First Meetup',
			// 	address: '23 Harrod St',
			// 	description: 'First meetup of a beautiful group...',
			// },

			meetupData: {
				id: selectedMeetup._id.toString(),
				// we need to convert that object id thing into a string, otherwise we will get a serialization error.
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetails;

// in a nutshell, getStaticProps, getStaticPaths, getServerSideProps, allow us to fetch data to pre-render our pages, so we render the pages WITH data.
