import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
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

test('when checkbox gets checked, button gets enabled; and when checkbox gets unchecked, button gets disabled', () => {
	render(<SummaryForm />);

	const checkboxElement = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonElement = screen.getByRole('button', { name: /confirm order/i });

	user.click(checkboxElement);

	expect(buttonElement).toBeEnabled();

	user.click(checkboxElement);

	expect(buttonElement).toBeDisabled();
});
