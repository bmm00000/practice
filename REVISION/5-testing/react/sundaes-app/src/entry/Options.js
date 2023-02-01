import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:3000/${optionType}`)
			.then((response) => setItems(response.data))
			.catch((err) => {
				// TODO: handle potential error
			});
	}, [optionType]);

	const content = items.map((item) => {
		if (optionType === 'scoop') {
			return (
				<ScoopOption
					key={item.name}
					name={item.name}
					imagePath={item.imagePath}
				/>
			);
		} else {
			return (
				<ToppingOption
					key={item.name}
					name={item.name}
					imagePath={item.imagePath}
				/>
			);
		}
	});

	return <Row>{content}</Row>;
};

export default Options;
