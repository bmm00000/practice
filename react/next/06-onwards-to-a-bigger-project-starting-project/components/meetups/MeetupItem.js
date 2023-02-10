import { useRouter } from 'next/router';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
	const router = useRouter();
	// this is a hook, and the rules of hooks apply: it can only be called at the root level of the component function. it returns an object that has data and methods to navigate programmatically/imperatively.

	function showDetailsHandler() {
		router.push('/' + props.id);
	}
	// even though using the Link component would be better, we are doing this to illustrate how to navigate programmatically.

	return (
		<li className={classes.item}>
			<Card>
				<div className={classes.image}>
					<img src={props.image} alt={props.title} />
				</div>
				<div className={classes.content}>
					<h3>{props.title}</h3>
					<address>{props.address}</address>
				</div>
				<div className={classes.actions}>
					<button onClick={showDetailsHandler}>Show Details</button>
				</div>
			</Card>
		</li>
	);
}

export default MeetupItem;
