import { Item } from '../models/Item';

interface ShoppingListProps {
	items: Item[];
}

export default function ShoppingList({
	items,
}: ShoppingListProps): JSX.Element {
	return (
		<div>
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						{item.product} - {item.quantity}
					</li>
				))}
			</ul>
		</div>
	);
}
