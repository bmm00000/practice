import { useReducer } from 'react';

import CartContext from './cart-context';

const cartDefaultState = { items: [], totalPrice: 0 };

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedItems = [...state.items];
		const existingMealIndex = updatedItems.findIndex(
			(item) => item.id === action.item.id
		);

		if (updatedItems[existingMealIndex]) {
			updatedItems[existingMealIndex].amount =
				updatedItems[existingMealIndex].amount + action.item.amount;
		} else {
			updatedItems.push(action.item);
		}

		const updatedTotalPrice =
			state.totalPrice + action.item.price * action.item.amount;

		return { items: updatedItems, totalPrice: updatedTotalPrice };
	}

	if (action.type === 'REMOVE') {
		let updatedItems;
		const updatingItems = [...state.items];
		const existingMealIndex = updatingItems.findIndex(
			(item) => item.id === action.id
		);

		if (updatingItems[existingMealIndex].amount > 0) {
			updatingItems[existingMealIndex].amount--;
			updatedItems = updatingItems;
		}

		if (updatingItems[existingMealIndex].amount === 0) {
			updatedItems = updatingItems.filter((item) => {
				return item.id !== action.id;
			});
		}

		const updatedTotalPrice =
			state.totalPrice - updatingItems[existingMealIndex].price;

		return { items: updatedItems, totalPrice: updatedTotalPrice };
	}

	return cartDefaultState;
};

const CartProvider = (props) => {
	const [cartState, cartDispatch] = useReducer(cartReducer, cartDefaultState);

	const addItemHandler = (item) => {
		cartDispatch({ type: 'ADD', item });
	};

	const removeItemHandler = (id) => {
		cartDispatch({ type: 'REMOVE', id });
	};

	const cartCtx = {
		items: cartState.items,
		totalPrice: cartState.totalPrice,
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
