// our-domain.com
// import { useState, useEffect } from 'react';

// import Layout from '../components/layout/Layout';
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

function HomePage(props) {
	// const [loadedMeetups, setLoadedMeetups] = useState([]);

	// useEffect(() => {
	// 	// send an http request and fetch data
	// 	// we are going to simulate that we are fetching data from a backend:
	// 	setLoadedMeetups(DUMMY_MEETUPS);
	// }, []);
	// therefore, we will have two component render cycles: the first time the component is rendered, loadedMeetups will be empty, after the component is rendered, the effect function will be executed, and when the state changes, the component will be re-rendered with the new state. therefore, if we were getting data from a backend, our users would see a loading spinner briefly. but even in our ideal fake situation where we already have the data and therefore don't spend any time fetching it (we are not sending a request, but loading the DUMMY_MEETUPS that we already have in this file), because of these two render cycles, we have a problem with SEO: if you inspect the source code, you will see that the ul that contains the meetups list is empty, so the items that we see in our page are missing in the html file that we would get from the server. they are missing because they are only rendered in the second component execution cycle, but the pre-rendered (pre-rendered: rendered in the server) html page generated by next.js authomatically does not wait for this second cycle (it always takes the result of the first render cycle). in a nutshell, next.js does not wait for the data to be fetched from a server. but, as we will see, next.js has more features built into it that solve this problem (we want to pre-render a page with data, but with data that we will have to wait for, but next.js doesn't wait for the data, so there will be missing data in the pre-rendered page). how can we fetch data for pre-rendering?
	// the way it works is: after the page is received by the browser, react will take over: the page will be hydrated with react code once the page has been loaded (react will turn this page into an spa and take over control); then useEffect will be executed, data might be fetched, and that data will be reflected in the browser, not on the server (not on the pre-rendered page, but after this page was received in the browser). but if we want to pre-render a page that already contains the data, so that the originally returned (by the server) html code already contains the data, we need to configure the pre-rendering process: next.js gives us two forms of pre-rendering that allow us to control how the page is pre-rendered: static generation, and server-side rendering (the code runs at different points in time in these two options). (typicaly, we should use static generation).
	// when you use 'static generation', a page component is pre-rendered when you build your app (for production: npm run build). ie. by default, your page is not pre-rendered on the fly on the server when a request reaches the server, but instead is pre-rendered when you as a developer build your site for production, and that means that after it was deployed, that pre-rendered page does not change (if you want to change the data, you need to build again and deploy again) (in some apps, data doesn't change at least that often, so this solution may be convenient). (remember, by default, next.js generates your pages statically in the build process, but if you need to add data fetching to a page component, you can do so by exporting a special functio (getStaticProps) from your page component file: IT WORKS ONLY IN COMPONENT FILES INSIDE OF THE 'PAGES' FOLDER)

	return (
		// <Layout>
		// <MeetupList meetups={loadedMeetups} />
		<MeetupList meetups={props.meetups} />
		// </Layout>
	);
}

export async function getStaticProps() {
	// fetch data from api, or read some files from the file system, etc.
	// once you have done anything you need, you have to return an object, with the 'props' property that will hold the props object that will be received in the component function (therefore, we no longer will need useState, and useEffect):
	return {
		props: {
			meetups: DUMMY_MEETUPS,
		},
	};
}
// next.js will execute this function during the pre-rendering process, so it will not direcly call the component function, but first next.js will call getStaticProps, and the job of this function is to prepare the props for this page, and these props could contain the data that this page needs. and this function is allowed to be asynchronous, and next.js will wait for the returned promise to resolve, so it will wait until our data is loaded, and then we return the props for this component. therefore, we are loading the data before this component function (HomePage) is executed, so this component can be rendered with the required data. also, in getStaticProps you can execute any code that would normally only run on a server (access file system, connect to a database, etc.) because any code there will never end up on the client side and therefore will never be executed on the client side (because that code will be executed during the build process, not on the server, and not on the clients of your visitors). all and all, we are moving the data fetching from the client to the build process. now you can check the page source, and you will not see the empty 'ul' that you had before, and that's great for search engines.

export default HomePage;
