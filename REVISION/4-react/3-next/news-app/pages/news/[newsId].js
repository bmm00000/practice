import { useRouter } from 'next/router';
import { Fragment } from 'react';

const NewsDetail = () => {
	const router = useRouter();
	const newsId = router.query.newsId;

	return (
		<Fragment>
			<h3>{newsId}</h3>
		</Fragment>
	);
};

export default NewsDetail;
