import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = { showCart: false, products: [], totalPrice: 0 };

const cart = createSlice({
	name: 'cart',
	initialState: cartInitialState,
	reducers: {
		toggle(state) {
			state.showCart = !state.showCart;
		},

		add(state, action) {
			state.totalPrice += action.payload.price;

			const existingProductIndex = state.products.findIndex(
				(product) => product.title === action.payload.title
			);
			const existingProduct = state.products[existingProductIndex];

			if (!existingProduct) {
				state.products.push({ ...action.payload, total: action.payload.price });
			} else {
				const updatedProduct = {
					...existingProduct,
					quantity: existingProduct.quantity + 1,
					total: existingProduct.total + existingProduct.price,
				};
				state.products[existingProductIndex] = updatedProduct;
			}
		},

		remove(state, action) {
			state.totalPrice -= action.payload.price;

			const existingProductIndex = state.products.findIndex(
				(product) => product.title === action.payload.title
			);
			const existingProduct = state.products[existingProductIndex];

			if (existingProduct.quantity === 1) {
				const updatedProducts = state.products.filter(
					(product) => product.title !== action.payload.title
				);
				state.products = updatedProducts;
			} else {
				const updatedProduct = {
					...existingProduct,
					quantity: existingProduct.quantity - 1,
					total: existingProduct.total - existingProduct.price,
				};
				state.products[existingProductIndex] = updatedProduct;
			}
		},
	},
});

export const cartActions = cart.actions;

export default cart.reducer;
