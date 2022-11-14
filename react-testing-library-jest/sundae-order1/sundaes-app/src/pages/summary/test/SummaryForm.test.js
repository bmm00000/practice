import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

test('checkbox is initially unchecked and button is disabled', () => {
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonEl = screen.getByRole('button', { name: /confirm order/i });

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();
});

test('when checkbox is checked, button is enabled', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonEl = screen.getByRole('button', { name: /confirm order/i });

	await user.click(checkboxEl);

	expect(buttonEl).toBeEnabled();
});

test('when checkbox is unchecked, button is disabled', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonEl = screen.getByRole('button', { name: /confirm order/i });

	await user.click(checkboxEl);
	await user.click(checkboxEl);

	expect(buttonEl).toBeDisabled();
});

test('popover responds to hover', async () => {
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
