import { useContext } from 'react';
// this hook allows us to establish a connection between this component and the context

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites.context';

function MeetupItem(props) {
	// we call useContext() and pass the the context object that we were exporting in the other file, ie. the context object that we want to connect, and this will return that 'context' objected that we created in the other file, which we were distributing through the 'value' prop to all the components (now we call it 'favoritesCtx'):
	const favoritesCtx = useContext(FavoritesContext);
	// 'favoritesCtx' is an object with the data from the 'context' object now accessible in this component.

	const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

	function toggleFavoriteStatusHandler() {
		// here we change some state that is not managed in this particular component, but on a global level:
		if (itemIsFavorite) {
			favoritesCtx.removeFavorite(props.id);
		} else {
			favoritesCtx.addFavorite({
				id: props.id,
				title: props.title,
				description: props.description,
				image: props.image,
				address: props.address,
			});
		}
	}

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
						{itemIsFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
					</button>
				</div>
			</Card>
		</li>
	);
}

export default MeetupItem;
