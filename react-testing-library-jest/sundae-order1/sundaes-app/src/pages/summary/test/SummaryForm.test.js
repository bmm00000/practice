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

test('when checkbox is checked, button is enabled', () => {
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonEl = screen.getByRole('button', { name: /confirm order/i });

	userEvent.click(checkboxEl);

	expect(buttonEl).toBeEnabled();
});

test('when checkbox is unchecked, button is disabled', () => {
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const buttonEl = screen.getByRole('button', { name: /confirm order/i });

	userEvent.click(checkboxEl);
	userEvent.click(checkboxEl);

	expect(buttonEl).toBeDisabled();
});
