import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;
// this variable will be initialized when this file is parsed for the first time, ie. when our app starts (and not when the component is re-rendered subsequently)

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		dispatch(fetchCartData());
		// we could add this custom action creator in the other useEffect, inside the 'if (isInitial)' block, but we will do it here separately, so it looks cleaner, and we don't have any non-related dependencies to what we want to do here.
	}, [dispatch]);

	// THE FIRST OPTION IS TO PUT SIDE EFFECTS AND ASYNC TASKS INSIDE ANY COMPONENT, FOR EXAMPLE, APP.JS:
	// useEffect(() => {
	// in order to do stuff with the response and handle potential errors, we can use '.then()' or 'async/await'. in order to use 'async/await', we have to wrap the effect in a separate function, as follows:
	// const sendCartData = async () => {
	// dispatch(
	// 	uiActions.showNotification({
	// 		status: 'pending',
	// 		title: 'Sending...',
	// 		message: 'Sending cart data...',
	// 	})
	// );
	// const response = await fetch(
	// 	'https://cart-ffc6f-default-rtdb.firebaseio.com/cart.json',
	// 	// you can modify the line above to introduce an error and test that the error notification appears as expected.
	// 	{
	// 		method: 'PUT',
	// 		body: JSON.stringify(cart),
	// 	}
	// );
	// if (!response.ok) {
	// 	throw new Error('Sending cart data failed.');
	// }
	// if we needed the response data, we could now get it:
	// const responseData = await response.json();
	// but we don't need it, since we are just sending the data to the database. in our case, knowing that we don't get an error is the only thing that we need.
	// we could useState to set up a 'loading', 'error' states, etc. and then conditionally render the Notifications component, etc. but since we already have a uiSlice in redux, we are going to use it (check ui-slice.js):
	// dispatch(
	// 	uiActions.showNotification({
	// 		status: 'success',
	// 		title: 'Success!',
	// 		message: 'Sent cart data successfully!',
	// 	})
	// );
	// };

	// if (isInitial) {
	// 	isInitial = false;
	// 	return;
	// }
	// we do this to avoid overriding the existing cart data (ie. emptying the cart) in firebase when we load our app for the first time. after that, we will be sending subsequent http requests and updating the database as we add to or subtract items from the cart.

	// sendCartData returns a promise, therefore we can call 'catch()' on it, so we catch any errors that might be thrown from inside the sendCartData funtion (not only in the 'if(!response.ok)' block), but in the whole function:
	// sendCartData().catch((error) => {
	// 	dispatch(
	// 		uiActions.showNotification({
	// 			status: 'error',
	// 			title: 'Error!',
	// 			message: 'Sending cart data failed!',
	// 		})
	// 	);
	// });
	// the difference between POST and PUT is that the new data will not be added in a list of data, but will override existing data.
	// }, [cart, dispatch]);
	// we add 'dispatch' in the dependences array only because the IDE gave us a yellow underlining and a warning message if we didn't add it. react-redux guarantees that 'dispatch' will not change, so the effect will never be triggered because of 'dispatch', that's why we can add it safely.
	// every time the 'cart' is updated in the redux store, we will send a new http request.
	// note that we could send this http request in any component, not only in App.js
	// We face one problem when using useEffect the way we currently do it: It will execute when our app starts. Why is this an issue? It's a problem because this will send the initial (i.e. empty) cart to our backend and overwrite any data stored there. We'll fix this over the next lectures, I just wanted to point it out here!
	// also, we are just sending the http request, and we are not doing anything with the response, and we are not handling potential errors. in order to take care of that, we use the Notification component.

	// THE OTHER OPTION IS TO PUT SIDE EFFECTS AND ASYNC TASKS INSIDE OF THE ACTION CREATORS (with this approach, we will keep our components lean):
	// above we are using the authomatically created action creators provided by redux-toolkit (we call them to create the actions objects that we dispatch). but we can also write our own action creators to create the so called 'thunks' (custom action creators) (see slide). we can write an action creator as a thunk, so this action creator doesn't return the action immediately (so we can add some more code to do something else before we dispatch the action): see our custom action creator in cart-actions.js:
	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		if (cart.changed) {
			dispatch(sendCartData(cart));
			// we use this 'if' statement to avoid sending back a PUT request to firebase right after we make the GET request to fetch the data when we load the app in the beginning (if we don't add this 'if' statement, since 'cart' will change after the GET request, we will also make a PUT request).
		}

		// this might look strange, becuase what we dispatched before were just action creators that returned an action object. however, now we are dispatching a function that returns another function (sendCartData returns another function), but the great thing about redux when using redux-toolkit is that it's prepared for that: it doesn't accept only action objects (with a type property), but it also accepts action creators that return functions => if it detects that you are dispatching a function, it will execute that function and will give us the 'dispatch' argument authomatically, so that in the returned function we can dispatch again. therefore, we have action creators that can perform side effects, and can then dispatch other actions which eventually reach the reducers as part of a flow of steps that should be taken.
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
