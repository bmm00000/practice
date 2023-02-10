import { useContext } from 'react';

import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';

import classes from './MealItem.module.css';

const MealItem = (props) => {
	const cartCtx = useContext(CartContext);

	const price = `$${props.price.toFixed(2)}`;

	const addMealHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			price: props.price,
			name: props.name,
			amount,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<MealItemForm id={props.id} onAddMeal={addMealHandler} />
		</li>
	);
};

export default MealItem;
