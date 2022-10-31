import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

it('button should be disabled if the ckeckbox is unchecked, and abled when checkbox is checked', async () => {
	render(<SummaryForm />);

	const checkboxEl = screen.getByRole('checkbox');
	const buttonEl = screen.getByRole('button');

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();

	await userEvent.click(checkboxEl);

	expect(checkboxEl).toBeChecked();
	expect(buttonEl).toBeEnabled();

	await userEvent.click(checkboxEl);

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();
});
