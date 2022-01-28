import { Fragment } from 'react';

import mealsImage from '../../../assets/meals.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>Meals</h1>
				<button>Card</button>
			</header>
			<div className={classes['main-image']}>
				{/* we use the above syntax because the class name has a dash */}
				<img src={mealsImage} alt='A table full of delicious food!' />
				{/* in the src above, you could also add a link, if the image was in some server */}
			</div>
		</Fragment>
	);
};

export default Header;
