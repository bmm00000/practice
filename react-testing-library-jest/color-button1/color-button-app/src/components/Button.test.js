import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

test('should have red color before clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');

	expect(buttonEl.style.color).toBe('red');
});

test('should have text of "change to blue" before clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');

	expect(buttonEl.textContent).toBe('change to blue');
});

test('should have blue color after clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');
	userEvent.click(buttonEl);

	expect(buttonEl.style.color).toBe('blue');
});

test('should have text of "change to red" after clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');
	userEvent.click(buttonEl);

	expect(buttonEl.textContent).toBe('change to red');
});
