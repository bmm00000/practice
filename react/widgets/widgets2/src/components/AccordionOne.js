import React, { useState } from 'react';

const AccordionOne = ({ items }) => {
	const [activeIndex, setActiveIndex] = useState(null);

	const onItemSelect = (index) => {
		setActiveIndex(index);
	};

	const renderedItems = items.map((item, index) => {
		const active = activeIndex === index ? 'active' : '';
		return (
			<React.Fragment key={item.title}>
				<div className={`title ${active}`} onClick={() => onItemSelect(index)}>
					<i className='dropdown icon'></i>
					{item.title}
				</div>
				<div className={`content ${active}`}>
					<p>{item.content}</p>
				</div>
			</React.Fragment>
		);
	});

	return <div className='ui styled accordion'>{renderedItems}</div>;
};

export default AccordionOne;
