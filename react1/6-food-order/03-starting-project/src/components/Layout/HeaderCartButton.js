import { useState, useEffect, useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const [cartBtnBump, setCartBtnBump] = useState(false);
	const cartCtx = useContext(CartContext);

	const { items: cartItems } = cartCtx;

	useEffect(() => {
		let timer;
		if (cartItems.length > 0) {
			setCartBtnBump(true);
			timer = setTimeout(() => {
				setCartBtnBump(false);
			}, 300);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [cartItems]);

	const numberOfMeals = cartCtx.items.reduce(
		(curNum, curItem) => curNum + curItem.amount,
		0
	);

	const btnClasses = `${classes.button} ${cartBtnBump && classes.bump}`;

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfMeals}</span>
		</button>
	);
};

export default HeaderCartButton;