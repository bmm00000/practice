import { useState } from 'react';

const SummaryForm = () => {
	const [checked, setChecked] = useState(false);

	const checkHandler = () => {
		setChecked((oldChecked) => !oldChecked);
	};

	return (
		<>
			<form action=''>
				<label htmlFor='t&c'>I accept terms and conditions</label>
				<input type='checkbox' id='t&c' onChange={checkHandler} />
				<button type='submit' disabled={!checked}>
					Submit order
				</button>
			</form>
		</>
	);
};

export default SummaryForm;
