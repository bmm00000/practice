import CartContext from './cart-context';

const CartProvider = (props) => {
	const addItemHandler = (item) => {};

	const removeItemHandler = (id) => {};

	const cartCtx = {
		items: [],
		totalPrice: 0,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};

	return (
		<CartContext.Provider value={cartCtx}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
