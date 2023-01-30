import { render, screen } from '@testing-library/react';
// import { logRoles } from '@testing-library/react';
import Button from './Button';

test('initially, has the text "Change to red"', () => {
	render(<Button />);

	const buttonElement = screen.getByRole('button');

	expect(buttonElement).toHaveTextContent(/change to red/i);
});

test('initially, has background color of blue', () => {});

test('when clicked, has the text "Change to blue"', () => {});

test('when clicked, has background color of red', () => {});
