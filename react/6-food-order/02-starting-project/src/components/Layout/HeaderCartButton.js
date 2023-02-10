import { useState, useEffect, useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const [btnBumps, setBtnBumps] = useState(false);
	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	const numberOfCartItems = items.reduce(
		(curNum, item) => curNum + item.amount,
		0
	);

	const btnClasses = `${classes.button} ${btnBumps ? classes.bump : ''}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnBumps(true);

		const timer = setTimeout(() => {
			setBtnBumps(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
