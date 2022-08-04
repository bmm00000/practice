import { createSlice } from '@reduxjs/toolkit';

const uiInitialstate = { showCart: false };

const uiSlice = createSlice({
	name: 'ui',
	initialState: uiInitialstate,
	reducers: {
		toggle(state) {
			state.showCart = !state.showCart;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
