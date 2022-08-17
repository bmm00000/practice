import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
	name: 'cart',
	initialState: cartInitialState,
	reducers: {
		addItemToCart(state, action) {
			state.totalQuantity++;
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);

			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					name: newItem.name,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice += newItem.price;
			}
		},

		removeItemfromCart(state, action) {
			state.totalQuantity--;
			const id = action.payload;

			const existingItem = state.items.find((item) => item.id === id);
			existingItem.totalPrice -= existingItem.price;

			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;