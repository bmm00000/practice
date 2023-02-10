import { useParams } from 'react-router-dom';

function ProductDetail() {
	const params = useParams();
	// this is a hook created by the react-router team, which will return a parameters object with key-value pairs (route parameters), where the keys are the dynamic segments leading to this page (we may have multiple segments, for example: '/:productId/:anotherId')
	// console.log(params.productId);

	return (
		<section>
			<h1>Product Detail</h1>
			<p>{params.productId}</p>
		</section>
	);
}

export default ProductDetail;
