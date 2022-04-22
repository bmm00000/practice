import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		// in order to do stuff with the response and handle potential errors, we can use '.then()' or 'async/await'. in order to use 'async/await', we have to wrap the effect in a separate function, as follows:
		const sendCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Sending...',
					message: 'Sending cart data...',
				})
			);
			const response = await fetch(
				'https://cart-ffc6f-default-rtdb.firebaseio.com/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart),
				}
			);

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}

			// if we needed the response data, we could now get it:
			// const responseData = await response.json();
			// but we don't need it, since we are just sending the data to the database. in our case, knowing that we don't get an error is the only thing that we need.

			// we could useState to set up a 'loading', 'error' states, etc. and then conditionally render the Notifications component, etc. but since we already have a uiSlice in redux, we are going to use it (check ui-slice.js):
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent cart data successfully!',
				})
			);
		};
		// sendCartData returns a promise, therefore we can call 'catch()' on it, so we catch any errors that might be thrown from inside the sendCartData funtion:
		sendCartData().catch((error) => {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data filed!',
				})
			);
		});
		// the difference between POST and PUT is that the new data will not be added in a list of data, but will override existing data.
	}, [cart, dispatch]);
	// every time the 'cart' is updated in the redux store, we will send a new http request.
	// note that we could send this http request in any component, not only in App.js
	// We face one problem when using useEffect the way we currently do it: It will execute when our app starts. Why is this an issue? It's a problem because this will send the initial (i.e. empty) cart to our backend and overwrite any data stored there. We'll fix this over the next lectures, I just wanted to point it out here!
	// also, we are just sending the http request, and we are not doing anything with the response, and we are not handling potential errors. in order to take care of that, we use the Notification component.

	return (
		<Layout>
			{showCart && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
