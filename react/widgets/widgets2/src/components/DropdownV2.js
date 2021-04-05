import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const onBodyClick = (event) => {
			if (ref.current && ref.current.contains(event.target)) {
				return;
			}

			setOpen(false);
		};

		document.body.addEventListener('click', onBodyClick, { capture: true });

		return () => {
			document.body.removeEventListener('click', onBodyClick, {
				capture: true,
			});
			// we remove it becuase it will give us an error if we toggle the dropdown component with a button (to show it or not; see screenshot) and we click somewhere, since the eventListener will remain after we toggle the dropdown (the cleanup function gets invoked right before the useEffect callback gets called again, OR when we are going to stop showing the component)
		};
	}, []);

	const renderedOptions = options.map((option) => {
		if (selected.value === option.value) {
			return null;
		}
		return (
			<div
				key={option.value}
				className='item'
				onClick={() => onSelectedChange(option)}
			>
				{option.label}
			</div>
		);
	});

	return (
		<div>
			<div ref={ref} className='ui form'>
				<div className='field'>
					<label htmlFor='' className='label'>
						{label}
					</label>
					<div
						className={`ui selection dropdown ${open ? 'visible active' : ''}`}
						onClick={() => setOpen(!open)}
					>
						<i className='dropdown icon'></i>
						<div className='text'>{selected.label}</div>
						<div className={`menu ${open ? 'visible transition' : ''}`}>
							{renderedOptions}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
