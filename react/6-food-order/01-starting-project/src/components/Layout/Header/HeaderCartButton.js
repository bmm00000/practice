import { useContext, useEffect, useState } from 'react';

import CartContext from '../../../store/cart-context';
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);
	// whenever the context changes, the HeaderCartButton component will be re-evaluated by react.

	const { items } = cartCtx;

	const numberOfCartItems = items.reduce(
		(curNumber, item) => curNumber + item.amount,
		0
	);

	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ''
	}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		// we should also remove the class after the animation finishes, so we can add it again and the animation will work again when 'items' change:
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);
		// we set a timer that fires after 300 miliseconds because that's the duration of the animation (see css document)
		// we also add a cleanup function where we clear that timer in case that component is removed. this can't happen in this app, since the button is always there, but it's a good practice to clean up any timers or other side effects that might be ongoing because you started them in useEffect. in reality, WE NEED THIS CLEANUP function, because if we click on adding items very rapidly, we wanna clear the old timer and make sure a new timer is set.:
		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>My Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
