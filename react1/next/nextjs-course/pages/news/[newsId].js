// our-domain.com/something-important

import { useRouter } from 'next/router';
// this is a hook built by the next.js team that will allow us to navigate programmatically

function DetailsPage() {
	const router = useRouter();
	// in the 'router' object we will have data and methods for programmatic navigation

	// console.log(router.query.newsId);
	// we can access the url.
	// we will see two console.logs (the first will be undefined) because useRouter runs immediately when the page is first rendered and at this point it doesn't know what's on the url yet, but then when we have that info then the component renders again.

	const newsId = router.query.newsId;
	// now we can send a request to the backend api to fetch the news item with newsId

	return <h1>Details Page</h1>;
}

export default DetailsPage;
