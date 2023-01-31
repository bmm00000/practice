import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('initially, checkbox is unchecked, button disabled', () => {
	render(<SummaryForm />);

	const checkboxElement = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonElement = screen.getByRole('button', { name: /confirm order/i });

	expect(checkboxElement).not.toBeChecked();
	expect(buttonElement).toBeDisabled();
});

test('when checkbox gets checked, button gets enabled; and when checkbox gets unchecked, button gets disabled', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);

	const checkboxElement = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonElement = screen.getByRole('button', { name: /confirm order/i });

	await user.click(checkboxElement);

	expect(buttonElement).toBeEnabled();

	await user.click(checkboxElement);

	expect(buttonElement).toBeDisabled();
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

	const popoverElement = screen.getByText(
		/no ice cream will actually be delivered/i
	);
	expect(popoverElement).toBeInTheDocument();

	await user.unhover(termsAndConditions);

	const secondNullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);

	expect(secondNullPopover).not.toBeInTheDocument();
});
