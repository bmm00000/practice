import { useState } from 'react';

import CartContext from './cart-context';

const CartProvider = (props) => {
	const [itemsList, setItemsList] = useState([]);

	const addItemHandler = (item) => {};

	const removeItemHandler = (id) => {};

	const cartContext = {
		items: itemsList,
		totalAmount: 0,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
