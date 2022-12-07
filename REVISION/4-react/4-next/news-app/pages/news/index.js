import { Fragment } from 'react';
import Link from 'next/link';

const News = () => {
	return (
		<Fragment>
			<h2>This is the general news page</h2>
			<ul>
				<li>
					<Link href='/news/next-great'>Next.js is great to build apps</Link>
				</li>
				<li>
					<Link href='/news/next-beaten'>Next.js has been beaten by Remix</Link>
				</li>
			</ul>
		</Fragment>
	);
};

export default News;
