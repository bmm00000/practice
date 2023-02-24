import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
	test('should render the "Hello there" header', () => {
		render(<Greeting />);

		const headerElement = screen.queryByRole('heading');
		expect(headerElement).toBeInTheDocument();
	});

	test('should render a button with a text of "Change text"', () => {
		render(<Greeting />);

		const buttonElement = screen.queryByRole('button', {
			name: /change text/i,
		});
		expect(buttonElement).toBeInTheDocument();
	});

	test('should render the paragraph "Text has not been changed yet" BEFORE the button is clicked', () => {
		render(<Greeting />);

		const paragraphElement = screen.queryByText(
			/text has not been changed yet/i
		);
		expect(paragraphElement).toBeInTheDocument();
	});

	test('should NOT render the paragraph "Text has been changed now!" BEFORE the button is clicked', () => {
		render(<Greeting />);

		const paragraphElement = screen.queryByText(/text has been changed now!/i);
		// expect(paragraphElement).not.toBeInTheDocument();
		// OR:
		expect(paragraphElement).toBeNull();
	});

	test('should render the paragraph "Text has been changed now!" AFTER the button is clicked', async () => {
		render(<Greeting />);

		const buttonElement = screen.queryByRole('button', {
			name: /change text/i,
		});
		userEvent.click(buttonElement);

		const paragraphElement = await screen.findByText(
			/text has been changed now!/i
		);
		expect(paragraphElement).toBeInTheDocument();
	});

	test('should NOT render the paragraph "Text has not been changed yet" AFTER the button is clicked', async () => {
		render(<Greeting />);

		const buttonElement = screen.queryByRole('button', {
			name: /change text/i,
		});
		userEvent.click(buttonElement);

		const paragraphElement = await screen.findByText(
			/text has not been changed yet/i
		);
		expect(paragraphElement).not.toBeInTheDocument();
	});
});
