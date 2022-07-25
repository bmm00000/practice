import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
	name: 'counter',
	initialState: initialCounterState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		incrementByPayload(state, action) {
			state.counter += action.payload;
		},
		decrement(state) {
			state.counter--;
		},
		toggle(state) {
			state.showCounter = !state.showCounter;
		},
	},
});

const store = configureStore({
	reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;

export default store;
