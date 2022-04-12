// our-domain.com/news

import Link from 'next/link';
import { Fragment } from 'react';

function NewsPage() {
	return (
		<Fragment>
			<h1>News Page</h1>
			<ul>
				<li>
					<Link href='news/a-news-headline'>A news headline</Link>
				</li>
				{/* if we used anchors (typical links), we would be sending a new http request for a new html page every time (we would also lose any state we might be storing in redux or context), we don't want that, since we want the reactivity of a spa, and also we want to keep the state that we have across pages. that's why we use Link: it prevents the browser default of sending a new http request and changes url.*/}
				<li>Another news headline</li>
			</ul>
		</Fragment>
	);
}

export default NewsPage;
