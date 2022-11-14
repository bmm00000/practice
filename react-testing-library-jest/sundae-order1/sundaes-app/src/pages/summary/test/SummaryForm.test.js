import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

test('checkbox is initially unchecked and button is disabled', () => {
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: 'I accept terms and conditions',
	});
	const buttonEl = screen.getByRole('button', { name: 'Submit order' });

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeDisabled();
});

test('when checkbox is checked, button is enabled', () => {
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: 'I accept terms and conditions',
	});
	const buttonEl = screen.getByRole('button', { name: 'Submit order' });

	userEvent.click(checkboxEl);

	expect(buttonEl).toBeEnabled();
});

test('when checkbox is unchecked, button is disabled', () => {
	render(<SummaryForm />);
	const checkboxEl = screen.getByRole('checkbox', {
		name: 'I accept terms and conditions',
	});
	const buttonEl = screen.getByRole('button', { name: 'Submit order' });

	userEvent.click(checkboxEl);
	userEvent.click(checkboxEl);

	expect(buttonEl).toBeDisabled();
});
