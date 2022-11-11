import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('the button should be disabled when the checkbox is checked', () => {
	render(<App />);

	const buttonEl = screen.getByRole('button');
	const checkboxEl = screen.getByRole('checkbox');

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeEnabled();

	userEvent.click(checkboxEl);

	expect(checkboxEl).toBeChecked();
	expect(buttonEl).toBeDisabled();

	userEvent.click(checkboxEl);

	expect(checkboxEl).not.toBeChecked();
	expect(buttonEl).toBeEnabled();
});
