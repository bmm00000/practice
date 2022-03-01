import { useContext } from 'react';

import CartContext from '../../../store/cart-context';
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	// whenever the context changes, the HeaderCartButton component will be re-evaluated by react.

	const numberOfCartItems = cartCtx.items.reduce(
		(curNumber, item) => curNumber + item.amount,
		0
	);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>My Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
