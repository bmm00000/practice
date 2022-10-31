import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

it('button should be disabled if the ckeckbox is unchecked, and abled when checkbox is checked', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);

	const checkboxEl = screen.getByRole('checkbox');
	const buttonEl = screen.getByRole('button');

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();

	await user.click(checkboxEl);

	expect(checkboxEl).toBeChecked();
	expect(buttonEl).toBeEnabled();

	await user.click(checkboxEl);

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();
});

it('popover responds to hover', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);

	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);

	expect(nullPopover).not.toBeInTheDocument();

	const termsAndConditions = screen.getByText(/terms and conditions/i);
	await user.hover(termsAndConditions);
	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();

	await user.unhover(termsAndConditions);
	expect(popover).not.toBeInTheDocument();
});
