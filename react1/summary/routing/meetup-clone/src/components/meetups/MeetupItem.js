import { useContext } from 'react';
// this hook allows us to establish a connection between this component and the context

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites.context';

function MeetupItem(props) {
	const favoritesCtx = useContext(FavoritesContext);
	// 'favoritesCtx' is an object with the data from the 'context' object now accessible in this component.

	const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

	function toggleFavoriteStatusHandler() {}

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
					<button onClick={toggleFavoriteStatusHandler}>
						Add to Favourites
					</button>
				</div>
			</Card>
		</li>
	);
}

export default MeetupItem;
