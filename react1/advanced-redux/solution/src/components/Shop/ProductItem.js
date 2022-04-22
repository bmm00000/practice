import { useDispatch } from 'react-redux';
// the first option for side-effects/async tasks is to do it inside the component: we are going to send the http request from inside this component. we will use useSelector to get the current cart before it gets updated, then do all the transformation we do in the reducer inside of ProductItem WITHOUT MUTATING THE STATE (we can only mutate the state with redux-toolkit, but this is just apparent, since redux-toolkit does the work behind the scenes, so it doesn't mutate it; also you never change the state outside of the reducer functions), and then we send a request. this is how it would look like (we will not use this because it has problems; watch again video 256 if needed):
// https://github.com/academind/react-complete-guide-code/tree/19-advanced-redux/code/zz-suboptimal-example-code
// THE PROBLEM WITH THIS APPROACH IS: if we were to use this approach in all parts of our app where we need to update the cart (in our case, we would also need to do so in Cartitem), then we would need to add the same logic there as well (either copying the same code in that component, or importing a function from another file that does that work). also, since we would do the data transformation in our components, and not in our reducers, we could get rid of the addItemToCart reducer, and our reducers would end up not doing a lot of work; that's not necessarily bad, but it's not the main idea of using redux. that's because, when it comes to the question of where to put our code, we have the option of fat reducers, fat components or fat actions (see slide), and when we have synchronous code, we prefer reducers (it's considered a better practice). therefore, in the link above, we have suboptimal code, since we are performing the data transformation in the component, and not in the reducer. but where to transform data? (because we need to transform it before sending it to firebase; we have both a data transformation and an asynchronous operation to perform, but our problem is that we don't want to do the transformation in the component, but we don't want to do the asynchronous operation in the reducer). therefore, what we will do is to do the data transforamtion in the reducer, let redux update its store, and then do the asynchronous operation (send http request) from any component (for example, ProductItem.js, or, in our case, we are going to do it in App.js). ALL AND ALL, what we do is first to update our redux store, and when we are done with that, then we use useSelector to get the updated store to send the request. therefore, we have a fat reducer with all the logic, and then perform from a component any side effects that might depend on our redux state

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
	const dispatch = useDispatch();

	const { title, price, description, id } = props;

	const addToCartHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id,
				price,
				title,
				// or:
				// title: title, etc. (we are using modern js)
			})
		);
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{title}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
