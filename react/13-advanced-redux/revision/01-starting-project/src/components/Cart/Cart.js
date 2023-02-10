import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const products = useSelector((state) => state.cart.products);

	let content = <p>Cart empty. Add some products!</p>;

	if (products.length > 0) {
		content = (
			<ul>
				{products.map((product) => {
					return (
						<CartItem
							title={product.title}
							quantity={product.quantity}
							total={product.total}
							price={product.price}
						/>
					);
				})}
			</ul>
		);
	}

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			{content}
		</Card>
	);
};

export default Cart;
