import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import ScoopOption from './ScoopOption';

export default function Options({ optionType }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then((response) => setItems(response.data))
			.catch((err) => console.log('this is the error', err));
	}, [optionType]);

	// TODO: replace 'null' with ToppingOption when we have it.
	const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

	const optionsList = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	));

	return <Row>{optionsList}</Row>;
}
