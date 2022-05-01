import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
	return (
		<MeetupDetail
			image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
			title='First Meetup'
			address='23 Harrod St'
			description='First meetup of a beautiful group...'
		/>
	);
}

export async function getStaticPaths() {
	return {
		fallback: false,
		// the 'fallback' key tells next.js whether your paths array contains all supported parameter values ('false', in which case, if the user enters a non-supported value, eg. 'm4', the user will get a 404 error) or just some of them ('true', in which case, next.js will try to generate a page for 'm4' dynamically in this server for the incoming request). 'fallback' is a nice feature because it allows you to pre-generate some of your pages for specific meetupId values (for example, the pages that are visited most frequently), and then pre-generate the missing ones dynamically when requests for them are coming in.
		paths: [
			{ params: { meetupId: 'm1' } },
			{ params: { meetupId: 'm2' } },
			{ params: { meetupId: 'm3' } },
		],
		// in reality, you would not hard code 'm1', etc., but you would fetch your supported ids from a database or an api, and generate this array dynamically. but for the moment, we will hard code it.
	};
	// under 'params', we should have all the key/value pairs that might lead to our dynamic page (for example, if we had multiple dynamic segments, we would have multiple keys in this object; in our case, we only have 'meetupId', as a single dynamic segment, but we could have more keys. in our case, under 'meetupId', we enter the specific value for which this page should be pre-generated)
}
// you will need to export getStaticPaths in a page component file only if it's a dynamic page and you are using getStaticProps. remember that with getStaticProps, a page is pre-generated during the build process, which means that next.js needs to pre-generate all versions of this dynamic page in advance (for all the supported ids, ie. for all the urls or meetupId values that users might be entering at runtime; if a user enters an id for which we haven't pre-generated a page, the user will receive a 404 error). therefore, in getStaticPaths, we return an object where we describe all the dynamic segment values (all the meetupIds) for which this page should be pre-generated. therefore, you need getStaticPaths in dynamic pages in order to tell next.js for which dynamic parameter values this page should be pre-generated. and then getStaticProps executes for every page (ie, for every meetupId value, it allows you to fetch data for that meetup, and allows you to return props for that meetup)

export async function getStaticProps(context) {
	// fetch data for a single meetup:
	// await fetch('...')

	const meetupId = context.params.meetupId;

	// console.log(meetupId)
	// if we console log anything here, you will see it printed in our terminal, not in the console of the browser, because the code in getStaticProps is run during build time, and when running in the development server it does run for every incoming request, but only on the developer's server side.

	return {
		props: {
			meetupData: {
				image:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
				id: meetupId,
				title: 'First Meetup',
				address: '23 Harrod St',
				description: 'First meetup of a beautiful group...',
			},
		},
	};
}

export default MeetupDetails;

// we have a problem: since this is a dynamic page, when we reach out to an api, we need the id of the meetup that we want to render. in this case, we are lucky that the id is encoded in the url, so maybe we think that we can use the useRouter hook to find out about it, BUT the useRouter hook can only be used in the component function, NOT in the getStaticProps function! but thankfully we can also use the 'context' parameter in getStaticProps. in getStaticProps, 'context' will not hold 'req' and 'res', but we will have a 'params' key, which is an object where the identifiers between the [] (ie. 'meetupId' in [meetupId]) will be properties, and the values will be the actual values encoded in the url.
