import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
// import { logRoles } from '@testing-library/react';
import Button from './Button';

test('initially, has the text `Change to red`', () => {
	render(<Button />);

	const buttonElement = screen.getByRole('button');

	expect(buttonElement).toHaveTextContent(/change to red/i);
});

test('initially, has background color of blue', () => {
	render(<Button />);

	const buttonElement = screen.getByRole('button');

	expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' });
});

test('when clicked, has the text `Change to blue`', () => {
	render(<Button />);

	const buttonElement = screen.getByRole('button');
	user.click(buttonElement);

	expect(buttonElement).toHaveTextContent(/change to blue/i);
});

test('when clicked, has background color of red', () => {
	render(<Button />);

	const buttonElement = screen.getByRole('button');
	user.click(buttonElement);

	expect(buttonElement).toHaveStyle({ backgroundColor: 'red' });
});

test('initially, the checkbox is unchecked, and the button is enabled', () => {
	render(<Button />);

	const checkboxElement = screen.getByRole('checkbox');
	const buttonElement = screen.getByRole('button');

	expect(checkboxElement).not.toBeChecked();
	expect(buttonElement).toBeEnabled();
});
