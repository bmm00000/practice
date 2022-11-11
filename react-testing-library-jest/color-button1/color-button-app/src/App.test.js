import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('the button should be disabled when the checkbox is checked', () => {
	render(<App />);

	const buttonEl = screen.getByRole('button');
	const checkboxEl = screen.getByRole('checkbox');

	userEvent.click(checkboxEl);

	expect(buttonEl).toBeDisabled();
});
