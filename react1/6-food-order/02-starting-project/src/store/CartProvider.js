import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.amount * action.item.price;

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		const existingCartItem = state.items[existingCartItemIndex];

		let updatedCartItems;

		if (existingCartItem) {
			const updatedCartItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};

			updatedCartItems = [...state.items];
			updatedCartItems[existingCartItemIndex] = updatedCartItem;
		} else {
			updatedCartItems = state.items.concat(action.item);
		}

		return { items: updatedCartItems, totalAmount: updatedTotalAmount };
	}

	if (action.type === 'REMOVE') {
		// const existingCartItemIndex = state.items.findIndex(
		// 	(item) => item.id === action.id
		// );
		// const existingCartItem = state.items[existingCartItemIndex];
		// const updatedTotalAmount = state.totalAmount - existingCartItem.price;
		// const updatedCartItems = [...state.items]
		// updatedCartItems[existingCartItemIndex].amount =
		// return {totalAmount: updatedTotalAmount}
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemHandler = (item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};

	const removeItemHandler = (id) => {
		dispatchCartAction({ type: 'DELETE', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
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
