import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const onAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const onRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const hasItems = cartCtx.items.length > 0;
	const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					price={item.price}
					name={item.name}
					amount={item.amount}
					onRemove={onRemoveHandler.bind(null, item.id)}
					onAdd={onAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Price</span>
				<span>{totalPrice}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
