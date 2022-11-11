import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

test('should have red color before clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');

	expect(buttonEl).toHaveStyle({ color: 'red' });
});

test('should have text of "change to blue" before clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');

	expect(buttonEl).toHaveTextContent('change to blue');
});

test('should have blue color after clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');
	userEvent.click(buttonEl);

	expect(buttonEl).toHaveStyle({ color: 'blue' });
});

test('should have text of "changed to blue!" after clicking', () => {
	render(<Button />);

	const buttonEl = screen.getByRole('button');
	userEvent.click(buttonEl);

	expect(buttonEl).toHaveTextContent('changed to blue!');
});
