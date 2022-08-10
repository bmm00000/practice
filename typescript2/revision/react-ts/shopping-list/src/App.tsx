import { useState } from 'react';

import { Item } from './models/Item';

import ShoppingListForm from './components/ShoppingListForm';
import ShoppingList from './components/ShoppingList';

function App() {
	// const items = [
	// 	{ id: 1, product: 'apples', quantity: 2 },
	// 	{ id: 2, product: 'banana', quantity: 3 },
	// ];
	const [items, setItems] = useState<Item[]>([]);

	const addItemHandler = (product: string, quantity: number): void => {
		setItems((prevState) => [
			{ id: Math.random(), product, quantity },
			...prevState,
		]);
	};

	return (
		<div>
			<h1>My shopping list</h1>
			<ShoppingListForm onAddItem={addItemHandler} />
			<ShoppingList items={items} />
		</div>
	);
}

export default App;
