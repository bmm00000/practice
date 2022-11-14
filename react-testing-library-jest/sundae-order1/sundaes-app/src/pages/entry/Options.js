import { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		axios
			.get(`https://localhost:3000/${optionType}`)
			.then((response) => setItems(response.data))
			.catch((err) => console.log(err));
	}, [optionType]);

	// todo: change null
	const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

	const optionsContent = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	));

	return <Row>{optionsContent}</Row>;
};

export default Options;
