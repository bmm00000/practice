import { useContext } from 'react';

import FavoritesContext from '../../store/favorites-context';
import Card from '../ui/Card';

import classes from './MeetupItem.module.css';

function MeetupItem(props) {
	const favoritesCtx = useContext(FavoritesContext);

	const meetupIsFavorite = favoritesCtx.isFavorite(props.id);

	function favoriteToggleHandler() {
		if (meetupIsFavorite) {
			favoritesCtx.removeFavorite(props.id);
		} else {
			favoritesCtx.addFavorite({
				title: props.title,
				image: props.image,
				address: props.address,
				description: props.description,
				id: props.id,
			});
		}
	}

	return (
		<Card>
			<li className={classes.item}>
				<div className={classes.image}>
					<img src={props.image} alt={props.title} />
				</div>
				<div className={classes.content}>
					<h3>{props.title}</h3>
					<address>{props.address}</address>
					<p>{props.description}</p>
				</div>
				<div className={classes.actions}>
					<button onClick={favoriteToggleHandler}>
						{meetupIsFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
					</button>
				</div>
			</li>
		</Card>
	);
}

export default MeetupItem;
