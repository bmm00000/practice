const SummaryForm = () => {
	return (
		<>
			<form action=''>
				<label htmlFor='t&c'>I accept terms and conditions</label>
				<input type='checkbox' id='t&c' />
				<button type='submit' disabled={true}>
					Submit order
				</button>
			</form>
		</>
	);
};

export default SummaryForm;
