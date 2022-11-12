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

test('initial button should have color of grey when disabled after clicking on checkbox', () => {
	render(<App />);

	const checkboxEl = screen.getByRole('checkbox', {
		name: 'Disable the button',
	});
	userEvent.click(checkboxEl);

	const buttonEl = screen.getByRole('button');
	expect(buttonEl).toHaveStyle({ color: 'grey' });
});

test('color changed button should have color of grey when disabled after clicking on checkbox', () => {
	render(<App />);

	const buttonEl = screen.getByRole('button');
	userEvent.click(buttonEl);

	const checkboxEl = screen.getByRole('checkbox', {
		name: 'Disable the button',
	});
	userEvent.click(checkboxEl);

	expect(buttonEl).toHaveStyle({ color: 'grey' });
});
