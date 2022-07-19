import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);

	const numberOfMeals = cartCtx.items.reduce(
		(curNum, curItem) => curNum + curItem.amount,
		0
	);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfMeals}</span>
		</button>
	);
};

export default HeaderCartButton;
