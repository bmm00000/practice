import { render, screen, fireEvent } from '@testing-library/react';

import SummaryForm from '../SummaryForm';

it('button should be disabled if the ckeckbox is unchecked, and abled when checkbox is checked', () => {
	render(<SummaryForm />);

	const checkboxEl = screen.getByRole('checkbox');
	const buttonEl = screen.getByRole('button');

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();

	fireEvent.click(checkboxEl);

	expect(checkboxEl).toBeChecked();
	expect(buttonEl).toBeEnabled();

	fireEvent.click(checkboxEl);

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();
});
