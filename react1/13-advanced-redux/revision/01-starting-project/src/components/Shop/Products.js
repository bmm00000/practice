import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				<ProductItem
					title='Test product 1'
					price={6}
					description='This is the first product - amazing!'
				/>
				<ProductItem
					title='Test product 2'
					price={9}
					description='This is the second product - amazing!'
				/>
			</ul>
		</section>
	);
};

export default Products;
