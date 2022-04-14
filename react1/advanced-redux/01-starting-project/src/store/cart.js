import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
	showCart: false,
	products: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: cartInitialState,
	reducers: {
		toggle(state) {
			state.showCart = !state.showCart;
		},
		add(state, action) {
            const productIsInCart = state.products.find((item) => item.title === action.payload.title)
            if (productIsInCart) {
                state.products = 
            } else {
                state.products = state.products.concat([action.payload]);
            }
			
		},
		subtract(state, action) {
			state.products = state.products.filter(action.payload);
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
