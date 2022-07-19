import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpeg';

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h2>React Meals</h2>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImage} alt='A table with meals' />
			</div>
		</Fragment>
	);
};

export default Header;
