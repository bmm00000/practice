import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				'https://cart-ffc6f-default-rtdb.firebaseio.com/cart.json'
			);

			if (!response.ok) {
				throw new Error('Could not fetch cart data!');
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					// we do this in order to avoid an error in the following situation: we clear our cart entirely, then we reload the app, and then there's no array of 'items' when we fetch data again (since there's no 'items' key in firebase). therefore, we have to ensure that we always have an array, so we don't get an error.
					totalQuantity: cartData.totalQuantity,
				})
			);
			// the data we get back from firebase is already formatted correctly so we don't need to transform it, so we can pass it directly to 'replaceCart' (because it already has the format that we sent to firebase in the PUT request). if we had used the POST method instead of the PUT method, firebase would have created a list of data (it would be an object), and we would have had to transform the data we get from firebase in the GET request.
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Fetching cart data failed!',
				})
			);
		}
	};
};

// our own custom action creator:
export const sendCartData = (cart) => {
	return async (dispatch) => {
		// before we call 'dispatch', we can perform any asynchronous code, side effects, etc. because we have not reached the reducer yet.
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				title: 'Sending...',
				message: 'Sending cart data...',
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				'https://cart-ffc6f-default-rtdb.firebaseio.com/cart.json',
				// you can modify the line above to introduce an error and test that the error notification appears as expected.
				{
					method: 'PUT',
					body: JSON.stringify({
						items: cart.items,
						totalQuantity: cart.totalQuantity,
						// we send this object, and not the whole 'cart' in order to avoid sending the 'changed' property to firebase, since we don't need to store it there.
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent cart data successfully!',
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data failed!',
				})
			);
		}
	};
};
