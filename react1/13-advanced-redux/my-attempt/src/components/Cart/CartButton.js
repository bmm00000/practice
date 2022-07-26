import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

import classes from './CartButton.module.css';

const CartButton = (props) => {
	const cartItems = useSelector((state) => state.cart.products);
	const dispatch = useDispatch();

	const toggleCartHandler = () => {
		dispatch(cartActions.toggle());
	};

	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartItems.length}</span>
		</button>
	);
};

export default CartButton;
