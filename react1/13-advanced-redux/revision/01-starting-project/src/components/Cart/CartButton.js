import { useSelector, useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart';
import classes from './CartButton.module.css';

const CartButton = (props) => {
	const dispatch = useDispatch();
	const totalPrice = useSelector((state) => state.cart.totalPrice);

	const toggleCartHandler = () => {
		dispatch(cartActions.toggle());
	};

	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>${totalPrice}</span>
		</button>
	);
};

export default CartButton;
