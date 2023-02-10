import { useContext } from 'react';

import FavoritesContext from '../../store/favorites-context';
import Card from '../ui/Card';

import classes from './Meetup.module.css';

const Meetup = (props) => {
	const favoritesCtx = useContext(FavoritesContext);

	const isFave = favoritesCtx.isFavorite(props.id);

	const buttonText = isFave ? 'Remove from Favorites' : 'Add to Favorites';

	const favoritesToggleHandler = () => {
		isFave
			? favoritesCtx.removeFavorite(props.id)
			: favoritesCtx.addFavorite({
					id: props.id,
					title: props.title,
					image: props.image,
					address: props.address,
					description: props.description,
			  });
	};

	return (
		<li className={classes.item}>
			<Card>
				<div className={classes.image}>
					<img src={props.image} alt={props.title} />
				</div>
				<div className={classes.content}>
					<h3>{props.title}</h3>
					<address>{props.address}</address>
					<p>{props.description}</p>
				</div>
				<div className={classes.actions}>
					<button onClick={favoritesToggleHandler}>{buttonText}</button>
				</div>
			</Card>
		</li>
	);
};

export default Meetup;
