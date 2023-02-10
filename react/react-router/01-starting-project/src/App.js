import { Route, Switch, Redirect } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

function App() {
	return (
		<div>
			<MainHeader />
			<main>
				<Switch>
					<Route path='/' exact>
						<Redirect to='/welcome' />
					</Route>
					{/* above, we are redirecting the user. btw, if you don't use 'exact' you will create an infinite loop! */}
					<Route path='/welcome'>
						<Welcome />
					</Route>
					{/* this route should become active if we have this url: 'our-domain.com/welcome' */}
					<Route path='/products' exact>
						<Products />
					</Route>
					<Route path='/products/:productId'>
						<ProductDetail />
					</Route>
					{/* for dynamic routes we use ':', so we have a dynamic path segment (:productId) */}
				</Switch>
			</main>
		</div>
	);
}

export default App;

// by default, the routes are not parsed such that only one of them is loaded at the same time, but instead all routes that match the current path will be loaded (so we may have several routes loaded if your path starts with the path of another route). it depends on what you want: if you want to have only one active route at a time, then you can use the Switch component around all the Route components (only the route that matches first will be active, but keep in mind that it will be enough for the url path to match with only part of the Route component path, so you may have unwanted behaviours; you can avoid unwanted behaviours by playing around with the order of the Route components, or by using the 'exact' prop (it switches from matching the beginning of the path to matching the full path, so the match will be exact))
