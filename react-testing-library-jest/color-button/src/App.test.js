import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial text and color, and text and color change when the button is clicked', () => {
	render(<App />);
	const buttonElement = screen.getByRole('button', { name: 'Change to blue' });
	expect(buttonElement).toHaveStyle({ backgroundColor: 'red' });

	fireEvent.click(buttonElement);
	expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' });
	expect(buttonElement.textContent).toBe('Change to red');
});

test('initial conditions', () => {
	render(<App />);
	const buttonElement = screen.getByRole('button', { name: 'Change to blue' });
	expect(buttonElement).toBeEnabled();

	const checkboxElement = screen.getByRole('checkbox');
	expect(checkboxElement).not.toBeChecked();
});
