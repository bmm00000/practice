import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from './store/ui';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.showCart);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		const sendRequest = async () => {
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Sending...',
					message: 'We are sending the data...',
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
				throw new Error('Sending cart data failed!');
			}

			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Data sent successfully!',
				})
			);
		};

		if (isInitial) {
			isInitial = false;
			return;
		}

		sendRequest().catch((error) => {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Request failed!',
				})
			);
		});
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
