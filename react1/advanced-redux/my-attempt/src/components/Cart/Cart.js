import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const cartItems = useSelector((state) => state.cart.products);

	let content;
	if (cartItems.length === 0) {
		content = <p>Your cart is empty. Add stuff now!</p>;
	} else {
		content = (
			<ul>
				{cartItems.map((item) => {
					return (
						<CartItem
							key={Math.random()}
							item={{
								title: item.title,
								quantity: item.quantity,
								total: item.total,
								price: item.price,
							}}
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
