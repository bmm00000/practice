import { useState } from 'react';

import Item from './models/item';

import Greeter from './components/Greeter';
import ShoppingList from './components/ShoppingList';
import ShoppingListForm from './components/ShoppingListForm';

// const items = [
// 	{ id: 1, product: 'Lemons', quantity: 3 },
// 	{ id: 2, product: 'Vegetables', quantity: 55 },
// ];

function App() {
	const [items, setItems] = useState<Item[]>([]);

	const addItem = (product: string, quantity: number): void => {
		console.log('made it to the app componnent');
		setItems([...items, { id: Math.random(), product, quantity }]);
	};

	return (
		<div>
			<Greeter person='Helen' />
			<Greeter person='Paul' />
			<Greeter person='Alastair' />
			<ShoppingListForm onAddItem={addItem} />
			<ShoppingList items={items} />
		</div>
	);
}

export default App;
