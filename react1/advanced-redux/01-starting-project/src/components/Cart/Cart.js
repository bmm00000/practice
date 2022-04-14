import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const cartItems = useSelector((state) => state.cart.products);

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			{cartItems.length === 0 ? <p>Your cart is empty. Add stuff now!</p> : ''}
			<ul>
				{cartItems.map((item) => {
					return (
						<CartItem
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
		</Card>
	);
};

export default Cart;
