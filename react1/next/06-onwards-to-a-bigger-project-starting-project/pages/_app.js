import Layout from '../components/layout/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;

// if we want to use, for example, the Layout component to wrap many components, it can become cumbersome. that's why we have _app.js. MyApp is a special component that will act as a kind of root component that next.js will render.
// the prop Component will have the actual content that should be rendered (it will be different when we switch pages). therefore, we can wrap any layout around it (for example, our Layout component), and it will be rendered in all our pages.
// pageProps are props that our pages might be getting (we might or might not have any).
